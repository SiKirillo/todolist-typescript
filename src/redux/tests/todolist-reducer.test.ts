import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    deleteTodolistAC,
    todolistReducer
} from "../todolist-reducer";
import {FilterValuesType, TodolistType} from "../../App";

test("correct todolist should be added", () => {
    const startState: Array<TodolistType> = [
        {id: "1", title: "title", filter: "all"},
        {id: "2", title: "title", filter: "all"}
    ];

    const newTodolistTitle = "New title";

    const action = addTodolistAC(newTodolistTitle);
    const endState = todolistReducer(startState, action);

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test("correct todolist should be removed", () => {
    const startState: Array<TodolistType> = [
        {id: "1", title: "title", filter: "all"},
        {id: "2", title: "title", filter: "all"}
    ];

    const action = deleteTodolistAC("2");
    const endState = todolistReducer(startState, action);

    expect(endState.length).toBe(1);
    expect(endState.every(tl => tl.id !== "2")).toBeTruthy();
});

test("correct todolist should change its name", () => {
    const startState: Array<TodolistType> = [
        {id: "1", title: "title", filter: "all"},
        {id: "2", title: "title", filter: "all"}
    ];

    const newTodolistTitle = "New title";

    const action = changeTodolistTitleAC("2", newTodolistTitle);
    const endState = todolistReducer(startState, action);

    expect(endState[0].title).toBe("title");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test("correct filter of todolist should be changed", () => {
    const startState: Array<TodolistType> = [
        {id: "1", title: "title", filter: "all"},
        {id: "2", title: "title", filter: "all"}
    ];

    const newFilter: FilterValuesType = "completed";

    const action = changeTodolistFilterAC("2", newFilter);
    const endState = todolistReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});