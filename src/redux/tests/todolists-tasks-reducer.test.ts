import {TasksStateType, TodolistType} from "../../App";
import {addTodolistAC, todolistReducer} from "../todolist-reducer";
import {taskReducer} from "../task-reducer";

test("ids should be added", () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistType> = [];

    const action = addTodolistAC("new todolist");

    const endTasksState = taskReducer(startTasksState, action);
    const endTodolistsState = todolistReducer(startTodolistsState, action);

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodolists).toBe(action.todolistId);
});