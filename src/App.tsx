import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./todolist/Todolist";
import {v1} from 'uuid';
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
};

export type TasksStateType = {
    [key: string]: Array<TaskType>
};

function App() {

    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todoListId1, title: "Technologies", filter: "all"},
        {id: todoListId2, title: "Nano machines", filter: "all"}
    ]);

    let [allTasks, setAllTasks] = useState<TasksStateType>({
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: "Java", isDone: true},
            {id: v1(), title: "Java", isDone: true},
            {id: v1(), title: "Java", isDone: false},
            {id: v1(), title: "Java", isDone: false},
            {id: v1(), title: "Java", isDone: false}
        ]
    });

    function addTodoList(title: string) {
        let todoList: TodolistType = {
            id: v1(),
            title: title,
            filter: "all"
        };
        setTodoLists([todoList, ...todoLists]);
        setAllTasks({...allTasks, [todoList.id]: []})
    }

    function deleteTodoList(todoListId: string) {
        let filteredTodoLists = todoLists.filter(tl => tl.id !== todoListId);
        setTodoLists(filteredTodoLists);
        delete allTasks[todoListId];
        setAllTasks({...allTasks});
    }

    function changeTodoListTitle(id: string, newTitle: string) {
        const todoList = todoLists.find(tl => tl.id === id);
        if (todoList) {
            todoList.title = newTitle;
            setTodoLists([...todoLists]);
        }
    }

    function addTask(todoListId: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let tasks = allTasks[todoListId];
        allTasks[todoListId] = [newTask, ...tasks];
        setAllTasks({...allTasks});
    }

    function deleteTask(todoListId: string, id: string) {
        let tasks = allTasks[todoListId];
        allTasks[todoListId] = tasks.filter(t => t.id !== id);
        setAllTasks({...allTasks});
    }

    function changeTaskTitle(todoListId: string, id: string, newTitle: string) {
        let tasks = allTasks[todoListId];
        let task = tasks.find(t => t.id === id);
        if (task) {
            task.title = newTitle;
            setAllTasks({...allTasks});
        }
    }

    function changeTaskStatus(todoListId: string, id: string, isDone: boolean) {
        let tasks = allTasks[todoListId];
        let task = tasks.find(t => t.id === id);
        if (task) {
            task.isDone = isDone;
            setAllTasks({...allTasks});
        }
    }

    function changeFilter(todoListId: string, value: FilterValuesType) {
        let todoList = todoLists.find(tl => tl.id === todoListId);
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists]);
        }
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{paddingTop: "10px", paddingBottom: "10px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={5}>
                    {todoLists.map((tl) => {

                        let tasksForTodolist = allTasks[tl.id];

                        if (tl.filter === "active") {
                            tasksForTodolist = tasksForTodolist.filter(tl => !tl.isDone);
                        }

                        if (tl.filter === "completed") {
                            tasksForTodolist = tasksForTodolist.filter(tl => tl.isDone);
                        }

                        return <Grid item>
                            <Paper style={{padding: "10px"}}>
                                <Todolist key={tl.id}
                                          id={tl.id}
                                          title={tl.title}
                                          allTasks={tasksForTodolist}
                                          addTask={addTask}
                                          deleteTask={deleteTask}
                                          changeTaskTitle={changeTaskTitle}
                                          changeTaskStatus={changeTaskStatus}
                                          changeFilter={changeFilter}
                                          filter={tl.filter}
                                          changeTodoListTitle={changeTodoListTitle}
                                          deleteTodoList={deleteTodoList}/>
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;