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

export const todoListId1 = v1();
export const todoListId2 = v1();

const initialState: Array<TodolistType> = [
    {id: todoListId1, title: "Technologies", filter: "all"},
    {id: todoListId2, title: "Nano machines", filter: "all"}
];

export const todolistReducer = (state: Array<TodolistType> = initialState, action: ActionsType): Array<TodolistType> => {
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
            newState = newState.map(tl => tl.id === action.todolistId ? {...tl, title: action.todolistTitle} : tl);
            return newState;
        }
        case "CHANGE-TODOLIST-FILTER" : {
            let newState: Array<TodolistType> = [...state];
            newState = newState.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl);
            return newState;
        }
        default: {
            return state;
        }
    }
}
