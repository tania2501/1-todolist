import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { LoginFormType, authAPI } from "../../api/todolists-api"
import { authUser, setAppStatusAC } from "../../app/app-reducer"
import { handleServerAppError, handleServerNetworkError } from "../../utils/error-utils"
import { ThunkType } from "../TodolistsLists/Todolist/todolists-reducer"


const InitialState = {
  isAuth: false
}
const slice = createSlice({
  name: 'auth',
  initialState: InitialState,
  reducers: {
    setAuthAC(state, action: PayloadAction<{isAuth: boolean}>) {
      state.isAuth = action.payload.isAuth
    }
  }
})
export const loginReducer = slice.reducer
//AC
export const {setAuthAC} = slice.actions
///thunks 
export const loginTC = (data: LoginFormType): ThunkType => async dispatch => {
  dispatch(setAppStatusAC({status: 'loading'}))
  authAPI.login(data).then(res => {
    if(res.data.resultCode === 0) {
      dispatch(setAuthAC({isAuth: true}))
      dispatch(authUser())
      dispatch(setAppStatusAC({status: 'succeeded'}))
    } else {
      handleServerAppError(res.data, dispatch)
    }
  }).catch(e=>{
    handleServerNetworkError(e.message, dispatch)
  })
}
export const logOutUser = (): ThunkType => async dispatch => {
  const res = await authAPI.logOut()
  if (res.resultCode === 0) {
    dispatch(setAuthAC({isAuth: false}));
  }
};
