import React, {useState} from 'react';
import './App.css';
import Todolist from "./todolist/Todolist";
import { v1 } from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false}
    ]);

    let [filter, setFilter] = useState<FilterValuesType>("all");

    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone);
    }

    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone);
    }

    function addTask(title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let newTaskArray = [newTask, ...tasks];
        setTasks(newTaskArray);
    }

    function deleteTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    return (
        <div className="App">
            <div className="App__container>">
                <div className="todolist__title">
                    <h2>What to learn</h2>
                </div>
                <div className="todolist__items">
                    <Todolist title="Technologies"
                              tasks={tasksForTodolist}
                              addTask={addTask}
                              deleteTask={deleteTask}
                              changeFilter={changeFilter}/>
                </div>
            </div>
        </div>
    );
}

export default App;