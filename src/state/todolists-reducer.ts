import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "../App";

type ChangeTitleType ={
  type: 'CHANGE_TODOLIST_TITLE'
  id: string
  title: string
}
type RemoveTodolistType = {
  type: 'REMOVE_TODOLIST'
  id: string
}
type AddTodolistType = {
  type: 'ADD_TODOLIST'
  title: string
}
type ChangeFilterType = {
  type: 'CHANGE_TODOLIST_FILTER'
  id: string
  filter: FilterValuesType
}
type ActionType = ChangeFilterType | RemoveTodolistType | ChangeTitleType | AddTodolistType

export const todolistReducer = (state: TodolistType[], action: ActionType): TodolistType[] => {
  switch (action.type) {
    case 'REMOVE_TODOLIST': {
      return state.filter((tl) => tl.id !== action.id)
    }
    case 'ADD_TODOLIST': {
      return [
        ...state, {
          id: v1(),
          title: action.title,
          filter: 'All'
        }
      ]
    }
    case 'CHANGE_TODOLIST_TITLE': {
      let todo = state.find((t) => t.id === action.id);
      if (todo) {
        todo.title = action.title
      }
      return [...state]
    }
    case 'CHANGE_TODOLIST_FILTER': {
      let todo = state.find( el => el.id === action.id);
      if (todo) {
        todo.filter = action.filter
      }
      return [...state]
    }
    default:
      throw new Error("I don't understand this action")
  }
}
export const RemoveTodoAC = (tId: string): RemoveTodolistType => {
  return {type: 'REMOVE_TODOLIST', id: tId}
}
export const AddTodoAC = (title: string): AddTodolistType => {
  return {type: 'ADD_TODOLIST', title: title}
}
export const ChangeTitleTodoAC = (title: string, tId: string): ChangeTitleType => {
  return {type: 'CHANGE_TODOLIST_TITLE', title: title, id: tId}
}
export const ChangeFilterTodoAC = (filter: FilterValuesType, tId: string): ChangeFilterType => {
  return {type: 'CHANGE_TODOLIST_FILTER', filter: filter, id: tId}
}