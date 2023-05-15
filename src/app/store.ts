import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { addTaskAC, removeTasksAC, changeTasksStatusAC, changeTasksTitleAC, setTaskAC, taskReducer } from '../pages/TodolistsLists/Task/task-reducer';
import { removeTodoAC, addTodoAC, changeTitleTodoAC, changeFilterTodoAC, setTodoAC, todolistReducer, changeEntitiStatusTodoAC } from '../pages/TodolistsLists/Todolist/todolists-reducer';
import { appReducer, setAppErrorAC, setAppStatusAC, setInitializedAC } from './app-reducer';
import { loginReducer, setAuthAC } from '../pages/Login/login-reducer';


export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

export type ActionType = ReturnType<typeof removeTodoAC> | ReturnType<typeof addTodoAC> | ReturnType<typeof changeTitleTodoAC> | ReturnType<typeof changeFilterTodoAC> | ReturnType<typeof setTodoAC> | ReturnType<typeof addTaskAC> | ReturnType<typeof removeTasksAC> | ReturnType<typeof changeTasksStatusAC> | ReturnType<typeof changeTasksTitleAC> | ReturnType<typeof setTaskAC> | ReturnType<typeof setAppErrorAC> | ReturnType<typeof setAppStatusAC> | ReturnType<typeof changeEntitiStatusTodoAC> | ReturnType<typeof setAuthAC> | ReturnType<typeof setInitializedAC>
const rootReducer = combineReducers({
  todolists: todolistReducer,
  tasks: taskReducer,
  app: appReducer,
  login: loginReducer
})

export const store = configureStore({reducer: rootReducer});

//@ts-ignore
window.store = store;