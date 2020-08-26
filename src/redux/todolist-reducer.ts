import React from "react";
import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type ActionsType =
    ReturnType<typeof addTodolistAC>
    | ReturnType<typeof deleteTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>;

type AddTodolistAC = {
    type: "ADD-TODOLIST",
    title: string
}

type DeleteTodolistAC = {
    type: "DELETE-TODOLIST",
    id: string
}

type ChangeTodolistTitleAC = {
    type: "CHANGE-TODOLIST-TITLE",
    id: string,
    title: string
}

type ChangeTodolistFilterAC = {
    type: "CHANGE-TODOLIST-FILTER",
    id: string,
    filter: FilterValuesType
}

export const addTodolistAC = (todolistTitle: string) => {
    return {
        type: "ADD-TODOLIST",
        title: todolistTitle
    } as const
}

export const deleteTodolistAC = (todolistId: string) => {
    return {
        type: "DELETE-TODOLIST",
        id: todolistId
    } as const
}

export const changeTodolistTitleAC = (todolistId: string, todolistTitle: string) => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        id: todolistId,
        title: todolistTitle
    } as const
}

export const changeTodolistFilterAC = (todolistId: string, todolistFilter: FilterValuesType) => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        id: todolistId,
        filter: todolistFilter
    } as const
}

export const todolistReducer = (state: Array<TodoListType>, action: ActionsType) => {
    switch (action.type) {
        case "ADD-TODOLIST": {
            let newTodolist: TodoListType = {id: v1(), title: action.title, filter: "all"};
            return ([...state, newTodolist]);
        }
        case "DELETE-TODOLIST": {
            return state.filter(tl => tl.id !== action.id);
        }
        case "CHANGE-TODOLIST-TITLE" : {
            let changedTodolist = state.find(tl => tl.id === action.id);
            if (changedTodolist) {
                changedTodolist.title = action.title;
            }
            return ([...state]);
        }
        case "CHANGE-TODOLIST-FILTER" : {
            let changedTodolist = state.find(tl => tl.id === action.id);
            if (changedTodolist) {
                changedTodolist.filter = action.filter;
            }
            return ([...state]);
        }
        default: {
            throw new Error("Error");
        }
    }
}
