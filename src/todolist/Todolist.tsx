import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import style from "./Todolist.module.css";
import {FilterValuesType} from "../App";

type PropsType = {
    title: string,
    tasks: Array<TaskType>,
    addTask: (title: string) => void,
    deleteTask: (taskId: string) => void,
    changeFilter: (value: FilterValuesType) => void
}

type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

function Todolist(props: PropsType) {

    let [title, setTitle] = useState("");

    const addTask = () => {
        props.addTask(title);
        setTitle("");
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    };

    const onAllClickHandler = () => {
        props.changeFilter("all");
    };

    const onActiveClickHandler = () => {
        props.changeFilter("all");
    };

    const onCompletedClickHandler = () => {
        props.changeFilter("all");
    };

    return (
        <div className={style.todolist__item}>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}/>
                <button onClick={addTask}>Add</button>
            </div>
            <ul>
                {props.tasks.map(t => {
                    const onButtonClickHandler = () => {
                        props.deleteTask(t.id)
                    };

                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onButtonClickHandler}>x</button>
                    </li>
                })}
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
}

export default Todolist;
