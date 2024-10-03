import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { Button } from "./Button";
import {FilterValuesType} from "./../App"





type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string)=> void,
    addTask: (title: string) => void
    chandeFilter: (newFilterValue: FilterValuesType) => void,
    setTaskNewStatus: (taskId: string, newStatus: boolean) => void,
}

export type TaskType = {
    id: string
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
    const [taskTitle, setTaskTitle] = useState("")
    
    const taskList: Array<JSX.Element> = props.tasks.map((task: TaskType) => {

        const removeTaskHandler = ()=> props.removeTask(task.id)
        const setTaskNewStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.setTaskNewStatus(task.id, e.currentTarget.checked)
        
        return (
            <li key={task.id}>
                <input type="checkbox" 
                       checked={task.isDone} 
                       onChange={setTaskNewStatusHandler}/>
                <span>{task.title}</span>
                <Button title="Del" onClickHandler={removeTaskHandler}/>
            </li>
        )
    });

    const onClickAddTaskHandler = () => {
        if(isTitleValueValid) {
            props.addTask(taskTitle)
            setTaskTitle(" ")
        }};

        const onKeyDounAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
            if(e.key === "Enter") {
                onClickAddTaskHandler();
            }
        };


    const isTitleValueValid = taskTitle.length < 15

    return (
        <div className="todolist">
        <h3>{props.title}</h3>
        <div>
            <input
            placeholder = {"Max 15 characters"}
            value = {taskTitle}
            onChange = {(e) => setTaskTitle(e.currentTarget.value)}
            onKeyDown={onKeyDounAddTaskHandler}
            />


            <Button title="+" 
                    onClickHandler={onClickAddTaskHandler}
                    isDisabled = {!isTitleValueValid}
                     />

            {!isTitleValueValid && <div style = {{color: "red"}}>Max length 15 characters!</div>}        

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