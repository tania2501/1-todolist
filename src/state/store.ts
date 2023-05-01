
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { todolistReducer } from "./todolists-reducer";
import { taskReducer } from "./task-reducer";

export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<AppRootState, unknown, AnyAction>


const rootReducer = combineReducers({
  todolists: todolistReducer,
  tasks: taskReducer
})

export const store = configureStore({reducer: rootReducer});

//@ts-ignore
window.store = store;