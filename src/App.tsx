import React, { useState } from 'react';
import './App.css';
import {TaskType, Todolist} from './components/Todolist';
import { v1 } from 'uuid';


export type FilterValuesType = "All" | "Active" | "Complited"


 function App() {
    

    //Business Logic layer
    const todolistTitle: string = "What to learn"
    

    

    const [task, setTask] = React.useState<Array<TaskType>>([
        {id: v1(), title: 'HTML', isDone: false},
        {id: v1(), title: 'CSS', isDone: false},
        {id: v1(), title: 'JS/TS', isDone: false},
    ] );


        const removeTask = (taskId: string) => {

        const nextState : Array<TaskType> = task.filter(task => task.id !== taskId);
        setTask(nextState);
        };


        const addTask = (title: string) => {
        
            const newTask: TaskType = {
                title: title,
                isDone: false,
                id: v1(),
            }
            const copyState = [...task, newTask]
            setTask(copyState)
        };



        const setTaskNewStatus = (taskId: string, newStatus: boolean) => {
            
            const nextState: Array<TaskType> = task.map(task => task.id === taskId ? {
                 ...task, isDone: newStatus} : task)
            setTask(nextState)
        };











        //GUI Layer
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
            filter={filter} 
            removeTask={removeTask}
            chandeFilter={chandeFilter}
            addTask={addTask}
            setTaskNewStatus={setTaskNewStatus}  />
            
              
        </div>
    );

    }
export default App;
