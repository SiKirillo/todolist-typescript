import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type ActionsType =
    ReturnType<typeof addTodolistAC>
    | ReturnType<typeof deleteTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>;

export const addTodolistAC = (todolistTitle: string) => {
    return {
        type: "ADD-TODOLIST",
        todolistId: v1(),
        todolistTitle: todolistTitle
    } as const
}

export const deleteTodolistAC = (todolistId: string) => {
    return {
        type: "DELETE-TODOLIST",
        todolistId: todolistId
    } as const
}

export const changeTodolistTitleAC = (todolistId: string, todolistTitle: string) => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        todolistId: todolistId,
        todolistTitle: todolistTitle
    } as const
}

export const changeTodolistFilterAC = (todolistId: string, todolistFilter: FilterValuesType) => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        todolistId: todolistId,
        filter: todolistFilter
    } as const
}

export const todolistReducer = (state: Array<TodolistType>, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case "ADD-TODOLIST": {
            let newState: Array<TodolistType> = [...state];
            let newTodolist: TodolistType = {
                id: action.todolistId,
                title: action.todolistTitle,
                filter: "all"
            };
            newState = [...state, newTodolist];
            return newState;
        }
        case "DELETE-TODOLIST": {
            let newState: Array<TodolistType> = [...state];
            return newState.filter(tl => tl.id !== action.todolistId);
        }
        case "CHANGE-TODOLIST-TITLE" : {
            let newState: Array<TodolistType> = [...state];
            let changedTodolist: TodolistType | undefined = newState.find(tl => tl.id === action.todolistId);
            if (changedTodolist) {
                changedTodolist.title = action.todolistTitle;
            }
            return [...newState];
        }
        case "CHANGE-TODOLIST-FILTER" : {
            let newState: Array<TodolistType> = [...state];
            let changedTodolist: TodolistType | undefined = newState.find(tl => tl.id === action.todolistId);
            if (changedTodolist) {
                changedTodolist.filter = action.filter;
            }
            return [...newState];
        }
        default: {
            throw new Error("Error");
        }
    }
}
