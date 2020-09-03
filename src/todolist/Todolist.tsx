import React, {ChangeEvent} from "react";
import {FilterValuesType} from "../App";
import {AddItemForm} from "../components/AddItemForm";
import {EditableSpan} from "../components/EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../redux/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC} from "../redux/task-reducer";

type PropsType = {
    id: string,
    title: string,
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

export type TasksStateType = {
    [key: string]: Array<TaskType>
};

function Todolist(props: PropsType) {
    let tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.id]);
    const dispatch = useDispatch();

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

    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle);
    };

    if (props.filter === "active") {
        tasks = tasks.filter(t => !t.isDone);
    }

    if (props.filter === "completed") {
        tasks = tasks.filter(t => t.isDone);
    }

    return (
        <div>
            <div>
                <EditableSpan title={props.title} spanOnChange={changeTodoListTitle}/>
                <IconButton onClick={deleteTodoList}
                            aria-label="delete">
                    <DeleteIcon/>
                </IconButton>
            </div>

            <AddItemForm addItem={(todolistTitle) => {
                dispatch(addTaskAC(props.id, todolistTitle));
            }}/>
            <ul>
                {tasks.map(t => {
                    const onButtonClickHandler = () => {
                        dispatch(deleteTaskAC(props.id, t.id));
                    };

                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        dispatch(changeTaskStatusAC(props.id, t.id, newIsDoneValue));
                    }

                    const onChangeTitleHandler = (newValue: string) => {
                        dispatch(changeTaskTitleAC(props.id, t.id, newValue));
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
