import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { Button } from "./Button";
import {FilterValuesType} from "./../App"
import { AddItemForum } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";






type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType,
    removeTask: (taskId: string, todolistId: string)=> void,
    addTask: (title: string, todolistId: string) => void
    changeTodolistFilter: (newFilterValue: FilterValuesType, todolistId: string) => void,
    setTaskNewStatus: (taskId: string, newStatus: boolean, todolistId: string) => void,
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (title: string, todolistId: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
};



export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
    
}

export type TaskStateType = {
    [todolistId: string]: TaskType[]
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
    // const [taskTitle, setTaskTitle] = useState("")
    // const [taskInputError, setTaskInputError] = useState(false)
    
    const taskList: Array<JSX.Element> = props.tasks.map((task: TaskType) => {

        
        const removeTaskHandler = ()=> props.removeTask(task.id, props.todolistId)
        const setTaskNewStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.setTaskNewStatus(task.id, e.currentTarget.checked, props.todolistId)
        const changeTaskTitleHandler = (title: string) => {
            props.changeTaskTitle(task.id, title, props.todolistId)
            
        }
        
        return (
            <li key={task.id}>
                <input type="checkbox" 
                       checked={task.isDone} 
                       onChange={setTaskNewStatusHandler}/>
                {/* <span className={task.isDone ? "task-done" : "task"}>{task.title}</span> */}
                <EditableSpan changeTitle={changeTaskTitleHandler} title={task.title} />
                <Button title="Del" onClickHandler={removeTaskHandler}/>
            </li>
        )
    });

    const onClickAddTaskHandler = (taskTitle: string) => {
    
        if(taskTitle.trim() !== "") {
            props.addTask(taskTitle, props.todolistId)

        }
    };

    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(title, props.todolistId)
    }


    return (
        <div className="todolist">

        <h3>

            <EditableSpan title = {props.title} changeTitle={changeTodolistTitle}/>
            <Button title= '-' onClickHandler={()=> props.removeTodolist(props.todolistId)}/>

        </h3>

        <div>
            <AddItemForum addItem={onClickAddTaskHandler}/>
            {/* <input
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
            {taskInputError && <div style = {{color: "red"}}>Title is required!</div>}         */}

        </div>
        <ul>
            {taskList}
        </ul>
        <div>
            <Button title="All" classes={props.filter === "All" ? "btn-filter-active" : ""} 
            onClickHandler = {()=> props.changeTodolistFilter("All", props.todolistId)}/>

            <Button title="Active" classes={props.filter === "Active" ? "btn-filter-active" : ""} 
            onClickHandler={()=> props.changeTodolistFilter("Active", props.todolistId)}/>

            <Button title="Completed" classes={props.filter === "Complited" ? "btn-filter-active" : ""} 
            onClickHandler={()=> props.changeTodolistFilter("Complited", props.todolistId)}/>
        </div>
    </div>
    )
};