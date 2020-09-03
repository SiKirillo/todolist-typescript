import {
    addTaskAC,
    deleteTaskAC,
    changeTaskTitleAC,
    changeTaskStatusAC,
    taskReducer
} from "../task-reducer";
import {addTodolistAC, deleteTodolistAC} from "../todolist-reducer";
import {v1} from "uuid";
import {TasksStateType} from "../../todolist/Todolist";

let todolistId1: string;
let todolistId2: string;
let startState: TasksStateType = {};

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = {
        todolistId1: [
            {id: "1", title: "css", isDone: false},
            {id: "2", title: "js", isDone: true},
            {id: "3", title: "react", isDone: false}
        ],
        todolistId2: [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "honey", isDone: true}
        ]
    }
});

test("correct task should be added to correct array", () => {
    const newTaskTitle = "onion";

    const action = addTaskAC(todolistId2, newTaskTitle);
    const endState = taskReducer(startState, action);

    expect(endState[todolistId1].length).toBe(3);
    expect(endState[todolistId2].length).toBe(4);
    expect(endState[todolistId2][3].id).toBeDefined();
    expect(endState[todolistId2][3].title).toBe(newTaskTitle);
    expect(endState[todolistId2][3].isDone).toBe(false);
});

test("correct task should be removed from correct array", () => {
    const action = deleteTaskAC(todolistId2, "2");
    const endState = taskReducer(startState, action);

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(2);
    expect(endState["todolistId2"].every(t => t.id !== "2")).toBeTruthy();
});

test("status of specified task should be changed", () => {
    const newTaskTitle = "onion";

    const action = changeTaskTitleAC(todolistId2, "3", newTaskTitle);
    const endState = taskReducer(startState, action);

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(3);
    expect(endState["todolistId2"][2].title).toBe(newTaskTitle);
});

test("title of specified task should be changed", () => {
    const action = changeTaskStatusAC(todolistId2, "3", false);
    const endState = taskReducer(startState, action);

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(3);
    expect(endState["todolistId2"][2].isDone).toBe(false);
});

test("new property with new array should be added when new todolist is added", () => {
    const action = addTodolistAC("new todolist");
    const endState = taskReducer(startState, action);

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== todolistId1 && k !== todolistId2);

    if (!newKey) {
        throw Error("new key should be added");
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toStrictEqual([]);
});

test("property with todolistId should be deleted", () => {
    const action = deleteTodolistAC(todolistId2);
    const endState = taskReducer(startState, action);

    const keys = Object.keys(endState);

    expect(keys.length).toBe(2);
    expect(endState[todolistId2]).toBeUndefined();
});
