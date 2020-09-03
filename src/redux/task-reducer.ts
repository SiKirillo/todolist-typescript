import {v1} from "uuid";
import {TasksStateType, TaskType} from "../todolist/Todolist";
import {addTodolistAC, deleteTodolistAC, todoListId1, todoListId2} from "./todolist-reducer";

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

const initialState: TasksStateType = {
    [todoListId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false}
    ],
    [todoListId2]: [
        {id: v1(), title: "Java1", isDone: true},
        {id: v1(), title: "Java2", isDone: true},
        {id: v1(), title: "Java3", isDone: false},
        {id: v1(), title: "Java4", isDone: false},
        {id: v1(), title: "Java5", isDone: false}
    ]
};

export const taskReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
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
            newState[action.todolistId] = tasks.map(t => t.id === action.taskId ? {...t, title: action.taskTitle} : t);
            return newState;
        }
        case "CHANGE-TASK-STATUS" : {
            let newState: TasksStateType = {...state};
            let tasks: Array<TaskType> = newState[action.todolistId];
            newState[action.todolistId] = tasks.map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t);
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
            return state;
        }
    }
}
