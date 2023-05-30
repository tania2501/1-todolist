import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { taskReducer } from '../pages/TodolistsLists/Task/task-reducer';
import { todolistReducer} from '../pages/TodolistsLists/Todolist/todolists-reducer';
import { appReducer} from './app-reducer';
import { loginReducer} from '../pages/Login/login-reducer';


export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

const rootReducer = combineReducers({
  todolists: todolistReducer,
  tasks: taskReducer,
  app: appReducer,
  login: loginReducer
})

export const store = configureStore({reducer: rootReducer});

//@ts-ignore
window.store = store;