import React, {useState} from 'react';
import './App.css';
import Todolist from "./todolist/Todolist";

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    let [tasks, setTasks] = useState([
        {id: 0, title: "HTML&CSS", isDone: true},
        {id: 1, title: "JS", isDone: true},
        {id: 2, title: "React", isDone: false},
        {id: 3, title: "Rest API", isDone: false},
        {id: 4, title: "GraphQL", isDone: false}
    ]);

    let [filter, setFilter] = useState<FilterValuesType>("all");

    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone);
    }

    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    function deleteTask(id: number) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks);
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
                              deleteTask={deleteTask}
                              changeFilter={changeFilter}/>
                </div>
            </div>
        </div>
    );
}

export default App;