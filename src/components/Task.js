import React, {useState} from 'react';
import './Task.css';
import './DarkMode.css';
const Task = ({isDarkModeOn, task, id, state, updateTaskUpdate, deleteTaskHandler}) => {

  const [showCross, setShowCross]=useState(false);
  // const [taskCompleted, setTaskCompleted]=useState(false);

  const mouseEnterHandler = () => {
    setShowCross(true);
  }

  const mouseLeaveHandler = () => {
    setShowCross(false)
  }

  const taskCompletedHandler=()=>{
    
    // setTaskCompleted(!taskCompleted);
    updateTaskUpdate(id);
  }

  const triggerDeleteTaskHandler =()=>{
   
    deleteTaskHandler(id);
  }

  return (
    <div className={isDarkModeOn ? 'dark-mode-task task' :'task'} onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler}>
        <div className={state === 'completed' ? 'check-icon task-completed' : 'check-icon'} onClick={taskCompletedHandler}>
            {state === 'completed' && <img src={'./images/icon-check.svg'} alt="check icon"/>}
        </div>
        <p className={state === 'completed' && 'task-completed-paragraph'}>{task}</p>
        { showCross && <svg onClick={triggerDeleteTaskHandler} xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill={isDarkModeOn ? '#fff' : '#000'} fillRule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>}
    </div>
  )
}


export default Task;