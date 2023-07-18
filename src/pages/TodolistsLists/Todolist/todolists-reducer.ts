import { Action, PayloadAction, ThunkAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TodolistsType, TodolistsAPI } from "../../../api/todolists-api";
import { AppRootState } from "../../../app/store";
import { StatusType, setAppStatusAC } from "../../../app/app-reducer";
import { handleServerAppError, handleServerNetworkError } from "../../../utils/error-utils";
import { ThunkApiType } from "../../Login/login-reducer";

//reducer
const slice = createSlice({
  name: 'todolists',
  initialState: [] as InitialStateTodoListType[],
  reducers: {
    changeFilterTodoAC(state, action: PayloadAction<{ filter: FilterValuesType, tId: string }>) {
      const index = state.findIndex(tl => tl.id === action.payload.tId)
      state[index].filter = action.payload.filter
    },
    changeEntitiStatusTodoAC(state, action: PayloadAction<{ status: StatusType, tId: string }>) {
      const index = state.findIndex(tl => tl.id === action.payload.tId)
      state[index].entitiStatus = action.payload.status
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTodolists.fulfilled, (state, action) => {
      return action.payload.todolists.map(tl => ({ ...tl, filter: 'All', entitiStatus: 'idle' }))
    });
    builder.addCase(deleteTodolists.fulfilled, (state, action) => {
      const index = state.findIndex(tl => tl.id === action.payload)
      if (index > -1) {
        state.splice(index, 1)
      }
    });
    builder.addCase(createTodolists.fulfilled, (state, action) => {
      state.unshift({ ...action.payload, filter: 'All', entitiStatus: 'idle' })
    });
    builder.addCase(updateTodolistTitle.fulfilled, (state, action) => {
      const index = state.findIndex(tl => tl.id === action.payload.tId)
      state[index].title = action.payload.title
    });
  },
})
export const todolistReducer = slice.reducer;

///actions
export const { changeFilterTodoAC, changeEntitiStatusTodoAC } = slice.actions;

//thunks
export const getTodolists = createAsyncThunk<{ todolists: TodolistsType[] }, void, ThunkApiType>('todo/getTodo', async (arg, { dispatch, rejectWithValue }) => {
  dispatch(setAppStatusAC({ status: 'loading' }))
  try {
    const res = await TodolistsAPI.getTodolists()
    dispatch(setAppStatusAC({ status: 'succeeded' }))
    return { todolists: res.data }
  } catch (e: any) {
    handleServerNetworkError(e.message, dispatch)
    return rejectWithValue(null)
  }

})
export const deleteTodolists = createAsyncThunk<string, string, ThunkApiType>('todo/delete', async (id, { dispatch, rejectWithValue }) => {
  dispatch(setAppStatusAC({ status: 'loading' }))
  dispatch(changeEntitiStatusTodoAC({ status: 'loading', tId: id }))
  try {
    const res = await TodolistsAPI.deleteTodolist(id);
    if (res.data.resultCode === 0) {
      dispatch(setAppStatusAC({ status: 'succeeded' }))
      return id
    } else {
      handleServerAppError(res.data, dispatch)
      return rejectWithValue(null)
    }
  } catch (e: any) {
    handleServerNetworkError(e.message, dispatch)
    return rejectWithValue(null)
  }
})

export const createTodolists = createAsyncThunk<TodolistsType, string, ThunkApiType>('todo/create', async (title, { dispatch, rejectWithValue }) => {
  dispatch(setAppStatusAC({ status: 'loading' }))
  try {
    const res = await TodolistsAPI.createTodolist(title);
    if (res.data.resultCode === 0) {
      dispatch(setAppStatusAC({ status: 'succeeded' }))
      return res.data.data.item
    } else {
      handleServerAppError(res.data, dispatch)
      return rejectWithValue(null)
    }
  } catch (e: any) {
    handleServerNetworkError(e.message, dispatch)
    return rejectWithValue(null)
  }
})
export const updateTodolistTitle = createAsyncThunk<{ title: string, tId: string }, { title: string, id: string }, ThunkApiType>('todo/changeTitle', async (arg, { dispatch, rejectWithValue }) => {
  dispatch(setAppStatusAC({ status: 'loading' }))
  try {
    const res = await TodolistsAPI.updateTitle(arg.title, arg.id)
    if (res.data.resultCode === 0) {
      dispatch(setAppStatusAC({ status: 'succeeded' }))
      return { title: arg.title, tId: arg.id };
    } else {
      handleServerAppError(res.data, dispatch)
      return rejectWithValue(null)
    }
  } catch (e: any) {
    handleServerNetworkError(e.message, dispatch)
    return rejectWithValue(null)
  }
})
//types
export type ThunkType = ThunkAction<Promise<void>, AppRootState, unknown, Action>
export type FilterValuesType = "All" | "Done" | "Active";
export type InitialStateTodoListType = TodolistsType & {
  filter: FilterValuesType
  entitiStatus: StatusType
}