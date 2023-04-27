import React, { useEffect, useState } from "react";
import axios from "axios";
import { TodolistsAPI } from "../api/todolists-api";

export default {
  title: "API/Todolists",
};

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    TodolistsAPI.getTodolists().then((res) => {
      setState(res.data);
    });
  }, []);
  return <div>{JSON.stringify(state)}</div>;
};
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);
  const [title, setTitle] = useState<string>("");
  const createTodo = () => {
    TodolistsAPI.createTodolist(title).then((res) => {
      setState(res.data);
    });
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
        <button onClick={createTodo}>add todolist</button>
      </div>
    </div>
  );
};
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);
  const [id, setId] = useState<string>("");
  const deleteTodo = () => {
    TodolistsAPI.deleteTodolist(id).then((res) => {
      setState(res.data);
    });
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.currentTarget.value)}
        />
        <button onClick={deleteTodo}>delete todolist</button>
      </div>
    </div>
  );
};
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);
  const [title, setTitle] = useState<string>("");
  const [id, setId] = useState<string>("");
  const updateTitle = () => {
    TodolistsAPI.updateTitle(title, id).then((res) => {
      setState(res.data);
    });
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          placeholder="title"
        />
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.currentTarget.value)}
          placeholder="todolists id"
        />
        <button onClick={updateTitle}>change todolists title</button>
      </div>
    </div>
  );
};
