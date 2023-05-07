import { Reducer } from "redux";
import { ThunkAction } from "@reduxjs/toolkit";
import { TodolistsType, TodolistsAPI } from "../../api/todolists-api";
import { ActionType, AppRootState } from "../../app/store";
import { StatusType, setAppStatusAC } from "../../app/app-reducer";
import { handleServerAppError, handleServerNetworkError } from "../../utils/error-utils";

//actions type
export const REMOVE_TODOLIST = 'REMOVE_TODOLIST';
export const ADD_TODOLIST = 'ADD_TODOLIST';
const CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE';
const CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER';
export const SET_TODOLISTS = 'SET-TODOLISTS';
const CHANGE_TODOLIST_ENTITI_STATUS = 'CHANGE_TODOLIST_ENTITI_STATUS'
const initialState: InitialStateTodoListType[] = [];
//reducer
export const todolistReducer: Reducer<InitialStateTodoListType[], ActionType> = (state = initialState, action): InitialStateTodoListType[] => {
  switch (action.type) {
    case REMOVE_TODOLIST:
      return [...state].filter((tl) => tl.id !== action.tId)
    case ADD_TODOLIST:
      return [{ ...action.todolist, filter: 'All', entitiStatus: 'idle' }, ...state]
    case CHANGE_TODOLIST_TITLE:
      return state.map(t => t.id === action.tId ? { ...t, title: action.title } : t);
    case CHANGE_TODOLIST_FILTER:
      return state.map(t => t.id === action.tId ? { ...t, filter: action.filter } : t)
    case CHANGE_TODOLIST_ENTITI_STATUS: 
      return state.map(t => t.id === action.tId ? { ...t, entitiStatus: action.status } : t)
    case SET_TODOLISTS:
      return action.todolists.map((tl) => ({ ...tl, filter: 'All', entitiStatus: 'idle' }))
    default:
      return state;
  }
}
//action-creators
export const removeTodoAC = (tId: string) => ({ type: REMOVE_TODOLIST, tId } as const)
export const addTodoAC = (todolist: TodolistsType) => ({ type: ADD_TODOLIST, todolist } as const)
export const changeTitleTodoAC = (title: string, tId: string) => ({ type: CHANGE_TODOLIST_TITLE, title, tId } as const)
export const changeFilterTodoAC = (filter: FilterValuesType, tId: string) => ({ type: CHANGE_TODOLIST_FILTER, filter, tId } as const)
export const changeEntitiStatusTodoAC = (status: StatusType, tId: string) => ({ type: CHANGE_TODOLIST_ENTITI_STATUS, status, tId } as const)
export const setTodoAC = (todolists: TodolistsType[]) => ({ type: SET_TODOLISTS, todolists } as const)
//thunks
export const getTodolists = (): ThunkType => async dispatch => {
  dispatch(setAppStatusAC('loading'))
  TodolistsAPI.getTodolists().then(res=>{
    dispatch(setTodoAC(res.data));
    dispatch(setAppStatusAC('succeeded'))
  }).catch(e=>{
    handleServerNetworkError(e.message, dispatch)
  })
}
export const deleteTodolists = (id: string): ThunkType => async dispatch => {
  dispatch(setAppStatusAC('loading'))
  dispatch(changeEntitiStatusTodoAC('loading', id))
  TodolistsAPI.deleteTodolist(id).then(res=>{
    if(res.data.resultCode === 0) {
      dispatch(removeTodoAC(id));
      dispatch(setAppStatusAC('succeeded'))
    } else {
      handleServerAppError(res.data, dispatch)
    }
  }).catch(e=>{
    handleServerNetworkError(e.message, dispatch)
  })
  
}
export const createTodolists = (title: string): ThunkType => async dispatch => {
  dispatch(setAppStatusAC('loading'))
  TodolistsAPI.createTodolist(title).then(res=>{
    if(res.data.resultCode === 0) {
      dispatch(addTodoAC(res.data.data.item));
      dispatch(setAppStatusAC('succeeded'))
    } else {
      handleServerAppError(res.data, dispatch)
    }
  }).catch(e=>{
    handleServerNetworkError(e.message, dispatch)
  })
  
}
export const updateTodolistTitle = (title: string, id: string): ThunkType => async dispatch => {
  dispatch(setAppStatusAC('loading'))
  TodolistsAPI.updateTitle(title, id).then(res => {
    if(res.data.resultCode === 0) {
      dispatch(changeTitleTodoAC(title, id));
      dispatch(setAppStatusAC('succeeded'))
    } else {
      handleServerAppError(res.data, dispatch)
    }
  }).catch(e=>{
    handleServerNetworkError(e.message, dispatch)
  })
  
}
//types
export type ThunkType = ThunkAction<Promise<void>, AppRootState, unknown, ActionType>
export type FilterValuesType = "All" | "Done" | "Active";
export type InitialStateTodoListType = TodolistsType & {
  filter: FilterValuesType
  entitiStatus: StatusType
}