import {v1} from "uuid";
import {TaskType} from "../todolist/Todolist";
import {TasksStateType} from "../App";
import {addTodolistAC, deleteTodolistAC} from "./todolist-reducer";

export type ActionsType =
    ReturnType<typeof addTaskAC>
    | ReturnType<typeof deleteTaskAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof deleteTodolistAC>;

export const addTaskAC = (todolistId: string, taskTitle: string) => {
    return {
        type: "ADD-TASK",
        todolistId: todolistId,
        taskTitle: taskTitle
    } as const
}

export const deleteTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: "DELETE-TASK",
        todolistId: todolistId,
        taskId: taskId
    } as const
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, taskTitle: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        todolistId: todolistId,
        taskId: taskId,
        taskTitle: taskTitle
    } as const
}

export const changeTaskStatusAC = (todolistId: string, taskId: string, taskIsDone: boolean) => {
    return {
        type: "CHANGE-TASK-STATUS",
        todolistId: todolistId,
        taskId: taskId,
        isDone: taskIsDone
    } as const
}

export const taskReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "ADD-TASK": {
            let newState: TasksStateType = {...state};
            let tasks: Array<TaskType> = newState[action.todolistId];
            let newTask: TaskType = {
                id: v1(),
                title: action.taskTitle,
                isDone: false
            };
            newState[action.todolistId] = [...tasks, newTask];
            return newState;
        }
        case "DELETE-TASK": {
            let newState: TasksStateType = {...state};
            let tasks: Array<TaskType> = newState[action.todolistId];
            newState[action.todolistId] = tasks.filter(t => t.id !== action.taskId);
            return newState;
        }
        case "CHANGE-TASK-TITLE" : {
            let newState: TasksStateType = {...state};
            let tasks: Array<TaskType> = newState[action.todolistId];
            let changedTask: TaskType | undefined = tasks.find(t => t.id === action.taskId);
            if (changedTask) {
                changedTask.title = action.taskTitle;
            }
            return newState;
        }
        case "CHANGE-TASK-STATUS" : {
            let newState: TasksStateType = {...state};
            let tasks: Array<TaskType> = newState[action.todolistId];
            let changedTask: TaskType | undefined = tasks.find(t => t.id === action.taskId);
            if (changedTask) {
                changedTask.isDone = action.isDone;
            }
            return newState;
        }
        case "ADD-TODOLIST" : {
            let newState: TasksStateType = {...state};
            newState[action.todolistId] = [];
            return newState;
        }
        case "DELETE-TODOLIST" : {
            let newState: TasksStateType = {...state};
            delete newState[action.todolistId];
            return newState;
        }
        default: {
            throw new Error("Error");
        }
    }
}
