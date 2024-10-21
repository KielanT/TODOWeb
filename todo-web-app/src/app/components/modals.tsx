"use client"; 
import React from 'react';
import "../modal.css"

interface ModalProps {
    closeModal: () => void;
    nameModal: (name :string, calledFromModal: boolean) =>void;
    title : string;
}

interface ModalState {
    inputName: string;
}

export default class Modal extends React.Component<ModalProps, ModalState>
{   
    constructor(props: ModalProps) {
        super(props);
        this.state = {
            inputName: ''
        };
    }

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ inputName: event.target.value });
    };

    render()
    {
        const { closeModal, nameModal, title } = this.props;
        const { inputName } = this.state;

        return(
            <div className='modal-overlay'>
                 <div className='modal-content'>
                    <h1>{title}</h1>
                    <div className='input-container'>
                        <label>Choose a name:</label>
                        <input name= "name" value={inputName} onChange={this.handleInputChange} />
                    </div>
                    <div className="button-container">
                        <button className="modal-button" onClick={()=>{
                            nameModal(inputName, true);
                        }}>Add</button>

                        <button className="modal-button" onClick={closeModal}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}