import React, { useState } from 'react';
import './App.css';
import {TaskType, Todolist} from './components/Todolist';


 function App() {
    //Business Logic layer
    const todolistTitle: string = "What to learn"
    

    // let task: Array<TaskType> = [
    //     {id: 1, title: 'HTML', isDone: true},
    //     {id: 2, title: 'CSS', isDone: true},
    //     {id: 3, title: 'JS/TS', isDone: true},
    // ]

    const [task, setTask] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'JS/TS', isDone: true},
    ] )

     const removeTask = (taskId: number) => {
        const nextState: Array<TaskType> = [] 
        for(let i = 0; i < task.length; i++) {
            if(task[i].id !== taskId) {
                nextState.push(task[i])
            }
        }
        setTask(nextState)


        const copycurrentState = [...task];
    };

  



    //User Interface
    return (
        <div className="App">
            <Todolist title = {todolistTitle} tasks = {task} removeTask={removeTask}  />
            
              
        </div>
    );
}

export default App;
