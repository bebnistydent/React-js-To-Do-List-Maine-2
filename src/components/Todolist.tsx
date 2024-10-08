import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { Button } from "./Button";
import {FilterValuesType} from "./../App"





type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType,
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
    const [taskInputError, setTaskInputError] = useState(false)
    
    const taskList: Array<JSX.Element> = props.tasks.map((task: TaskType) => {

        const removeTaskHandler = ()=> props.removeTask(task.id)
        const setTaskNewStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.setTaskNewStatus(task.id, e.currentTarget.checked)
        
        return (
            <li key={task.id}>
                <input type="checkbox" 
                       checked={task.isDone} 
                       onChange={setTaskNewStatusHandler}/>
                <span className={task.isDone ? "task-done" : "task"}>{task.title}</span>
                <Button title="Del" onClickHandler={removeTaskHandler}/>
            </li>
        )
    });

    const onClickAddTaskHandler = () => {
    
    const trimmedTaskTitle = taskTitle.trim();
    if(trimmedTaskTitle) {
        if(isTitleValueValid) {
            props.addTask(taskTitle)
            setTaskTitle(" ")
        }
    } else {
        setTaskInputError(true)
        setTaskTitle("")
    }

        };


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
            onChange = {(e) => {
                taskInputError && setTaskInputError(false)
                setTaskTitle(e.currentTarget.value)
            }}

            className={taskInputError ? "error" : ""}
            onKeyDown={onKeyDounAddTaskHandler}
            />


            <Button title="+" 
                    onClickHandler={onClickAddTaskHandler}
                    isDisabled = {!isTitleValueValid}
                     />

            {!isTitleValueValid && <div style = {{color: "red"}}>Max length 15 characters!</div>}
            {taskInputError && <div style = {{color: "red"}}>Title is required!</div>}        

        </div>
        <ul>
            {taskList}
        </ul>
        <div>
            <Button title="All" classes={props.filter === "All" ? "btn-filter-active" : ""} onClickHandler = {()=> props.chandeFilter("All")}/>
            <Button title="Active" classes={props.filter === "Active" ? "btn-filter-active" : ""} onClickHandler={()=> props.chandeFilter("Active")}/>
            <Button title="Completed" classes={props.filter === "Complited" ? "btn-filter-active" : ""} onClickHandler={()=> props.chandeFilter("Complited")}/>
        </div>
    </div>
    )
};