import { Reducer } from "redux";
import { ThunkAction } from "@reduxjs/toolkit";
import { TodolistsType, TodolistsAPI } from "../../api/todolists-api";
import { ActionType, AppRootState } from "../../app/store";
import { StatusType, setStatusAC } from "../../app/app-reducer";

//actions type
export const REMOVE_TODOLIST = 'REMOVE_TODOLIST';
export const ADD_TODOLIST = 'ADD_TODOLIST';
const CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE';
const CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER';
export const SET_TODOLISTS = 'SET-TODOLISTS';
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
export const setTodoAC = (todolists: TodolistsType[]) => ({ type: SET_TODOLISTS, todolists } as const)
//thunks
export const getTodolists = (): ThunkType => async dispatch => {
  dispatch(setStatusAC('loading'))
  const res = await TodolistsAPI.getTodolists()
  dispatch(setTodoAC(res.data));
  dispatch(setStatusAC('succeeded'))
}
export const deleteTodolists = (id: string): ThunkType => async dispatch => {
  dispatch(setStatusAC('loading'))
  await TodolistsAPI.deleteTodolist(id)
  dispatch(removeTodoAC(id));
  dispatch(setStatusAC('succeeded'))
}
export const createTodolists = (title: string): ThunkType => async dispatch => {
  dispatch(setStatusAC('loading'))
  const res = await TodolistsAPI.createTodolist(title)
  dispatch(addTodoAC(res.data.data.item));
  dispatch(setStatusAC('succeeded'))
}
export const updateTodolistTitle = (title: string, id: string): ThunkType => async dispatch => {
  dispatch(setStatusAC('loading'))
  await TodolistsAPI.updateTitle(title, id);
  dispatch(changeTitleTodoAC(title, id));
  dispatch(setStatusAC('succeeded'))
}
//types
export type ThunkType = ThunkAction<Promise<void>, AppRootState, unknown, ActionType>
export type FilterValuesType = "All" | "Done" | "Active";
export type InitialStateTodoListType = TodolistsType & {
  filter: FilterValuesType
  entitiStatus: StatusType
}