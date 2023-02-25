import React, { useState } from "react";
import { v1 } from "uuid";
import "./App.css";
import { TodoList } from "./TodoList";

export type FilterValuesType = 'all' | 'completed' | 'active';

type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

function App() {
  
  const addTasks = (title: string, todolistId: string) => {
    
    let newTask = {
      id: v1(), 
      title: title, 
      isDone: false
    };
    let task = tasks[todolistId];
    let newTasks = [newTask, ...task];
    tasks[todolistId] = newTasks;
    setTasks({...tasks})
  }
  const removeTask = (id: string, todolistId: string )=>{
    let task = tasks[todolistId];
    let filteredTasks = task.filter(t => t.id !== id);
    tasks[todolistId] = filteredTasks;
    setTasks({...tasks});
  };

  const changeStatus =(taskId: string, isDone: boolean, todolistId: string)=> {
    let task = tasks[todolistId];
    let task2 = task.find( (t) => t.id === taskId);
    if (task2) {
       task2.isDone = isDone;
    }
    setTasks({...tasks});
  }

  const changeFilter = (value: FilterValuesType, tId: string) => {
    let todolists = todolist.find(tl => tl.id === tId);
    if(todolists) {
      todolists.filter =    value;
      setTodolist([...todolist])
    }
  }

  let todolist1 = v1();
  let todolist2 = v1();

  let [todolist, setTodolist] = useState<Array<TodolistType>> ([
    {id: todolist1, title: 'What to learn', filter: 'all'},
    {id: todolist2, title: 'What to buy', filter: 'all'}
  ]);
  let [tasks, setTasks] = useState({
      [todolist1]: [
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Rest API", isDone: false },
        { id: v1(), title: "GraphQL", isDone: false },
      ],
      [todolist2]: [
        {id: v1(), title: 'Book', isDone: false},
        {id: v1(), title: 'Milk', isDone: true}
      ]
  });
  const removeTodolist = (todolistId: string) => {
    let todo = todolist.filter(tl => tl.id !== todolistId);
    setTodolist(todo);

    delete tasks[todolistId];
    setTasks({...tasks})
  }
  
  return (
    <div className="App">
      {todolist.map((tl) => {
         let taskForTodoList = tasks[tl.id];
         if (tl.filter === 'completed') {
           taskForTodoList = taskForTodoList.filter(t => t.isDone === true);
         };
         if (tl.filter === 'active') {
           taskForTodoList = taskForTodoList.filter(t => t.isDone === false);
         };

        return <TodoList title={tl.title} 
                         tasks={taskForTodoList}
                         removeTask={removeTask} 
                         changeFilter={changeFilter}
                         addTasks={addTasks}
                         changeStatus={changeStatus}
                         filter={tl.filter}
                         tId={tl.id}
                         key={tl.id}
                         removeTodolist={removeTodolist}/>
      })}
    </div>
  );
}
export default App;
