import {ThunkType, addTodoAC, removeTodoAC, setTodoAC } from '../Todolist/todolists-reducer';
import { TaskType, TaskStatus, TodolistsAPI, UpdateTaskModelType } from '../../../api/todolists-api';
import { setAppStatusAC } from '../../../app/app-reducer';
import { handleServerAppError, handleServerNetworkError } from '../../../utils/error-utils';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: MainTasksType = {} as MainTasksType
//reducer
const slice = createSlice({
  name: 'tasks',
  initialState: initialState,
  reducers: {
    addTaskAC(state, action: PayloadAction<{task: TaskType}>) {
      state[action.payload.task.todoListId].unshift(action.payload.task)
    },
    removeTasksAC(state, action: PayloadAction<{idTodo: string, idTask: string}>) {
      const tasks = state[action.payload.idTodo];
      const index = tasks.findIndex( t => t.id === action.payload.idTask)
      if(index > -1) {
        tasks.splice(index, 1)
      } 
    },
    changeTasksStatusAC(state, action: PayloadAction<{idTodo: string, idTask: string, status: TaskStatus}>) {
      const tasks = state[action.payload.idTodo];
      const index = tasks.findIndex( t => t.id === action.payload.idTask)
      if(index > -1) {
        tasks[index].status = action.payload.status
      } 
    },
    setTaskAC(state, action: PayloadAction<{tasks: TaskType[], todolistId: string}>) {
      state[action.payload.todolistId] = action.payload.tasks
    },
    changeTasksTitleAC(state, action: PayloadAction<{idTodo: string, idTask: string, title: string}>) {
      const tasks = state[action.payload.idTodo];
      const index = tasks.findIndex( t => t.id === action.payload.idTask)
      if(index > -1) {
        tasks[index].title = action.payload.title
      } 
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addTodoAC, (state, action) => {
      state[action.payload.todolist.id] = []
    });
    builder.addCase(removeTodoAC, (state, action) => {
      delete state[action.payload.tId]
    });
    builder.addCase(setTodoAC, (state, action) => {
      action.payload.todolists.forEach((tl: any) => {
        state[tl.id] = []
      });
    })
  }
})
export const taskReducer = slice.reducer
export const {addTaskAC, removeTasksAC, changeTasksStatusAC, changeTasksTitleAC, setTaskAC} = slice.actions

//thunks
export const getTasks = (tId: string): ThunkType => async dispatch => {
  dispatch(setAppStatusAC({status: 'loading'}))
  TodolistsAPI.getTasks(tId).then((res)=>{
    dispatch(setTaskAC({tasks: res.data.items, todolistId: tId}));
    dispatch(setAppStatusAC({status: 'succeeded'}))
  }).catch((e)=>{
    handleServerNetworkError(e.message, dispatch)
  })
  
}
export const deleteTask = (tId: string, taskId: string): ThunkType => async dispatch => {
  dispatch(setAppStatusAC({status: 'loading'}))
  TodolistsAPI.deleteTask(tId, taskId).then(res=>{
    if(res.data.resultCode === 0) {
      dispatch(removeTasksAC({idTodo: tId, idTask: taskId}));
      dispatch(setAppStatusAC({status: 'succeeded'}))
    } else {
      handleServerAppError(res.data, dispatch)
    }
  }).catch((e)=>{
    handleServerNetworkError(e.message, dispatch)
  })
  
}
export const createTask = (title: string, taskId: string): ThunkType => async dispatch => {
  dispatch(setAppStatusAC({status: 'loading'}))
  TodolistsAPI.createTask(title, taskId).then((res) => {
    if (res.data.resultCode === 0) {
      dispatch(addTaskAC({task: res.data.data.item}));
      dispatch(setAppStatusAC({status: 'succeeded'}))
    } else {
      handleServerAppError(res.data, dispatch)
    } 
  }).catch((e) => {
    handleServerNetworkError(e.message, dispatch)
  })
}
export const updateTaskTitle = (todoId: string, taskId: string, title: string): ThunkType => async (dispatch, getState) => {
  dispatch(setAppStatusAC({status: 'loading'}))
  const state = getState();
  const task = state.tasks[todoId].find(t => t.id === taskId)
  if (!task) {
    console.warn('task not found in state')
    return
  }
  const model: UpdateTaskModelType = { ...task, title: title }
  TodolistsAPI.updateTitleTask(todoId, taskId, model).then((res) => {
    if (res.data.resultCode === 0) {
      dispatch(changeTasksTitleAC({idTodo: todoId, idTask: taskId, title: title}));
      dispatch(setAppStatusAC({status: 'succeeded'}))
    } else {
      handleServerAppError(res.data, dispatch)
    }
  }).catch((e) => {
    handleServerNetworkError(e.message, dispatch)
  })

}
export const changeTaskStatus = (todoId: string, taskId: string, status: TaskStatus): ThunkType => async (dispatch, getState) => {
  dispatch(setAppStatusAC({status: 'loading'}))
  const state = getState();
  const task = state.tasks[todoId].find(t => t.id === taskId)
  if (!task) {
    console.warn('task not found in state')
    return
  }
  const model: UpdateTaskModelType = { ...task, status: status }
  TodolistsAPI.updateStatus(todoId, taskId, model).then(res=>{
    if(res.data.resultCode === 0) {
      dispatch(changeTasksStatusAC({idTodo: todoId, idTask: taskId, status}));
      dispatch(setAppStatusAC({status: 'succeeded'}))
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