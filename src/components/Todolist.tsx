import React, { ChangeEvent, KeyboardEvent, useState } from "react";
//import { Button } from "./Button";
//import { Button } from "@mui/material";
import { FilterValuesType } from "./../App"
import { AddItemForum } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { IconButton, Stack, Button, Checkbox, List, ListItem } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';







type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType,
    removeTask: (taskId: string, todolistId: string) => void,
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


export function Todolist(props: TodolistPropsType) {






    const taskList: Array<JSX.Element> = props.tasks.map((task: TaskType) => {


        const removeTaskHandler = () => props.removeTask(task.id, props.todolistId)
        const setTaskNewStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.setTaskNewStatus(task.id, e.currentTarget.checked, props.todolistId)

        const changeTaskTitleHandler = (title: string) => {
            props.changeTaskTitle(task.id, title, props.todolistId)

        }

        return (

            <ListItem 
            sx = {{opacity: task.isDone ? 0.5 : 1}}
            disablePadding 
            key={task.id}
            secondaryAction = {
            <IconButton onClick={removeTaskHandler}> 
            <DeleteIcon fontSize="inherit" /> 
            </IconButton>} 
            >
                {/* <input type="checkbox" 
                       checked={task.isDone} 
                       onChange={setTaskNewStatusHandler}/> */}

                <Checkbox
                    color={'success'}
                    icon={<BookmarkBorderIcon />}
                    checkedIcon={<BookmarkIcon />}
                    onChange={setTaskNewStatusHandler}
                    checked={task.isDone}
                />

                {/* <span className={task.isDone ? "task-done" : "task"}>{task.title}</span> */}
                <EditableSpan changeTitle={changeTaskTitleHandler} title={task.title} />

                

            </ListItem>
        )
    });



    const onClickAddTaskHandler = (taskTitle: string) => {

        if (taskTitle.trim() !== "") {
            props.addTask(taskTitle, props.todolistId)

        }
    };

    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(title, props.todolistId)
    }


    return (
        <div className="todolist">

            <h3>

                <EditableSpan title={props.title} changeTitle={changeTodolistTitle} />
                <IconButton aria-label="delete" size="small"
                    onClick={() => props.removeTodolist(props.todolistId)}
                ><DeleteIcon /></IconButton>

            </h3>

            <div>
                <AddItemForum addItem={onClickAddTaskHandler} />
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
            {!taskList.length ? <div className="no-task-error">No Tasks!</div> : <List>
                {taskList}
            </List>}


            <Stack direction='row' spacing={4.5}>

                <Button variant="contained" size="small"
                    color={props.filter === "All" ? "secondary" : "primary"}
                    //classes={props.filter === "All" ? "btn-filter-active" : ""} 
                    onClick={() => props.changeTodolistFilter("All", props.todolistId)}
                >All</Button>

                <Button variant="contained" size="small"
                    color={props.filter === "Active" ? "secondary" : "primary"}
                    //classes={props.filter === "Active" ? "btn-filter-active" : ""} 
                    onClick={() => props.changeTodolistFilter("Active", props.todolistId)}
                >Active</Button>

                <Button variant="contained" size="small"
                    color={props.filter === "Completed" ? "secondary" : "primary"}
                    //classes={props.filter === "Complited" ? "btn-filter-active" : ""} 
                    onClick={() => props.changeTodolistFilter("Completed", props.todolistId)}
                >Completed</Button>

            </Stack>
        </div>
    )
};