"use client"; 

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import Modal from "./components/modals"
import TaskModal from "./components/taskModal"
import ContextMenu from "./components/ContextMenu"
import Logo  from "../../../../Resources/ICON.png"
import { Task, List }  from "./types/interfaces"
import { getListRequest, createListRequest, createNewTaskRequest, deleteListRequest, deleteTaskRequest, updateTaskComplete } from "./api/httpRequests"



export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [lists, setLists] = useState<List[]>([])
  const [selectedListId, setSelectedListId] = useState<number | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [listContextMenu, setListContextMenu] = useState<{ x: number; y: number; visible: boolean }>({
    x: 0,
    y: 0,
    visible: false,
  });
  const [taskContextMenu, setTaskContextMenu] = useState<{ x: number; y: number; visible: boolean }>({
    x: 0,
    y: 0,
    visible: false,
  });

  const hasFetched = useRef(false); 
  useEffect(() => {
    if(!hasFetched.current){
      getListRequest( url + '/getLists', email, id, setLists, setSelectedListId, setSelectedTaskId);
      hasFetched.current = true;
    }
  }, []);

  const toggleModal = (type = '') =>{
    setModalType(type);
    setModalOpen(!isModalOpen);
  };


  const createList = async (name: string, calledFromModal: boolean) =>{
    if(name.length > 0)
    {
      const success = await createListRequest(url + '/newList', email, id, name);

      if(success){
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
        if(calledFromModal){
          toggleModal();
        }
      }else{
        alert('Failed to create list.'); // TODO check if there is a server connection 
        if(calledFromModal){
          toggleModal();
        }
      }
    }
    else{
      alert('Please enter a name before adding.'); 
    }
  }

  const createTask = async (name: string) =>{
    if(name.length > 0 && selectedListId !== null)
    {
      const listName = lists[selectedListId].name;
      const success = await createNewTaskRequest(url + '/newTask', email, id, listName, name);

      if(success)
      {
        const newTask: Task = {
          name,
          taskDesc: "",
          dueDate: new Date(),
          complete: false
        };

        [...lists][selectedListId].tasks.push(newTask);
        setLists([...lists]);
        toggleModal();
      }
      else{
        alert('Failed to create task.');  
        toggleModal();
      }
    }
    else if(selectedListId == null){
      alert('Please select a list.');  
      toggleModal();
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

  const toggleTaskComplete = async (index: number) => {
    if(selectedListId !== null){

      const newLists = [...lists];
      const newTasks = [...newLists[selectedListId].tasks];

      newTasks[index] = {
        ...newTasks[index], 
        complete: !newTasks[index].complete
      };

      const success = await updateTaskComplete(url + '/updateTaskComplete', email, id, lists[selectedListId].name, newTasks[index].name, newTasks[index].complete);

      newLists[selectedListId].tasks = newTasks;

      setLists(newLists); 
    }
  }
  
const handleListContextMenu = (event: React.MouseEvent, index: number) => {
  event.preventDefault();
  setSelectedListId(index);
  setListContextMenu({x: event.pageX, y: event.pageY, visible: true});
};

const deleteList = async () => {
  setSelectedTaskId(null);
  if(selectedListId !== null) {
    const success = await deleteListRequest(url + '/deleteList', email, id, lists[selectedListId].name);
    if(success) {
      const updatedLists = lists.filter((_, i) => i !== selectedListId)
      setLists(updatedLists);
      setSelectedListId(null);
    }
  }
  closeListContextMenu();
};

const closeListContextMenu = () =>
{
  setListContextMenu({...listContextMenu, visible: false});
}

const handleTaskContextMenu =  (event: React.MouseEvent, index: number) => {
  event.preventDefault();
  setSelectedTaskId(index);
  setTaskContextMenu({x: event.pageX, y: event.pageY, visible: true});
};

const deleteTask = async () => {
  if (selectedTaskId !== null && selectedListId !== null) {
    
    const success = await deleteTaskRequest(url + '/deleteTask', email, id, lists[selectedListId].name, lists[selectedListId].tasks[selectedTaskId].name);

    if(success){
      const updatedTasks = lists[selectedListId].tasks.filter((_, i) => i !== selectedTaskId);
      const updatedList = {
        ...lists[selectedListId],
        tasks: updatedTasks,
      };

      const updatedLists = lists.map((list, index) =>
        index === selectedListId ? updatedList : list
      );

      setLists(updatedLists);
      setSelectedTaskId(null); 
    }
  }
  closeTaskContextMenu(); 
};

const closeTaskContextMenu = () =>
{
  setTaskContextMenu({...taskContextMenu, visible: false});
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
              <button key={index} className="ListButton" onClick={() => {setSelectedListId(index); setSelectedTaskId(null);}} onContextMenu={(e) => handleListContextMenu(e, index)} style={{backgroundColor: selectedListId === index ? '#151515' : '#0f0f0f'}} >
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
            <div key={index} className="TaskItem">
              <input type="checkbox" className="TaskCheckbox" checked={task.complete} onChange={() => {toggleTaskComplete(index)}}/>
              <button key={index} className="ListButton" onClick={() => {setSelectedTaskId(index); }} onContextMenu={(e) => handleTaskContextMenu(e, index)} style={{backgroundColor: selectedTaskId === index ? '#151515' : '#0f0f0f'}}>
                {task.name}
              </button>
          </div>
          ))}
          </div>
          {selectedTaskId !== null && selectedListId !== null && (<TaskModal closeModal={() => setSelectedTaskId(null)} task={lists[selectedListId].tasks[selectedTaskId]} OnTaskDescUpdate={handleInputChange} OnTaskDateUpdate={handleTaskDueDateChange}/>)}
        </div>
        {listContextMenu.visible && <ContextMenu position={{x: listContextMenu.x, y: listContextMenu.y}} OnDelete={deleteList} CloseMenu={closeListContextMenu}/>}
        {taskContextMenu.visible && <ContextMenu position={{x: taskContextMenu.x, y: taskContextMenu.y}} OnDelete={deleteTask} CloseMenu={closeTaskContextMenu}/>}
        {isModalOpen && <Modal closeModal={toggleModal} nameModal={modalType === 'list' ? createList : createTask} title={modalType === 'list' ? 'Create List' : 'Create Task'} />}
      </div>
    </main>
  );
}
