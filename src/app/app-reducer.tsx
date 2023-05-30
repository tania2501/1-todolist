import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { authAPI } from "../api/todolists-api"
import { setAuthAC } from "../pages/Login/login-reducer"
import { ThunkType } from "../pages/TodolistsLists/Todolist/todolists-reducer"

const InitialState: InitialStateType = {
  status: 'idle',
  error: null,
  initialized: false,
  name: ''
}

const slice =  createSlice({
  name: 'app',
  initialState: InitialState,
  reducers: {
    setAppErrorAC(state, action: PayloadAction<{error: string | null}>) {
      state.error = action.payload.error
    },
    setAppStatusAC(state, action: PayloadAction<{status: StatusType}>) {
      state.status = action.payload.status
    },
    setInitializedAC(state, action: PayloadAction<{initialized: boolean, name: string}>) {
      state.initialized = action.payload.initialized;
      state.name = action.payload.name
    },
  }
})
export const appReducer = slice.reducer; 
//AC
export const {setAppErrorAC, setAppStatusAC, setInitializedAC} = slice.actions;
///thunks
export const authUser = (): ThunkType => async (dispatch) => {
  return authAPI.auth().then(res=> {
    if (res.resultCode === 0) {
      dispatch(setInitializedAC({initialized: true, name: res.data.login}));
      dispatch(setAuthAC({isAuth: true}))
    }
    dispatch(setInitializedAC({initialized: true, name: res.data.login}));
  })
};
//types
export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
  status: StatusType
  error: string | null
  initialized: boolean
  name: string
}