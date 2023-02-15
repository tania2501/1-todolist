import React, { useState } from "react";
import { v1 } from "uuid";
import "./App.css";
import { TasksType, TodoList } from "./TodoList";

export type FilterValuesType = 'all' | 'completed' | 'active';
function App() {
  let [tasks, setTasks] = useState<Array<TasksType>>( [
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
    { id: v1(), title: "Rest API", isDone: false },
    { id: v1(), title: "GraphQL", isDone: false },
  ]);

  let [filter, setFilter] = useState<FilterValuesType>('all');
  
  const addTasks = (title: string) => {
    let newTask = {
      id: v1(), 
      title: title, 
      isDone: false
    };
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks)
  }
  const removeTask = (id: string)=>{
    let filteredTasks = tasks.filter(t => t.id !== id);
    setTasks(filteredTasks);
  };
  const changeFilter = (value: FilterValuesType) => {
    setFilter(value);
  }
  let taskForTodoList = tasks;
  if (filter === 'completed') {
    taskForTodoList = tasks.filter(t => t.isDone === true);
  }
  if (filter === 'active') {
    taskForTodoList = tasks.filter(t => t.isDone === false);
  }

  const changeStatus =(taskId: string, isDone: boolean)=> {
    let task = tasks.find( (t) => t.id === taskId);
    if (task) {
       task.isDone = isDone
    }
    setTasks([...tasks]);
   
  }
  return (
    <div className="App">
      <TodoList title="What to learn" 
                tasks={taskForTodoList}
                removeTask={removeTask} 
                changeFilter={changeFilter}
                addTasks={addTasks}
                changeStatus={changeStatus}
                filter={filter}/>
    </div>
  );
}
export default App;
