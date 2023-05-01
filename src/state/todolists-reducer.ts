import { Reducer } from "redux";
import { TodolistsAPI, TodolistsType } from "../api/todolists-api";
import { ThunkAction } from "@reduxjs/toolkit";
import { AppRootState } from "./store";

export type FilterValuesType = "All" | "Done" | "Active";
type ChangeTitleType ={
  type: 'CHANGE_TODOLIST_TITLE'
  tId: string
  title: string
}
export type RemoveTodolistType = {
  type: 'REMOVE_TODOLIST'
  tId: string
}
export type AddTodolistType = {
  type: 'ADD_TODOLIST'
  todolist: TodolistsType
}
type ChangeFilterType = {
  type: 'CHANGE_TODOLIST_FILTER'
  tId: string
  filter: FilterValuesType
}
export type SetTodolistsType = {
  type: 'SET-TODOLISTS'
  todolists: TodolistsType[]
}
type ActionType = ChangeFilterType | RemoveTodolistType | ChangeTitleType | AddTodolistType | SetTodolistsType
export type InitialStateTodoListType = TodolistsType & {
  filter: FilterValuesType
}
const initialState: InitialStateTodoListType[]  = [

];
export const todolistReducer: Reducer<InitialStateTodoListType[], ActionType> = (state = initialState , action): InitialStateTodoListType[] => {
  switch (action.type) {
    case 'REMOVE_TODOLIST': {
      return [...state].filter((tl) => tl.id !== action.tId)
    }
    case 'ADD_TODOLIST': {
      const newTodolist: InitialStateTodoListType = {...action.todolist, filter: 'All'}
      return [newTodolist, ...state]
      
    }
    case 'CHANGE_TODOLIST_TITLE': {
      const stateCopy = state.map( (t)=> {
        if (t.id === action.tId) {
          return {...t, title: action.title}
        }
        return t;
      });
      return stateCopy;
    }
    case 'CHANGE_TODOLIST_FILTER': {
      const stateCopy = state.map( t => {
        if (t.id === action.tId) {
          return {...t, filter: action.filter}
        }
        return t;
      })
      return stateCopy;
    }
    case 'SET-TODOLISTS': {
      return action.todolists.map( (tl) => {
        return {...tl,
        filter: 'All'}
      })
    }
    default:
      return state;
  }
}
export const removeTodoAC = (tId: string): RemoveTodolistType => {
  return {type: 'REMOVE_TODOLIST', tId}
}
export const addTodoAC = (todolist: TodolistsType): AddTodolistType => {
  return {type: 'ADD_TODOLIST', todolist}
}
export const changeTitleTodoAC = (title: string, tId: string): ChangeTitleType => {
  return {type: 'CHANGE_TODOLIST_TITLE', title, tId}
}
export const changeFilterTodoAC = (filter: FilterValuesType, tId: string): ChangeFilterType => {
  return {type: 'CHANGE_TODOLIST_FILTER', filter, tId}
}
export const setTodoAC = (todolists: TodolistsType[]): SetTodolistsType => {
  return {type: 'SET-TODOLISTS', todolists}
}
export const getTodolists = (): ThunkAction<Promise<void>, AppRootState, unknown, ActionType> => {
  return async (dispatch) => {
    TodolistsAPI.getTodolists().then((data) => {
      dispatch(setTodoAC(data.data));
    });
  }
}
export const deleteTodolists = (id: string): ThunkAction<Promise<void>, AppRootState, unknown, ActionType> => {
  return async (dispatch) => {
    TodolistsAPI.deleteTodolist(id).then((data) => {
      dispatch(removeTodoAC(id));
    });
  }
}
export const createTodolists = (title: string): ThunkAction<Promise<void>, AppRootState, unknown, ActionType> => {
  return async (dispatch) => {
    TodolistsAPI.createTodolist(title).then((data) => {
      dispatch(addTodoAC(data.data.data.item));
    });
  }
}
export const updateTodolistTitle = (title: string, id: string): ThunkAction<Promise<void>, AppRootState, unknown, ActionType> => {
  return async (dispatch) => {
    TodolistsAPI.updateTitle(title, id).then((data) => {
      dispatch(changeTitleTodoAC(title, id));
    });
  }
}