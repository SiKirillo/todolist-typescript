import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    deleteTodolistAC,
    todolistReducer
} from "./todolist-reducer";
import {v1} from "uuid";
import {FilterValuesType, TodoListType} from "../App";

test("correct todolist should be added", () => {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const newTodolistTitle = "New title";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "title", filter: "all"},
        {id: todolistId2, title: "title", filter: "all"}
    ];

    const endState = todolistReducer(startState, addTodolistAC(newTodolistTitle));

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test("correct todolist should be removed", () => {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "title", filter: "all"},
        {id: todolistId2, title: "title", filter: "all"}
    ];

    const endState = todolistReducer(startState, deleteTodolistAC(todolistId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should change its name", () => {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const newTodolistTitle = "New title";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "title", filter: "all"},
        {id: todolistId2, title: "title", filter: "all"}
    ];

    const endState = todolistReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe("title");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test("correct filter of todolist should be changed", () => {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const newFilter: FilterValuesType = "completed";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "title", filter: "all"},
        {id: todolistId2, title: "title", filter: "all"}
    ];

    const endState = todolistReducer(startState, changeTodolistFilterAC(todolistId2, newFilter));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});