import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import style from "./Todolist.module.css";
import {FilterValuesType} from "../App";

type PropsType = {
    title: string,
    tasks: Array<TaskType>,
    addTask: (title: string) => void,
    changeStatus: (id: string, isDone: boolean) => void,
    deleteTask: (taskId: string) => void,
    changeFilter: (value: FilterValuesType) => void,
    filter: FilterValuesType
}

type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

function Todolist(props: PropsType) {

    let [title, setTitle] = useState("");
    let [error, setError] = useState<string | null>(null);

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    };

    const onAllClickHandler = () => {
        props.changeFilter("all");
    };

    const onActiveClickHandler = () => {
        props.changeFilter("active");
    };

    const onCompletedClickHandler = () => {
        props.changeFilter("completed");
    };

    return (
        <div className={style.todolist__item}>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       className={error ? "error" : ""}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}/>
                <button onClick={addTask}>Add</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {props.tasks.map(t => {
                    const onButtonClickHandler = () => {
                        props.deleteTask(t.id)
                    };

                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeStatus(t.id, newIsDoneValue)
                    }

                    return <li key={t.id} className={t.isDone ? "isDone" : ""}>
                        <input type="checkbox" checked={t.isDone}
                               onChange={onChangeStatusHandler}/>
                        <span>{t.title}</span>
                        <button onClick={onButtonClickHandler}>x</button>
                    </li>
                })}
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    );
}

export default Todolist;
