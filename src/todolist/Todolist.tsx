import React from "react";
import style from "./Todolist.module.css";
import {FilterValuesType} from "../App";

type PropsType = {
    title: string,
    tasks: Array<TaskType>,
    deleteTask: (taskId: number) => void,
    changeFilter: (value: FilterValuesType) => void
}

type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

function Todolist(props: PropsType) {
    return (
        <div className={style.todolist__item}>
            <h3>{props.title}</h3>
            <div>
                <input placeholder="name"/>
                <button>Add</button>
            </div>
            <ul>
                {props.tasks.map(t => <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={() => {
                        props.deleteTask(t.id)
                    }}>x
                    </button>
                </li>)}
            </ul>
            <div>
                <button onClick={() => props.changeFilter("all")}>All</button>
                <button onClick={() => props.changeFilter("active")}>Active</button>
                <button onClick={() => props.changeFilter("completed")}>Completed</button>
            </div>
        </div>
    );
}

export default Todolist;
