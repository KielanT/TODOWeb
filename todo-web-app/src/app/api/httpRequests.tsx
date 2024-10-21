import { Task, List }  from "../types/interfaces"

export const getListRequest = async ( 
    url: string,
    email: string,
    id: string,
    setLists: React.Dispatch<React.SetStateAction<List[]>>,
    setSelectedListId: React.Dispatch<React.SetStateAction<number | null>>,
    setSelectedTaskId: React.Dispatch<React.SetStateAction<number | null>>
) => {
    const jsonPayload = { email, id, };

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(jsonPayload),
    })
    .then(response => response.json())
    .then(data => {

      const listTitles = Object.keys(data.list);

      listTitles.forEach(title =>{

        const newList: List = {
          name: title,
          tasks: [],
        }

        const tasks = data.list[title].tasks;
        if(tasks.length > 0){
          tasks.forEach((task: { taskName: any; taskDescription: any; complete: boolean; dueDate: Date}) => {
            const newTask: Task = {
              name: task.taskName,
              taskDesc: task.taskDescription,
              dueDate: task.dueDate, // TODO get date
              complete: task.complete
            };  
            newList.tasks.push(newTask);

          });
        }

        setLists(prevLists => {
          const updatedLists = [...prevLists, newList];
          const newIndex = updatedLists.length - 1;
          setSelectedListId(newIndex); 
          return updatedLists;
        });
        setSelectedTaskId(null);

      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  export const createListRequest = async (url: string, email: string, id: string, name: string ): Promise<boolean> => {
    const jsonPayload = { email, id, name };
  
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(jsonPayload),
    })
    .then(response => {
        if (response.ok) {
          return true; 
        } else {
          return false; 
        }
    })
    .catch(error => {
        console.error('Error:', error);
        return false; 
    });
  };

  // newTask
  export const createNewTaskRequest = async (url: string, email: string, id: string, list: string, name: string) : Promise<boolean> =>{
    const jsonPayload = { email, id, list, name };

    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(jsonPayload),
    })
    .then(response => {
        if(response.ok)
        {
            return true;
        }
        else {
            return false;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        return false; 
    });
  }

  export const deleteListRequest = async (url: string,  email: string, id: string, name: string) : Promise<boolean> => {
    const jsonPayload = { email, id, name };

    return fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(jsonPayload),
    })
    .then(response => {
        if(response.ok)
        {
            return true;
        }
        else {
            return false;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        return false; 
    });
  }

  // deleteTask
  export const deleteTaskRequest = async (url: string,  email: string, id: string, list: string, name: string) : Promise<boolean> => {
    const jsonPayload = { email, id, list, name };

    return fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(jsonPayload),
    })
    .then(response => {
        if(response.ok)
        {
            return true;
        }
        else {
            return false;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        return false; 
    });
  }

  export const updateTaskCompleteRequest = async (url: string,  email: string, id: string, list: string, name: string, complete: boolean) : Promise<boolean> => {
    const jsonPayload = { email, id, list, name, complete };

    return fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(jsonPayload),
    })
    .then(response => {
        if(response.ok)
        {
            return true;
        }
        else {
            return false;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        return false; 
    });
  }

  // 
  export const updateTaskDescRequest = async (url: string,  email: string, id: string, list: string, name: string, taskDesc: string) : Promise<boolean> => {
    const jsonPayload = { email, id, list, name, taskDesc };

    return fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(jsonPayload),
    })
    .then(response => {
        if(response.ok)
        {
            return true;
        }
        else {
            return false;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        return false; 
    });
  }

  // updateTaskDate
  export const updateTaskDateRequest = async (url: string,  email: string, id: string, list: string, name: string, date: Date) : Promise<boolean> => {
    const formattedDate = date.toLocaleDateString();
    
    const jsonPayload = { email, id, list, name, date: formattedDate };
    return fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(jsonPayload),
    })
    .then(response => {
        if(response.ok)
        {
            return true;
        }
        else {
            return false;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        return false; 
    });
  }

  // doesUserExist?

  // createUser
  