"use client"; 
import React from 'react';
import { jwtDecode } from 'jwt-decode';
import { doesUserExistRequest, createUserRequest } from "../api/httpRequests"
import "../modal.css";

const url = 'http://192.168.0.50';

export interface userDetails{
    id: string,
    email: string,
    firstName: string,
  }
  
  interface CredentialResponse {
    credential?: string; 
}

interface LoginProps
{
    closeModal: () => void;
    userDetailsSetter: (user: userDetails | null) => void;
}


export default class LoginModal extends React.Component<LoginProps> 
{
    constructor(props: LoginProps)
    {
        super(props);

    }

    componentDidMount() {
        // Load the Google Identity Services script dynamically
        const script = document.createElement('script');
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.onload = () => {
            this.initializeGoogleSignIn();
        };
        document.body.appendChild(script);
    }

    initializeGoogleSignIn() {
        // Check if google is loaded
        if (window.google) {
            window.google.accounts.id.initialize({
                client_id: "891038534710-ch3o7ol0q4cckich1t8sfvd48olce3mr.apps.googleusercontent.com",
                callback: this.handleCredentialResponse
            });

            // Render the Google Sign-In button
            window.google.accounts.id.renderButton(
                document.getElementById("g_id_signin") as HTMLElement,
                { theme: "outline", size: "large" }  // Customization options
            );
        }
    }

    handleCredentialResponse = async (response: CredentialResponse) => {
        if (response.credential) {
            const decoded = jwtDecode<any>(response.credential); 
    
            localStorage.setItem('token', response.credential);

            if (decoded.sub && decoded.email && decoded.given_name) {
                const newUser: userDetails = {
                    id: decoded.sub,             
                    email: decoded.email,
                    firstName: decoded.given_name 
                };

                this.props.userDetailsSetter(newUser);

                // TODO check if user exists, if not create user
                const success = await doesUserExistRequest(url + '/doesUserExist', newUser.id)
                if(!success)
                {
                    createUserRequest(url + '/createUser', newUser.email, newUser.id, newUser.firstName);
                }
            }
        }
        this.props.closeModal();
    };

    render() {

        return (
            <div className='modal-overlay'>
                <div className='modal-content'>
                    <h1>Please Login</h1>
                    <div id="g_id_onload"
                        data-client_id="891038534710-ch3o7ol0q4cckich1t8sfvd48olce3mr.apps.googleusercontent.com"
                        data-context="signin"
                        data-ux_mode="popup"
                        data-nonce=""
                        data-auto_prompt="false">
                    </div>
    
                    <div id="g_id_signin"
                        data-type="standard"
                        data-shape="rectangular"
                        data-theme="outline"
                        data-text="signin_with"
                        data-size="large"
                        data-logo_alignment="left">
                    </div>
                </div>
            </div>
        );
    }
}
