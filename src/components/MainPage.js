import './MainPage.css';
import './DarkMode.css';
import React, {useState, useEffect} from 'react'
import Bar from './Bar';
import Task from './Task';

const MainPage = () => {

    const [isDarkModeOn, setIsDarkModeOn] = useState(false);
    const [allTasks, setAllTasks] = useState([]);
    const [copyAllTask, setCopyAllTask]=useState(allTasks);
    const [inputValue, setInputValue]=useState("");
    const [filter, setFilter]=useState("all");
    const [windowSize, setWindowSize]= useState(window.innerWidth);
    
    useEffect(()=>{
        setCopyAllTask(allTasks);
        setFilter('all');
    }, [allTasks])
    //GETTING THE WINDOW SIZE
    const detecteSize = ()=>{
        
        setWindowSize(window.innerWidth);
    }

    useEffect(()=>{
        window.addEventListener('resize',detecteSize)

        return()=>{
            window.removeEventListener('resize',detecteSize)
        }
    }, [windowSize])

   

    //CHANGING THE BACKGROUND-IMAGE    
    let backImage="";
    if(isDarkModeOn && windowSize <= 460){
        backImage="background-image-mobile-dark"
    }else if(isDarkModeOn && windowSize > 460){
        backImage="background-image-desktop-dark"
    }else{
        backImage=""
    }
    //GETTING THE BODY ELEMENT

    const bodyElement = document.querySelector('body');
   
   

    //DARK MODE ON
    const setDarkMode = ()=>{
        setIsDarkModeOn(!isDarkModeOn);
        bodyElement.classList.toggle('dark-mode-body')
     }

    //GET THE INPUT VALUE
    const getInputValueHandler=(e)=>{
        
        setInputValue(e.target.value);
    }

    //ADD NEW TASK
    const addNewTaskHandler=(e)=>{
        if(inputValue && e.key === 'Enter'){
            setAllTasks(state=>{
                let id=0;
                const copy = [...state]
                if(copy.length === 0){
                    id=0;
                }else{
                    copy.forEach(oneTask=>{
                        if(oneTask.id > id){
                            id=oneTask.id;
                        }
                    })
                }
                
                const task ={
                    id:id+1,
                    task:inputValue,
                    state:"active"
                }

                copy.push(task);
             
                return copy;
            })
            setInputValue('');
           
        }
    }

    //UPDATE TASK STATE
    const updateTaskUpdate=(id)=>{
        setAllTasks(state=>{
            const copy = [...state]
            const index = copy.findIndex(e=>e.id===id);
            
            if(copy[index].state === "active"){
                copy[index].state = "completed"
            }else{
                copy[index].state = "active"
            }
            
            return copy;
            
        })
    }

    //DELETE TASK

    const deleteTaskHandler=(id)=>(
        setAllTasks(state=>{
            const copy = [...state]
            const index = copy.findIndex(e=>e.id===id)
            copy.splice(index, 1)
            return copy;
        })
    )

    //TASK ACTIONS

    const tasksActionsHandler=(action)=>{
        switch (action) {
            case 'All':
                setCopyAllTask(allTasks);
                setFilter('all');
                break;

            case 'Active':
                setCopyAllTask(state=>{
                    const copy=[...allTasks]
                    const filter = copy.filter(element=>element.state==='active')
                    return filter;
                })
                setFilter('active');
                break;
            case 'Completed':
                setCopyAllTask(state=>{
                    const copy=[...allTasks]
                    const filter = copy.filter(element=>element.state==='completed')
                    return filter;
                })
                setFilter('completed');
                break;
            case 'Clear Completed':
                setAllTasks(state=>{
                    const copy=[...state]
                    const filter = copy.filter(element=>element.state !=='completed')
                    return filter;
                })
                break;
                default:
                    break;
        }
    }

   
  return (
    <>
        <header className={backImage}>
            <div className='header-title'>
                <h1>TODO</h1>
                { !isDarkModeOn ? <svg onClick={setDarkMode} xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fillRule="evenodd" d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"/></svg>
                 : <svg onClick={setDarkMode} xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fillRule="evenodd" d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"/></svg>}
            </div>
        </header>
        <div className='input-header-button'>
            <div className='input-header'>
                    <div className='circle'></div>
                    <input type="text" placeholder='Currently typing' onChange={getInputValueHandler} value={inputValue} onKeyDown={addNewTaskHandler}/>
                </div>
        </div>

        <div className='all-tasks'>
            {copyAllTask.map(oneTask=>(
                <Task 
                    key={oneTask.id}
                    isDarkModeOn={isDarkModeOn}
                    id={oneTask.id}
                    task={oneTask.task}
                    state={oneTask.state}
                    updateTaskUpdate={updateTaskUpdate}
                    deleteTaskHandler={deleteTaskHandler}
                />
            ))}
          
           
        </div>

        <Bar isDarkModeOn={isDarkModeOn} allTasks={allTasks} tasksActionsHandler={tasksActionsHandler} filter={filter}/>

       
        </>
  )
}


export default MainPage;