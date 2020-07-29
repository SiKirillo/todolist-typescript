import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string,
    spanOnChange: (newValue: string) => void
};

export function EditableSpan(props: EditableSpanPropsType) {
    let [title, setTitle] = useState("");
    let [editMode, setEditMode] = useState(false);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.spanOnChange(title);
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }

    return editMode
        ? <TextField value={title}
                     onChange={onChangeTitleHandler}
                     onBlur={activateViewMode}
                     autoFocus={true}/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
}