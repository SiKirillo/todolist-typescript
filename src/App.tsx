import React from 'react';
import './App.css';
import Todolist from "./todolist/Todolist";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    deleteTodolistAC
} from "./redux/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./redux/store";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
};

function App() {

    const dispatch = useDispatch();
    const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists);

    function addTodoList(todolistTitle: string) {
        const action = addTodolistAC(todolistTitle);
        dispatch(action);
    }

    function deleteTodoList(todoListId: string) {
        const action = deleteTodolistAC(todoListId);
        dispatch(action);
    }

    function changeTodoListTitle(todolistId: string, newTitle: string) {
        const action = changeTodolistTitleAC(todolistId, newTitle);
        dispatch(action);
    }


    function changeFilter(todoListId: string, filterValue: FilterValuesType) {
        const action = changeTodolistFilterAC(todoListId, filterValue);
        dispatch(action);
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
                    {todolists.map((tl) => {

                        return <Grid item>
                            <Paper style={{padding: "10px"}}>
                                <Todolist key={tl.id}
                                          id={tl.id}
                                          title={tl.title}
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