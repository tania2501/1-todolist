import React, { useEffect, useState } from "react";
import axios from "axios";
import { TodolistsAPI } from "../api/todolists-api";

export default {
  title: "API/Tasks",
};

export const GetTasks = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const todolistId = 'f2f430eb-7eab-4fc0-b12e-97229ba4885b'
    TodolistsAPI.getTasks(todolistId).then((res) => {
      setState(res.data);
    });
  }, []);
  return <div>{JSON.stringify(state)}</div>;
};
export const CreateTask = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const todolistId = 'f2f430eb-7eab-4fc0-b12e-97229ba4885b'
    TodolistsAPI.createTask("taskaaaaaaAAA", todolistId).then((res) => {
      setState(res.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};
export const DeleteTask = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const todolistId = "";
    const taskId = ''
    TodolistsAPI.deleteTask(todolistId, taskId).then((res) => {
      setState(res.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};
export const UpdateTaskTitle = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const todolistId = "";
    const taskId = ''
    TodolistsAPI.updateTitleTask(todolistId, taskId, 'fghbbbbbb').then((res) => {
      setState(res.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};
