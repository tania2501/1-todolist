import { Reducer } from 'redux';
import { ADD_TODOLIST, REMOVE_TODOLIST, SET_TODOLISTS, ThunkType } from '../Todolist/todolists-reducer';
import { TaskType, TaskStatus, TodolistsAPI, UpdateTaskModelType } from '../../../api/todolists-api';
import { ActionType } from '../../../app/store';
import { setAppStatusAC } from '../../../app/app-reducer';
import { handleServerAppError, handleServerNetworkError } from '../../../utils/error-utils';
//actions type
const ADD_TASK = 'ADD-TASK';
const REMOVE_TASK = 'REMOVE-TASK';
const CHANGE_STATUS = 'CHANGE-STATUS';
const CHANGE_TITLE = 'CHANGE-TITLE';
const SET_TASKS = 'SET-TASKS'
const initialState: MainTasksType = {}
//reducer
export const taskReducer: Reducer<MainTasksType, ActionType> = (state = initialState, action): MainTasksType => {
  switch (action.type) {
    case ADD_TASK:
      return { ...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]] }
    case REMOVE_TASK:
      return { ...state, [action.idTodo]: state[action.idTodo].filter(t => t.id !== action.idTask) }
    case CHANGE_STATUS:
      return { ...state, [action.idTodo]: state[action.idTodo].map(t => t.id === action.idTask ? { ...t, status: action.status } : t) }
    case CHANGE_TITLE:
      return { ...state, [action.idTodo]: state[action.idTodo].map(t => t.id === action.idTask ? { ...t, title: action.title } : t) }
    case ADD_TODOLIST:
      return { ...state, [action.todolist.id]: [] }
    case REMOVE_TODOLIST: {
      const stateCopy = { ...state };
      delete stateCopy[action.tId]
      return stateCopy
    }
    case SET_TODOLISTS: {
      const stateCopy = { ...state };
      action.todolists.forEach(tl => stateCopy[tl.id] = [])
      return stateCopy;
    }
    case SET_TASKS:
      return { ...state, [action.todolistId]: action.tasks }
    default:
      return state;
  }
}
//Action-creators
export const addTaskAC = (task: TaskType) => ({ type: ADD_TASK, task } as const)
export const removeTasksAC = (idTodo: string, idTask: string) => ({ type: REMOVE_TASK, idTodo, idTask } as const)
export const changeTasksStatusAC = (idTodo: string, idTask: string, status: TaskStatus) => ({ type: CHANGE_STATUS, idTodo, idTask, status } as const)
export const changeTasksTitleAC = (idTodo: string, idTask: string, title: string) => ({ type: CHANGE_TITLE, idTodo, idTask, title } as const)
export const setTaskAC = (tasks: TaskType[], todolistId: string) => ({ type: SET_TASKS, tasks, todolistId } as const)
//thunks
export const getTasks = (tId: string): ThunkType => async dispatch => {
  dispatch(setAppStatusAC('loading'))
  TodolistsAPI.getTasks(tId).then((res)=>{
    dispatch(setTaskAC(res.data.items, tId));
    dispatch(setAppStatusAC('succeeded'))
  }).catch((e)=>{
    handleServerNetworkError(e.message, dispatch)
  })
  
}
export const deleteTask = (tId: string, taskId: string): ThunkType => async dispatch => {
  dispatch(setAppStatusAC('loading'))
  TodolistsAPI.deleteTask(tId, taskId).then(res=>{
    if(res.data.resultCode === 0) {
      dispatch(removeTasksAC(tId, taskId));
      dispatch(setAppStatusAC('succeeded'))
    } else {
      handleServerAppError(res.data, dispatch)
    }
  }).catch((e)=>{
    handleServerNetworkError(e.message, dispatch)
  })
  
}
export const createTask = (title: string, taskId: string): ThunkType => async dispatch => {
  dispatch(setAppStatusAC('loading'))
  TodolistsAPI.createTask(title, taskId).then((res) => {
    if (res.data.resultCode === 0) {
      dispatch(addTaskAC(res.data.data.item));
      dispatch(setAppStatusAC('succeeded'))
    } else {
      handleServerAppError(res.data, dispatch)
    } 
  }).catch((e) => {
    handleServerNetworkError(e.message, dispatch)
  })
}
export const updateTaskTitle = (todoId: string, taskId: string, title: string): ThunkType => async (dispatch, getState) => {
  dispatch(setAppStatusAC('loading'))
  const state = getState();
  const task = state.tasks[todoId].find(t => t.id === taskId)
  if (!task) {
    console.warn('task not found in state')
    return
  }
  const model: UpdateTaskModelType = { ...task, title: title }
  TodolistsAPI.updateTitleTask(todoId, taskId, model).then((res) => {
    if (res.data.resultCode === 0) {
      dispatch(changeTasksTitleAC(todoId, taskId, title));
      dispatch(setAppStatusAC('succeeded'))
    } else {
      handleServerAppError(res.data, dispatch)
    }
  }).catch((e) => {
    handleServerNetworkError(e.message, dispatch)
  })

}
export const changeTaskStatus = (todoId: string, taskId: string, status: TaskStatus): ThunkType => async (dispatch, getState) => {
  dispatch(setAppStatusAC('loading'))
  const state = getState();
  const task = state.tasks[todoId].find(t => t.id === taskId)
  if (!task) {
    console.warn('task not found in state')
    return
  }
  const model: UpdateTaskModelType = { ...task, status: status }
  TodolistsAPI.updateStatus(todoId, taskId, model).then(res=>{
    if(res.data.resultCode === 0) {
      dispatch(changeTasksStatusAC(todoId, taskId, status));
      dispatch(setAppStatusAC('succeeded'))
    } else {
      handleServerAppError(res.data, dispatch)
    }
  }).catch(e=>{
    handleServerNetworkError(e.message, dispatch)
  })
  
}
//types
export type MainTasksType = {
  [key: string]: TaskType[];
};