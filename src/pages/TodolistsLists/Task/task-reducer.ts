import { createTodolists, deleteTodolists, getTodolists } from '../Todolist/todolists-reducer';
import { TaskType, TaskStatus, TodolistsAPI, UpdateTaskModelType } from '../../../api/todolists-api';
import { setAppStatusAC } from '../../../app/app-reducer';
import { handleServerAppError, handleServerNetworkError } from '../../../utils/error-utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ThunkApiType } from '../../Login/login-reducer';

const initialState: MainTasksType = {} as MainTasksType

///thunks
export const getTasks = createAsyncThunk<{ tasks: TaskType[], todolistId: string }, string, ThunkApiType>('tasks/getTasks', async (tId, { dispatch, rejectWithValue }) => {
  dispatch(setAppStatusAC({ status: 'loading' }))
  try {
    const res = await TodolistsAPI.getTasks(tId);
    dispatch(setAppStatusAC({ status: 'succeeded' }))
    return { tasks: res.data.items, todolistId: tId }
  } catch (e: any) {
    handleServerNetworkError(e.message, dispatch)
    return rejectWithValue(null)
  }
})
export const deleteTask = createAsyncThunk<{ idTodo: string, idTask: string }, { tId: string, taskId: string }, ThunkApiType>('tasks/deleteTask', async (arg, { dispatch, rejectWithValue }) => {
  dispatch(setAppStatusAC({ status: 'loading' }))
  try {
    const res = await TodolistsAPI.deleteTask(arg.tId, arg.taskId)
    if (res.data.resultCode === 0) {
      dispatch(setAppStatusAC({ status: 'succeeded' }))
      return { idTodo: arg.tId, idTask: arg.taskId };
    } else {
      handleServerAppError(res.data, dispatch)
      return rejectWithValue(null)
    }
  } catch (e: any) {
    handleServerNetworkError(e.message, dispatch)
    return rejectWithValue(null)
  }
})
export const createTask = createAsyncThunk<{ task: TaskType }, { title: string, taskId: string }, ThunkApiType>('tasks/createTask', async (arg, { dispatch, rejectWithValue }) => {
  dispatch(setAppStatusAC({ status: 'loading' }))
  try {
    const res = await TodolistsAPI.createTask(arg.title, arg.taskId)
    if (res.data.resultCode === 0) {
      dispatch(setAppStatusAC({ status: 'succeeded' }))
      return { task: res.data.data.item };
    } else {
      handleServerAppError(res.data, dispatch)
      return rejectWithValue(null)
    }
  } catch (e: any) {
    handleServerNetworkError(e.message, dispatch)
    return rejectWithValue(null)
  }
});
export const updateTaskTitle = createAsyncThunk<{ idTodo: string, idTask: string, title: string }, { idTodo: string, idTask: string, title: string }, ThunkApiType>('tasks/changeTitle', async (arg, { dispatch, getState, rejectWithValue }) => {
  dispatch(setAppStatusAC({ status: 'loading' }))
  try {
    const state = getState();
    const task = state.tasks[arg.idTodo].find(t => t.id === arg.idTask)
    if (!task) {
      console.warn('task not found in state')
      return rejectWithValue(null)
    }
    const model: UpdateTaskModelType = { ...task, title: arg.title }
    const res = await TodolistsAPI.updateTitleTask(arg.idTodo, arg.idTask, model)
    if (res.data.resultCode === 0) {
      dispatch(setAppStatusAC({ status: 'succeeded' }))
      return { idTodo: arg.idTodo, idTask: arg.idTask, title: arg.title };
    } else {
      handleServerAppError(res.data, dispatch)
      return rejectWithValue(null)
    }
  } catch (e: any) {
    handleServerNetworkError(e.message, dispatch)
    return rejectWithValue(null)
  }
});
export const changeTaskStatus = createAsyncThunk<{ idTodo: string, idTask: string, status: TaskStatus }, { todoId: string, taskId: string, status: TaskStatus }, ThunkApiType>('tasks/changeStatus', async (arg, { dispatch, getState, rejectWithValue }) => {
  dispatch(setAppStatusAC({ status: 'loading' }))

  try {
    const state = getState();
    const task = state.tasks[arg.todoId].find(t => t.id === arg.taskId)
    if (!task) {
      console.warn('task not found in state')
      return rejectWithValue(null)
    }
    const model: UpdateTaskModelType = { ...task, status: arg.status }
    const res = await TodolistsAPI.updateStatus(arg.todoId, arg.taskId, model)
    if (res.data.resultCode === 0) {
      dispatch(setAppStatusAC({ status: 'succeeded' }))
      return { idTodo: arg.todoId, idTask: arg.taskId, status: arg.status };
    } else {
      handleServerAppError(res.data, dispatch)
      return rejectWithValue(null)
    }
  } catch (e: any) {
    handleServerNetworkError(e.message, dispatch)
    return rejectWithValue(null)
  }
});
//reducer
const slice = createSlice({
  name: 'tasks',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createTodolists.fulfilled, (state, action) => {
      state[action.payload.id] = []
    });
    builder.addCase(deleteTodolists.fulfilled, (state, action) => {
      delete state[action.payload]
    });
    builder.addCase(getTodolists.fulfilled, (state, action) => {
      action.payload.todolists.forEach((tl: any) => {
        state[tl.id] = []
      });
    });
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state[action.payload.todolistId] = action.payload.tasks
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      const tasks = state[action.payload.idTodo];
      const index = tasks.findIndex(t => t.id === action.payload.idTask)
      if (index > -1) {
        tasks.splice(index, 1)
      }
    });
    builder.addCase(createTask.fulfilled, (state, action) => {
      state[action.payload.task.todoListId].unshift(action.payload.task)
    });
    builder.addCase(updateTaskTitle.fulfilled, (state, action) => {
      const tasks = state[action.payload.idTodo];
      const index = tasks.findIndex(t => t.id === action.payload.idTask)
      if (index > -1) {
        tasks[index].title = action.payload.title
      }
    });
    builder.addCase(changeTaskStatus.fulfilled, (state, action) => {
      const tasks = state[action.payload.idTodo];
      const index = tasks.findIndex(t => t.id === action.payload.idTask)
      if (index > -1) {
        tasks[index].status = action.payload.status
      }
    });
  }
})
export const taskReducer = slice.reducer
//types
export type MainTasksType = {
  [key: string]: TaskType[];
};