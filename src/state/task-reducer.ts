import { useState } from 'react';

import { v1 } from 'uuid';
import { TasksType } from '../TodoList';
import { MainTasksType } from './../App';
import { AddTodolistType, RemoveTodolistType } from './todolists-reducer';
const ADD_TASK = 'ADD-TASK';
const REMOVE_TASK = 'REMOVE-TASK';
const CHANGE_STATUS = 'CHANGE-STATUS';
const CHANGE_TITLE = 'CHANGE-TITLE';
type ChangeTitle = {
  type: 'CHANGE-TITLE'
  idTodo: string
  idTask: string
  title: string
}
type ChangeStatus = {
  type: 'CHANGE-STATUS'
  idTodo: string
  idTask: string
  isDone: boolean
}
type AddTaskType = {
  type: 'ADD-TASK'
  id: string
  title: string
}
type RemoveTaskType = {
  type: 'REMOVE-TASK'
  idTodo: string
  idTask: string
}
type ActionType = AddTaskType | RemoveTaskType | ChangeStatus | ChangeTitle | AddTodolistType | RemoveTodolistType

export const taskReducer = (state: MainTasksType, action: ActionType): MainTasksType => {
  switch (action.type) {
    case ADD_TASK: {
      let stateCopy = {...state}
      let task = { id: v1(), title: action.title, isDone: false,}
      stateCopy[action.id] = [task, ...state[action.id]]
      return stateCopy;
    };
    case REMOVE_TASK: {
      let stateCopy = {...state}
      let tasks = stateCopy[action.idTodo].filter( t => t.id !== action.idTask);
      stateCopy[action.idTodo] = tasks;
      return stateCopy;
    }
    case CHANGE_STATUS: {
      const stateCopy = {...state}
      let task = stateCopy[action.idTodo].find( t => t.id === action.idTask);
      if (task) {
        task.isDone = action.isDone
      }
      return stateCopy
    }
    case CHANGE_TITLE: {
      let stateCopy = {...state}
      let task = stateCopy[action.idTodo].find( t => t.id === action.idTask);
      if (task) {
        task.title = action.title
      }
      return stateCopy
    }
    case 'ADD_TODOLIST': {
      const stateCopy = {...state}
      stateCopy[action.idTodo] = []
      return stateCopy
    }
    case 'REMOVE_TODOLIST': {
      const stateCopy = {...state};
      delete stateCopy[action.tId]
      return stateCopy
    }
    default: 
      throw new Error("I don't understand this action")  
  }
}
export const addTaskAC = (title: string, id: string): AddTaskType => {
  return {type: 'ADD-TASK',  title, id}
}
export const removeTasksAC = (idTodo: string, idTask: string): RemoveTaskType => {
  return {type: 'REMOVE-TASK', idTodo, idTask} 
}
export const changeTasksStatusAC = (idTodo: string, idTask: string, isDone: boolean): ChangeStatus => {
  return {type: 'CHANGE-STATUS', idTodo, idTask,isDone} 
}
export const changeTasksTitleAC = (idTodo: string, idTask: string, title: string): ChangeTitle => {
  return {type: 'CHANGE-TITLE', idTodo, idTask, title} 
}
