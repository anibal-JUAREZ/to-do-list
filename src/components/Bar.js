import React from 'react';
import './Bar.css';
import './DarkMode.css';
const Bar = ({isDarkModeOn, allTasks, tasksActionsHandler, filter}) => {

  let tasksActive =0;
  allTasks.forEach(task => {
      if(task.state ==='active'){
        tasksActive++;
      }
  });

  const sendActionHandler=(e)=>{
    tasksActionsHandler(e.target.innerText);
  }
  return (
    <div className='bottom-bar'>
        <div className={isDarkModeOn ? 'mobile-menu dark-mode-task': 'mobile-menu'}>
            <p>{tasksActive} item(s) left</p>
            <p onClick={sendActionHandler}>Clear Completed</p>
        </div>
        <div className={isDarkModeOn ? 'bar dark-mode-task': 'bar'}>
            <p>{tasksActive} item(s) left</p>
            <p onClick={sendActionHandler} className={filter ==='all' && 'active'}>All</p>
            <p onClick={sendActionHandler}className={filter ==='active' && 'active'}>Active</p>
            <p onClick={sendActionHandler} className={filter ==='completed' && 'active'}>Completed</p>
            <p onClick={sendActionHandler}>Clear Completed</p>
        </div>
    </div>
  )
}


export default Bar;