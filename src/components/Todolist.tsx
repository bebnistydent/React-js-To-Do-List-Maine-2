import React from "react";
import { Button } from "./Button";
import {FilterValuesType} from "./../App"





type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number)=> void,
    chandeFilter: (newFilterValue: FilterValuesType) => void
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}




export function Todolist (props: TodolistPropsType) {

      //!!!This is example of what "MAP" method do behind the scenes!!!
    // const taskList: Array<JSX.Element> = []
    // for (let i = 0; i < props.tasks.length; i++) {
    //     const tasakElement: JSX.Element = <li key={props.tasks[i].id}>
    //         <input type="checkbox" checked={props.tasks[i].isDone}/>
    //         <span>{props.tasks[i].title}</span>
    //     </li>
    //     taskList.push(tasakElement)
    // }  
           //!!!This is example of what "MAP" method do behind the scenes!!!

    
    const taskList: Array<JSX.Element> = props.tasks.map((task: TaskType) => {
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <Button title="Del" onClickHandler={()=> props.removeTask(task.id)}/>
            </li>
        )
    });

    return (
        <div className="todolist">
        <h3>{props.title}</h3>
        <div>
            <input/>
            <Button title="+" />
        </div>
        <ul>
            {taskList}
        </ul>
        <div>
            <Button title="All" onClickHandler = {()=> props.chandeFilter("All")}/>
            <Button title="Active" onClickHandler={()=> props.chandeFilter('Active')}/>
            <Button title="Completed" onClickHandler={()=> props.chandeFilter('Complited')}/>
        </div>
    </div>
    )
};