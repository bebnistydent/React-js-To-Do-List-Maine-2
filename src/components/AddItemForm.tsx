import React, { ChangeEvent, KeyboardEvent, useState } from "react";
//import { Button } from "./Button";
import { Button, TextField } from "@mui/material";
import PlusOneIcon from '@mui/icons-material/PlusOne';



type AddItemForumPropsType = {
    addItem: (title: string) => void
}

export const AddItemForum = ({addItem}: AddItemForumPropsType) => {
    const [itemTitle, setItemTitle] = useState("")
    const [error, setError] = useState<string | null>(null)
    
    const changeItemTitleHendler = (event: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(event.currentTarget.value)
    }

    const onKeyUpAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if(e.key === "Enter") {
            onClickAddItemHandler();
        }
    };

    const onClickAddItemHandler = () => {
    
        if(itemTitle.trim() !== '') {
                addItem(itemTitle.trim())
                setItemTitle(" ")
            } else {
            setError('Title is required')
        }
    
            };

    return (
        <div className="add-form">
            <TextField
            variant = "outlined"
            size = "small"
            className = {error ? 'error' : ''}
            value = {itemTitle}
            onChange = {changeItemTitleHendler}
            onKeyUp={onKeyUpAddTaskHandler}
            error = {!!error}
            helperText = {'Title is required'}
            />


            <Button size = "medium" variant = "contained" color = "primary"
            startIcon = {<PlusOneIcon />}
            onClick = {onClickAddItemHandler} 
            >Task</Button> 

            {/* {error && <div className={'error-message'}>{error}</div>} */}

            {/* {!isTitleValueValid && <div style = {{color: "red"}}>Max length 15 characters!</div>}
            {taskInputError && <div style = {{color: "red"}}>Title is required!</div>}         */}

        </div>
    )
}