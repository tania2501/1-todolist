import { Reducer } from "redux";
import { TodolistsAPI, TodolistsType } from "../../../api/todolists-api";
import { ThunkAction } from "@reduxjs/toolkit";
import { ActionType, AppRootState } from "../../../app/store";
//actions type
export const REMOVE_TODOLIST = 'REMOVE_TODOLIST';
export const ADD_TODOLIST = 'ADD_TODOLIST';
const CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE';
const CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER';
export const SET_TODOLISTS = 'SET-TODOLISTS';
const initialState: InitialStateTodoListType[]  = [];
//reducer
export const todolistReducer: Reducer<InitialStateTodoListType[], ActionType> = (state = initialState , action): InitialStateTodoListType[] => {
  switch (action.type) {
    case REMOVE_TODOLIST:
      return [...state].filter((tl) => tl.id !== action.tId)
    case ADD_TODOLIST:
      return [{...action.todolist, filter: 'All'}, ...state]
    case CHANGE_TODOLIST_TITLE: 
      return state.map(t => t.id === action.tId ? {...t, title: action.title} : t);
    case CHANGE_TODOLIST_FILTER:
      return state.map(t => t.id === action.tId ? {...t, filter: action.filter} : t)
    case SET_TODOLISTS: 
      return action.todolists.map((tl) => ({...tl, filter: 'All'}))
    default:
      return state;
  }
}
//action-creators
export const removeTodoAC = (tId: string) => ({type: REMOVE_TODOLIST, tId} as const)
export const addTodoAC = (todolist: TodolistsType) => ({type: ADD_TODOLIST, todolist} as const)
export const changeTitleTodoAC = (title: string, tId: string) => ({type: CHANGE_TODOLIST_TITLE, title, tId} as const)
export const changeFilterTodoAC = (filter: FilterValuesType, tId: string) =>( {type: CHANGE_TODOLIST_FILTER, filter, tId} as const)
export const setTodoAC = (todolists: TodolistsType[]) => ({type: SET_TODOLISTS, todolists} as const)
//thunks
export const getTodolists = (): ThunkType => {
  return async (dispatch) => {
    TodolistsAPI.getTodolists().then((data) => {
      dispatch(setTodoAC(data.data));
    });
  }
}
export const deleteTodolists = (id: string):ThunkType => {
  return async (dispatch) => {
    TodolistsAPI.deleteTodolist(id).then((data) => {
      dispatch(removeTodoAC(id));
    });
  }
}
export const createTodolists = (title: string): ThunkType => {
  return async (dispatch) => {
    TodolistsAPI.createTodolist(title).then((data) => {
      dispatch(addTodoAC(data.data.data.item));
    });
  }
}
export const updateTodolistTitle = (title: string, id: string): ThunkType => {
  return async (dispatch) => {
    TodolistsAPI.updateTitle(title, id).then((data) => {
      dispatch(changeTitleTodoAC(title, id));
    });
  }
}
//types
export type ThunkType = ThunkAction<Promise<void>, AppRootState, unknown, ActionType>
export type FilterValuesType = "All" | "Done" | "Active";
export type InitialStateTodoListType = TodolistsType & {
  filter: FilterValuesType
}