import { v1 } from "uuid";
import { Reducer } from "redux";
import { todolist1, todolist2 } from "./task-reducer";
import { TodolistsType } from "../api/todolists-api";

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
  title: string
  idTodo: string
}
type ChangeFilterType = {
  type: 'CHANGE_TODOLIST_FILTER'
  tId: string
  filter: FilterValuesType
}
type ActionType = ChangeFilterType | RemoveTodolistType | ChangeTitleType | AddTodolistType
export type InitialStateTodoListType = TodolistsType & {
  filter: FilterValuesType
}
const initialState: InitialStateTodoListType[]  = [
  { id: todolist1, title: "What to learn", addedDate: '', order: 1, filter: "All" },
  { id: todolist2, title: "What to buy", addedDate: '', order: 2, filter: "All" },
];
export const todolistReducer: Reducer<InitialStateTodoListType[], ActionType> = (state = initialState , action): InitialStateTodoListType[] => {
  switch (action.type) {
    case 'REMOVE_TODOLIST': {
      return [...state].filter((tl) => tl.id !== action.tId)
    }
    case 'ADD_TODOLIST': {
      return [
         {
          id: action.idTodo,
          title: action.title,
          addedDate: '',
          order: 0,
          filter: 'All'
        }, ...state
      ]
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
    default:
      return state;
  }
}
export const removeTodoAC = (tId: string): RemoveTodolistType => {
  return {type: 'REMOVE_TODOLIST', tId}
}
export const addTodoAC = (title: string): AddTodolistType => {
  return {type: 'ADD_TODOLIST', title, idTodo: v1()}
}
export const changeTitleTodoAC = (title: string, tId: string): ChangeTitleType => {
  return {type: 'CHANGE_TODOLIST_TITLE', title, tId}
}
export const changeFilterTodoAC = (filter: FilterValuesType, tId: string): ChangeFilterType => {
  return {type: 'CHANGE_TODOLIST_FILTER', filter, tId}
}