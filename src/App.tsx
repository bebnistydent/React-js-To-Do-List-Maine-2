import React from 'react';
import './App.css';
import {Todolist, TaskType} from './components/Todolist';


function App() {
    //Business Logic layer
    const todolistTitle_1: string = "What to learn"
    const todolistTitle_2: string = "What to buy"

    const task_1: Array<TaskType> = [
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'JS/TS', isDone: true},
    ]

    const task_2: Array<TaskType> = [
        {id: 4, title: 'Cola', isDone: true},
        {id: 5, title: 'Whiskey', isDone: true},
        {id: 6, title: 'Ice', isDone: true},
    ]



    //User Interface
    return (
        <div className="App">
            <Todolist title = {todolistTitle_1} tasks = {task_1}/>
            {/*Todolist(title: todolistTitle_1, task: task_1)*/}
            <Todolist title = {todolistTitle_2} tasks = {task_2}/>
            {/*Todolist(title: todolistTitle_2, task: task_2)*/}
            
        </div>
    );
}

export default App;
