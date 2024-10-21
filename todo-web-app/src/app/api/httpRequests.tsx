import { Task, List }  from "../types/interfaces"

const url = 'http://192.168.0.50';

export const getListRequest = async ( 
    email: string,
    id: string,
    setLists: React.Dispatch<React.SetStateAction<List[]>>,
    setSelectedListId: React.Dispatch<React.SetStateAction<number | null>>,
    setSelectedTaskId: React.Dispatch<React.SetStateAction<number | null>>
) => {
    const jsonPayload = { email, id, };

    fetch(url + '/getLists', {
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

  export const createListRequest = async (email: string, id: string, name: string ): Promise<boolean> => {
    const jsonPayload = { email, id, name };
  
    return fetch(url + '/newList', {
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

  export const createNewTaskRequest = async (email: string, id: string, list: string, name: string) : Promise<boolean> =>{
    const jsonPayload = { email, id, list, name };

    return fetch(url + '/newTask', {
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

  export const deleteListRequest = async (email: string, id: string, name: string) : Promise<boolean> => {
    const jsonPayload = { email, id, name };

    return fetch(url + '/deleteList', {
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
  export const deleteTaskRequest = async (email: string, id: string, list: string, name: string) : Promise<boolean> => {
    const jsonPayload = { email, id, list, name };

    return fetch(url + '/deleteTask', {
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

  export const updateTaskCompleteRequest = async (email: string, id: string, list: string, name: string, complete: boolean) : Promise<boolean> => {
    const jsonPayload = { email, id, list, name, complete };

    return fetch(url + '/updateTaskComplete', {
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
  export const updateTaskDescRequest = async ( email: string, id: string, list: string, name: string, taskDesc: string) : Promise<boolean> => {
    const jsonPayload = { email, id, list, name, taskDesc };

    return fetch(url + '/updateTaskDesc', {
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
  export const updateTaskDateRequest = async (email: string, id: string, list: string, name: string, date: Date) : Promise<boolean> => {
    const formattedDate = date.toLocaleDateString();
    
    const jsonPayload = { email, id, list, name, date: formattedDate };
    return fetch(url + '/updateTaskDate', {
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

  export const doesUserExistRequest = async (id: string) : Promise<boolean> =>{
    const requestUrl = `${url}/doesUserExist?gID=${encodeURIComponent(id)}`;

    return fetch(requestUrl, {
        method: 'GET',
    })
    .then(response => {
        if(response.ok) {
            return response.json().then(data => data.exist); 
        } else {
            return false;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        return false; 
    });
  }

  export const createUserRequest = async (email: string, id: string, name: string) : Promise<boolean> =>{
    const jsonPayload = { email, id, name };

    return fetch(url + '/createUser', {
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