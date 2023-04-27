import React, { useEffect, useState } from "react";
import axios from "axios";
import { TodolistsAPI } from "../api/todolists-api";

export default {
  title: "API/Tasks",
};

export const GetTasks = () => {
  const [state, setState] = useState<any>(null);
  const [id, setId] = useState<string>('')
  const getTasks = () => {
    TodolistsAPI.getTasks(id).then((res) => {
      setState(res.data);
    });
  }
  return <div>{JSON.stringify(state)}
    <div>
      <input type="text" value={id} placeholder="todolists id" onChange={(e) => setId(e.currentTarget.value)}/>
      <button onClick={getTasks}>get tasks</button>
    </div>
  </div>;
};
export const CreateTask = () => {
  const [state, setState] = useState<any>(null);
  const [title, setTitle] = useState<string>("");
  const [id, setId] = useState<string>("");
  const createTask = () => {
    TodolistsAPI.createTask(title, id).then((res) => {
      setState(res.data);
    });
  }

  return <div>{JSON.stringify(state)}
    <div>
      <input type="text" placeholder="title" value={title} onChange={(e)=>setTitle(e.currentTarget.value)}/>
      <input type="text" placeholder="todolists id" value={id} onChange={(e)=>setId(e.currentTarget.value)}/>
      <button onClick={createTask}>add new task</button>
    </div>
  </div>;
};
export const DeleteTask = () => {
  const [state, setState] = useState<any>(null);
  const [taskId, setTaskId] = useState<string>("");
  const [todoId, setTodoId] = useState<string>("");
  const deleteTask = () => {
    TodolistsAPI.deleteTask(todoId, taskId).then((res) => {
      setState(res.data);
    });
  }

  return <div>{JSON.stringify(state)}
    <input type="text" placeholder="todolists id" value={todoId} onChange={(e)=>setTodoId(e.currentTarget.value)}/>
      <input type="text" placeholder="tasks id" value={taskId} onChange={(e)=>setTaskId(e.currentTarget.value)}/>
      <button onClick={deleteTask}>delete task</button>
  </div>;
};
export const UpdateTaskTitle = () => {
  const [state, setState] = useState<any>(null);
  const [title, setTitle] = useState<string>("");
  const [taskId, setTaskId] = useState<string>("");
  const [todoId, setTodoId] = useState<string>("");
  const updateTaskTitle = () => {
    TodolistsAPI.updateTitleTask(todoId, taskId, title).then((res) => {
      setState(res.data);
    });
  }

  return <div>{JSON.stringify(state)}
    <div>
      <input type="text" placeholder="todolists id" value={todoId} onChange={(e)=>setTodoId(e.currentTarget.value)}/>
      <input type="text" placeholder="tasks id" value={taskId} onChange={(e)=>setTaskId(e.currentTarget.value)}/>
      <input type="text" placeholder="title" value={title} onChange={(e)=>setTitle(e.currentTarget.value)}/>
      <button onClick={updateTaskTitle}>change tasks title</button>
    </div>
  </div>;
};
