import React from 'react';
import './App.css';
import Todolist from "./todolist/Todolist";

function App() {

    const task1 = [
        {id: 0, title: "HTML&CSS", isDone: true},
        {id: 1, title: "JS", isDone: true},
        {id: 2, title: "React", isDone: false}
    ]

    const task2 = [
        {id: 0, title: "Something", isDone: true},
        {id: 1, title: "Something", isDone: true},
        {id: 2, title: "Something", isDone: false}
    ]

    const task3 = [
        {id: 0, title: "Something", isDone: false},
        {id: 1, title: "Something", isDone: false},
        {id: 2, title: "Something", isDone: false}
    ]

    return (
        <div className="App">
            <div className="App__container>">
                <div className="todolist__title">
                    <h2>What to learn</h2>
                </div>
                <div className="todolist__items">
                    <Todolist title="Technologies"
                              tasks={task1}/>
                    <Todolist title="Books"
                              tasks={task2}/>
                    <Todolist title="Songs"
                              tasks={task3}/>
                </div>
            </div>
        </div>
    );
}

export default App;