import { Provider } from "react-redux"
import React from "react"
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { todolistReducer } from "../../pages/TodolistsLists/Todolist/todolists-reducer";
import { appReducer } from "../../app/app-reducer";
import { taskReducer } from "../../pages/TodolistsLists/Task/task-reducer";
import { TaskStatus } from "../../api/todolists-api";
import { v1 } from "uuid";
import { AppRootState } from "../../app/store";

const rootReducer = combineReducers({
  todolists: todolistReducer,
  tasks: taskReducer,
  app: appReducer
})
const initialState: AppRootState = {
todolists: [
  { id: 'todolist1', title: "What to learn", filter: "All", addedDate: '', order: 1 , entitiStatus: 'idle'},
  { id: 'todolist2', title: "What to buy", filter: "All", addedDate: '', order: 1, entitiStatus: 'loading' },
],
  tasks: {
    ['todolist1']: [
      {  description: '', title: 'HTML&CSS', completed: true, status: TaskStatus.Completed, priority: 2, startDate: '', deadline: '', id: v1(), todoListId: '', order: 3, addedDate: ''},
      {  description: '', title: 'JS', completed: true, status: TaskStatus.Completed, priority: 2, startDate: '', deadline: '', id: v1(), todoListId: '', order: 3, addedDate: ''},
      {  description: '', title: 'ReactJS', completed: false, status: TaskStatus.New, priority: 2, startDate: '', deadline: '', id: v1(), todoListId: '', order: 3, addedDate: ''},
    ],
    ['todolist2']: [
      {  description: '', title: 'Book', completed: false, status: TaskStatus.New, priority: 2, startDate: '', deadline: '', id: v1(), todoListId: '', order: 3, addedDate: ''},
      {  description: '', title: 'Milk', completed: true, status: TaskStatus.Completed, priority: 2, startDate: '', deadline: '', id: v1(), todoListId: '', order: 3, addedDate: ''},
    ],
  },
  app: {
    error: null,
    status: 'idle',
    initialized: false,
    name: ''
  },
  login: {
    isAuth: false
  }
}
const store = configureStore({reducer: rootReducer, preloadedState: initialState});
export const ReduxStoreProviderDecorator = (storyFn: ()=> React.ReactNode) => {
  return <Provider store={store}> {storyFn()}</Provider>
}