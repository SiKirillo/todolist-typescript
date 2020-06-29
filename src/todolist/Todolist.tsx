import React from "react";
import style from "./Todolist.module.css";

type PropsType = {
    title: string
    tasks: Array<TaskType>
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
                <li>
                    <input type="checkbox" checked={props.tasks[0].isDone}/>
                    <span>{props.tasks[0].title}</span>
                </li>
                <li>
                    <input type="checkbox" checked={props.tasks[1].isDone}/>
                    <span>{props.tasks[1].title}</span>
                </li>
                <li>
                    <input type="checkbox" checked={props.tasks[2].isDone}/>
                    <span>{props.tasks[2].title}</span>
                </li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
}

export default Todolist;
