import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    deleteTodolistAC,
    todolistReducer
} from "../todolist-reducer";
import {FilterValuesType, TodolistType} from "../../App";
import {v1} from "uuid";

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistType> = [];

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "title", filter: "all"},
        {id: todolistId2, title: "title", filter: "all"}
    ];
});

test("correct todolist should be added", () => {
    const newTodolistTitle = "New title";

    const action = addTodolistAC(newTodolistTitle);
    const endState = todolistReducer(startState, action);

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test("correct todolist should be removed", () => {
    const action = deleteTodolistAC(todolistId2);
    const endState = todolistReducer(startState, action);

    expect(endState.length).toBe(1);
    expect(endState.every(tl => tl.id !== "2")).toBeTruthy();
});

test("correct todolist should change its name", () => {
    const newTodolistTitle = "New title";

    const action = changeTodolistTitleAC(todolistId2, newTodolistTitle);
    const endState = todolistReducer(startState, action);

    expect(endState[0].title).toBe("title");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test("correct filter of todolist should be changed", () => {
    const newFilter: FilterValuesType = "completed";

    const action = changeTodolistFilterAC(todolistId2, newFilter);
    const endState = todolistReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});