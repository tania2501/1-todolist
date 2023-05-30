import { Action, PayloadAction, ThunkAction, createSlice } from "@reduxjs/toolkit";
import { TodolistsType, TodolistsAPI } from "../../../api/todolists-api";
import { AppRootState } from "../../../app/store";
import { StatusType, setAppStatusAC } from "../../../app/app-reducer";
import { handleServerAppError, handleServerNetworkError } from "../../../utils/error-utils";

const initialState: InitialStateTodoListType[] = [];
//reducer
const slice = createSlice({
  name: 'todolists',
  initialState: initialState,
  reducers: {
    removeTodoAC(state, action: PayloadAction<{tId: string}>) {
      const index = state.findIndex(tl => tl.id === action.payload.tId)
      if(index > -1) {
        state.splice(index, 1)
      }
    },
    addTodoAC(state, action: PayloadAction<{todolist: TodolistsType}>) {
      state.unshift({...action.payload.todolist, filter: 'All', entitiStatus: 'idle'})
    },
    changeTitleTodoAC(state, action: PayloadAction<{title: string, tId: string}>) {
      const index = state.findIndex(tl => tl.id === action.payload.tId)
      state[index].title = action.payload.title
    },
    changeFilterTodoAC(state, action: PayloadAction<{filter: FilterValuesType, tId: string}>) {
      const index = state.findIndex(tl => tl.id === action.payload.tId)
      state[index].filter = action.payload.filter
    },
    changeEntitiStatusTodoAC(state, action: PayloadAction<{status: StatusType, tId: string}>) {
      const index = state.findIndex(tl => tl.id === action.payload.tId)
      state[index].entitiStatus = action.payload.status
    },
    setTodoAC(state, action: PayloadAction<{todolists: TodolistsType[]}>) {
      return action.payload.todolists.map(tl=> ({...tl, filter: 'All', entitiStatus: 'idle'}))
    }
  }
})
export const todolistReducer = slice.reducer;
export const  {removeTodoAC, addTodoAC, changeTitleTodoAC, changeFilterTodoAC, changeEntitiStatusTodoAC, setTodoAC} = slice.actions;


//thunks
export const getTodolists = (): ThunkType => async dispatch => {
  dispatch(setAppStatusAC({status: 'loading'}))
  TodolistsAPI.getTodolists().then(res=>{
    dispatch(setTodoAC({todolists: res.data}));
    dispatch(setAppStatusAC({status: 'succeeded'}))
  }).catch(e=>{
    handleServerNetworkError(e.message, dispatch)
  })
}
export const deleteTodolists = (id: string): ThunkType => async dispatch => {
  dispatch(setAppStatusAC({status: 'loading'}))
  dispatch(changeEntitiStatusTodoAC({status: 'loading', tId: id}))
  TodolistsAPI.deleteTodolist(id).then(res=>{
    if(res.data.resultCode === 0) {
      dispatch(removeTodoAC({tId: id}));
      dispatch(setAppStatusAC({status: 'succeeded'}))
    } else {
      handleServerAppError(res.data, dispatch)
    }
  }).catch(e=>{
    handleServerNetworkError(e.message, dispatch)
  })
  
}
export const createTodolists = (title: string): ThunkType => async dispatch => {
  dispatch(setAppStatusAC({status: 'loading'}))
  TodolistsAPI.createTodolist(title).then(res=>{
    if(res.data.resultCode === 0) {
      dispatch(addTodoAC({todolist: res.data.data.item}));
      dispatch(setAppStatusAC({status: 'succeeded'}))
    } else {
      handleServerAppError(res.data, dispatch)
    }
  }).catch(e=>{
    handleServerNetworkError(e.message, dispatch)
  })
  
}
export const updateTodolistTitle = (title: string, id: string): ThunkType => async dispatch => {
  dispatch(setAppStatusAC({status: 'loading'}))
  TodolistsAPI.updateTitle(title, id).then(res => {
    if(res.data.resultCode === 0) {
      dispatch(changeTitleTodoAC({title, tId: id}));
      dispatch(setAppStatusAC({status: 'succeeded'}))
    } else {
      handleServerAppError(res.data, dispatch)
    }
  }).catch(e=>{
    handleServerNetworkError(e.message, dispatch)
  })
  
}
//types
export type ThunkType = ThunkAction<Promise<void>, AppRootState, unknown, Action>
export type FilterValuesType = "All" | "Done" | "Active";
export type InitialStateTodoListType = TodolistsType & {
  filter: FilterValuesType
  entitiStatus: StatusType
}