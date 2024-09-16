import React, { useState } from 'react';
import './App.css';
import {TaskType, Todolist} from './components/Todolist';


export type FilterValuesType = "All" | "Active" | "Complited"


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
    ] );


        const removeTask = (taskId: number) => {

        const nextState : Array<TaskType> = task.filter(task => task.id !== taskId);
        setTask(nextState);
        }


        const [filter, setFilter] = useState<FilterValuesType>("All");

        let filteredTask: Array<TaskType> = task
        
        if(filter === "Active") {
            filteredTask = task.filter(task => task.isDone === false)
        }

        if(filter === "Complited") {
            filteredTask = task.filter(task => task.isDone === true)
        }

        const chandeFilter = (newFilterValue: FilterValuesType) => setFilter(newFilterValue)

        //This is how you can do it without filter method
        //But please don't
        // const nextState: Array<TaskType> = [] 
        // for(let i = 0; i < task.length; i++) {
        //     if(task[i].id !== taskId) {
        //         nextState.push(task[i])
        //     }
        // }
        // setTask(nextState)


    //     const copyCurrentState = [...task];
    //     let taskIndex;

    //     for( let i = 0; i < copyCurrentState.length; i++) {
    //         if(task[i].id === taskId) {
    //             taskIndex = i
    //         }
    //     }
    //         if(taskIndex !== undefined) {
    //     copyCurrentState.splice(taskIndex, 1);
    //         }
    //     setTask(copyCurrentState)
    
        
    



    



    //User Interface
    return (
        <div className="App">
            <Todolist 
            title = {todolistTitle} 
            tasks = {filteredTask} 
            removeTask={removeTask}
            chandeFilter={chandeFilter}  />
            
              
        </div>
    );

    }
export default App;
