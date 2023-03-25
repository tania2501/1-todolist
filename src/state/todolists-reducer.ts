import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "../App";

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

export const todolistReducer = (state: TodolistType[], action: ActionType): TodolistType[] => {
  switch (action.type) {
    case 'REMOVE_TODOLIST': {
      return [...state].filter((tl) => tl.id !== action.tId)
    }
    case 'ADD_TODOLIST': {
      return [
         {
          id: action.idTodo,
          title: action.title,
          filter: 'All'
        }, ...state
      ]
    }
    case 'CHANGE_TODOLIST_TITLE': {
      let todo = state.find((t) => t.id === action.tId);
      if (todo) {
        todo.title = action.title
      }
      return [...state]
    }
    case 'CHANGE_TODOLIST_FILTER': {
      let todo = state.find( el => el.id === action.tId);
      if (todo) {
        todo.filter = action.filter
      }
      return [...state]
    }
    default:
      throw new Error("I don't understand this action")
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