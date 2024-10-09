"use client"; 

import Image from 'next/image';
import React, { useState } from 'react';
import Modal from "./components/modals"
import Logo  from "../../../../Resources/ICON.png"


export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [lists, setLists] = useState<string[]>([])

  const toggleModal = (type = '') =>{
    setModalType(type);
    setModalOpen(!isModalOpen);
  };

  const createList = (name: string) =>{
    if(name.length > 0)
    {
      setLists([...lists, name]);
      toggleModal();
    }
    else{
      alert('Please enter a name before adding.'); 
    }
  }

  const createTask = (name: string) =>{
    if(name.length > 0)
    {
      console.log(name);
      toggleModal();
    }
    else{
      alert('Please enter a name before adding.'); 
    }
  }
  
  return (  
    <main>
      <div className='titleBar'>
      <Image src={Logo} alt="App Logo" width={50} height={50} />
        <h1 className='titleText'>TODO List Web App</h1>
      </div>
      <div className="app">
        <div className="leftList">
          <div className="ButtonBar">
            <button className="AddButton" onClick={() => toggleModal('list')}>Add List</button>
          </div>
          <div className='ListButtonContainer'>
          {lists.map((list, index) => (
              <button key={index} className="ListButton">
                {list}
              </button>
            ))}
          </div>
        </div>

        <div className="divider"></div>

        <div className="centerList">
          <div className="ButtonBar">
            <button className="AddButton" onClick={() => toggleModal('task')}>Add Task</button>
          </div>
          <div className='ListButtonContainer'>
          {lists.map((list, index) => (
              <button key={index} className="ListButton">
                {list}
              </button>
            ))}
          </div>
        </div>
        {isModalOpen && <Modal closeModal={toggleModal} nameModal={modalType === 'list' ? createList : createTask} title={modalType === 'list' ? 'Create List' : 'Create Task'} />}
      </div>
    </main>
  );
}
