import { TextField } from "@mui/material";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";

type EditableSpanPropsType = {
    title: string,
    changeTitle: (newTitle: string) => void
}


export const EditableSpan = ({title, changeTitle}: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState(false);
    const [itemTitle, setItemTitle] = useState(title);

    const changeItemTitleHendler = (event: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(event.currentTarget.value)
    }


    const onEditMode = () => setEditMode(true);
    const offEditMode = () => {
        changeTitle(itemTitle)
        setEditMode(false)
        
    };
    return (
        editMode
        ? <TextField
            variant="standard"
            value={itemTitle}
            autoFocus
            onBlur={offEditMode}
            onChange={changeItemTitleHendler}
        />
        : <span onDoubleClick={onEditMode}>{title}</span>
    

    )
}