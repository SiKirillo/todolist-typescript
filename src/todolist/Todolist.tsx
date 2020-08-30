import React, {ChangeEvent} from "react";
import {FilterValuesType} from "../App";
import {AddItemForm} from "../components/AddItemForm";
import {EditableSpan} from "../components/EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

type PropsType = {
    id: string,
    title: string,
    allTasks: Array<TaskType>,
    addTask: (todoListId: string, title: string) => void,
    deleteTask: (todoListId: string, taskId: string) => void,
    changeTaskTitle: (todoListId: string, id: string, newTitle: string) => void,
    changeTaskStatus: (todoListId: string, id: string, isDone: boolean) => void,
    changeFilter: (todoListId: string, value: FilterValuesType) => void,
    filter: FilterValuesType,
    changeTodoListTitle: (id: string, newTitle: string) => void,
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

    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle);
    };

    return (
        <div>
            <div>
                <EditableSpan title={props.title} spanOnChange={changeTodoListTitle}/>
                <IconButton onClick={deleteTodoList}
                            aria-label="delete">
                    <DeleteIcon/>
                </IconButton>
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

                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(props.id, t.id, newValue);
                    };

                    return <li key={t.id} className={t.isDone ? "isDone" : ""}>
                        <Checkbox checked={t.isDone}
                                  onChange={onChangeStatusHandler}/>

                        <EditableSpan title={t.title} spanOnChange={onChangeTitleHandler}/>
                        <IconButton onClick={onButtonClickHandler}
                                    aria-label="delete">
                            <DeleteIcon/>
                        </IconButton>
                    </li>
                })}
            </ul>
            <div>
                <Button variant={props.filter === "all" ? "contained" : "text"}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button variant={props.filter === "active" ? "contained" : "text"}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button variant={props.filter === "completed" ? "contained" : "text"}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    );
}

export default Todolist;
