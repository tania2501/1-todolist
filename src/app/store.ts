import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { addTodoAC, changeFilterTodoAC, changeTitleTodoAC, removeTodoAC, setTodoAC, todolistReducer } from "../components/pages/TodolistsLists/todolists-reducer";
import { addTaskAC, changeTasksStatusAC, changeTasksTitleAC, removeTasksAC, setTaskAC, taskReducer } from "../components/pages/TodolistsLists/Task/task-reducer";

export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

export type ActionType = ReturnType<typeof removeTodoAC> | ReturnType<typeof addTodoAC> | ReturnType<typeof changeTitleTodoAC> | ReturnType<typeof changeFilterTodoAC> | ReturnType<typeof setTodoAC> | ReturnType<typeof addTaskAC> | ReturnType<typeof removeTasksAC> | ReturnType<typeof changeTasksStatusAC> | ReturnType<typeof changeTasksTitleAC> | ReturnType<typeof setTaskAC> 
const rootReducer = combineReducers({
  todolists: todolistReducer,
  tasks: taskReducer
})

export const store = configureStore({reducer: rootReducer});

//@ts-ignore
window.store = store;