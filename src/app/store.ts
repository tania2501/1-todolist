import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { addTaskAC, removeTasksAC, changeTasksStatusAC, changeTasksTitleAC, setTaskAC, taskReducer } from '../pages/TodolistsLists/Task/task-reducer';
import { removeTodoAC, addTodoAC, changeTitleTodoAC, changeFilterTodoAC, setTodoAC, todolistReducer } from '../pages/TodolistsLists/todolists-reducer';
import { appReducer, setErrorAC, setStatusAC } from './app-reducer';


export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

export type ActionType = ReturnType<typeof removeTodoAC> | ReturnType<typeof addTodoAC> | ReturnType<typeof changeTitleTodoAC> | ReturnType<typeof changeFilterTodoAC> | ReturnType<typeof setTodoAC> | ReturnType<typeof addTaskAC> | ReturnType<typeof removeTasksAC> | ReturnType<typeof changeTasksStatusAC> | ReturnType<typeof changeTasksTitleAC> | ReturnType<typeof setTaskAC> | ReturnType<typeof setErrorAC> | ReturnType<typeof setStatusAC>
const rootReducer = combineReducers({
  todolists: todolistReducer,
  tasks: taskReducer,
  app: appReducer
})

export const store = configureStore({reducer: rootReducer});

//@ts-ignore
window.store = store;