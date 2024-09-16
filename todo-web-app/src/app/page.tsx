'use client';

import Image from "next/image";
import { useState } from "react";
import useWebSocket from 'react-use-websocket';

const WS_URL = 'ws:192.168.0.50:5000/ws'

export default function Home() {
  // State to keep track of the click count
  const [clickCount, setClickCount] = useState(0);

  const { sendMessage } = useWebSocket(WS_URL, {
    onOpen: () => {
      console.log('WebSocket connection established.');
    },
    onMessage: (event) => {
      console.log('Recieved Message: ', event.data);
      setClickCount(event.data);
    }
  });

  const GetClickCount = async () => {
    // Update the state
    fetch('http://192.168.0.50/count', {
      method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
      setClickCount(data["count"]);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  GetClickCount();
  

  // Function to handle the button click, can fetch or send message
  const handleClick = async () => {
    fetch('http://192.168.0.50/update', {
      method: 'POST'
    })
    .then(response => response.json())
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const handleResetClick = async () => {
    fetch('http://192.168.0.50/reset', {
      method: 'POST'
    })
    .then(response => response.json())
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center justify-center flex-col sm:flex-row">
          <p>Clicked {clickCount} times</p>
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="#"
            onClick={(e) => {
              e.preventDefault(); // Prevents default action of the <a> tag
              handleClick();
            }}
          >

            Click Me
          </a>
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="#"
            onClick={(e) => {
              e.preventDefault(); // Prevents default action of the <a> tag
              handleResetClick();
            }}
          >
            Reset
          </a>
        </div>
      </main>
    </div>
  );
}
