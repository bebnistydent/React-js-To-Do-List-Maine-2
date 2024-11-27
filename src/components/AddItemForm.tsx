import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { Button } from "./Button";


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
        <div>
            <input
            className = {error ? 'error' : ''}
            value = {itemTitle}
            onChange = {changeItemTitleHendler}
            onKeyUp={onKeyUpAddTaskHandler}
            />


            <Button title="+" onClickHandler={onClickAddItemHandler}/>
            {error && <div className={'error-message'}>{error}</div>}

            {/* {!isTitleValueValid && <div style = {{color: "red"}}>Max length 15 characters!</div>}
            {taskInputError && <div style = {{color: "red"}}>Title is required!</div>}         */}

        </div>
    )
}