import React, {ChangeEvent} from "react";
import style from "./Todolist.module.css";
import {FilterValuesType} from "../App";
import {AddItemForm} from "../components/AddItemForm";

type PropsType = {
    id: string,
    title: string,
    allTasks: Array<TaskType>,
    addTask: (todoListId: string, title: string) => void,
    deleteTask: (todoListId: string, taskId: string) => void,
    changeTaskStatus: (todoListId: string, id: string, isDone: boolean) => void,
    changeFilter: (todoListId: string, value: FilterValuesType) => void,
    filter: FilterValuesType,
    deleteTodoList: (todoListId: string) => void
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

function Todolist(props: PropsType) {
    const onAllClickHandler = () => {
        props.changeFilter(props.id, "all");
    };

    const onActiveClickHandler = () => {
        props.changeFilter(props.id, "active");
    };

    const onCompletedClickHandler = () => {
        props.changeFilter(props.id, "completed");
    };

    const deleteTodoList = () => {
        props.deleteTodoList(props.id);
    };

    const addTask = (title: string) => {
        props.addTask(props.id, title);
    };

    return (
        <div className={style.todolist__item}>
            <div>
                <h3>{props.title}</h3>
                <button onClick={deleteTodoList}>x</button>
            </div>

            <AddItemForm addItem={addTask}/>
            <ul>

                {props.allTasks.map(t => {
                    const onButtonClickHandler = () => {
                        props.deleteTask(props.id, t.id);
                    };

                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(props.id, t.id, newIsDoneValue);
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
