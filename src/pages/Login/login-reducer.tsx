import { LoginFormType, authAPI } from "../../api/todolists-api"
import { authUser, setAppStatusAC } from "../../app/app-reducer"
import { ActionType } from "../../app/store"
import { handleServerAppError, handleServerNetworkError } from "../../utils/error-utils"
import { ThunkType } from "../TodolistsLists/Todolist/todolists-reducer"


const InitialState: InitialStateType = {
  isAuth: false
}
export const loginReducer = (state: InitialStateType = InitialState, action: ActionType): InitialStateType => {
  switch(action.type) {
    case 'LOGIN': 
      return {...state, isAuth: action.isAuth}
    default:
      return {...state}
  }
}
//AC
export const setAuthAC = (isAuth: boolean) =>({type: 'LOGIN', isAuth} as const)
///thunks 
export const loginTC = (data: LoginFormType): ThunkType => async dispatch => {
  dispatch(setAppStatusAC('loading'))
  authAPI.login(data).then(res => {
    if(res.data.resultCode === 0) {
      dispatch(setAuthAC(true))
      dispatch(authUser())
      dispatch(setAppStatusAC('succeeded'))
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
    dispatch(setAuthAC(false));
  }
};
//types
export type InitialStateType = {
  isAuth: boolean
}