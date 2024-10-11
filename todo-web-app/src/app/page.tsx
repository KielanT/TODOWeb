"use client"; 

import Image from 'next/image';
import React, { useState } from 'react';
import Modal from "./components/modals"
import TaskModal from "./components/taskModal"
import Logo  from "../../../../Resources/ICON.png"
import { Task, List }  from "./types/interfaces"
import { newDate } from 'react-datepicker/dist/date_utils';


export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [lists, setLists] = useState<List[]>([])
  const [selectedListId, setSelectedListId] = useState<number | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  const toggleModal = (type = '') =>{
    setModalType(type);
    setModalOpen(!isModalOpen);
  };


  const createList = (name: string) =>{
    if(name.length > 0)
    {
      const newList: List = {
        name,
        tasks: [],
      }

      setLists(prevLists => {
        const updatedLists = [...prevLists, newList];
        const newIndex = updatedLists.length - 1;
        setSelectedListId(newIndex); 
        return updatedLists;
      });
      setSelectedTaskId(null);
      toggleModal();
    }
    else{
      alert('Please enter a name before adding.'); 
    }
  }

  const createTask = (name: string) =>{
    if(name.length > 0 && selectedListId !== null)
    {
      const newTask: Task = {
        name,
        taskDesc: "",
        dueDate: new Date()
      };

      [...lists][selectedListId].tasks.push(newTask);
      setLists([...lists]);
      // todo get list at selectListId add task to list 
      toggleModal();
    }
    else if(selectedListId == null){
      alert('Please select a list.');  // TODO set selected ID to the newest list
    }
    else{
      alert('Please enter a name before adding.'); 
    }
  }

  const handleInputChange = (newDesc: string) => {
    if(selectedListId !== null && selectedTaskId !== null){
      lists[selectedListId].tasks[selectedTaskId].taskDesc = newDesc;
    }
  }

  const handleTaskDueDateChange = (newDate: Date) => {
    if(selectedListId !== null && selectedTaskId !== null){
      lists[selectedListId].tasks[selectedTaskId].dueDate = newDate;
    }
  }
  
  return (  
    <main>
      <div className='titleBar'>
      <Image src={Logo} alt="App Logo" width={50} height={50} />
        <h1 className='titleText'>TODO List Web</h1>
      </div>
      <div className="app">
        <div className="leftList">
          <div className="ButtonBar">
            <button className="AddButton" onClick={() => toggleModal('list')}>Add List</button>
          </div>
          <div className='ListButtonContainer'>
          {lists.map((list, index) => (
              <button key={index} className="ListButton" onClick={() => {setSelectedListId(index); setSelectedTaskId(null);}} style={{backgroundColor: selectedListId === index ? '#151515' : '#0f0f0f'}} >
                {list.name}
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
          {selectedListId !== null && lists[selectedListId].tasks.map((task, index) => (
            <button key={index} className="ListButton" onClick={() => {setSelectedTaskId(index); }} style={{backgroundColor: selectedTaskId === index ? '#151515' : '#0f0f0f'}}>
            {task.name}
          </button>
          ))}
          </div>
          {selectedTaskId !== null && selectedListId !== null && (<TaskModal closeModal={() => setSelectedTaskId(null)} task={lists[selectedListId].tasks[selectedTaskId]} OnTaskDescUpdate={handleInputChange} OnTaskDateUpdate={handleTaskDueDateChange}/>)}
        </div>
        {isModalOpen && <Modal closeModal={toggleModal} nameModal={modalType === 'list' ? createList : createTask} title={modalType === 'list' ? 'Create List' : 'Create Task'} />}
      </div>
    </main>
  );
}
