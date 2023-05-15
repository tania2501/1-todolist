import { authAPI } from "../api/todolists-api"
import { setAuthAC } from "../pages/Login/login-reducer"
import { ThunkType } from "../pages/TodolistsLists/Todolist/todolists-reducer"
import { ActionType } from "./store"

const InitialState: InitialStateType = {
  status: 'idle',
  error: null,
  initialized: false,
  name: ''
}

export const appReducer = (state: InitialStateType = InitialState, action: ActionType): InitialStateType => {
  switch(action.type) {
    case 'APP/SET-STATUS' :
      return {...state, status: action.status}
    case 'APP/SET-ERROR':
      return {...state, error: action.error}
    case 'APP/SET-INITIALIZED':
      return {...state, initialized: action.initialized, name: action.name}
    default:
      return {...state}
  }
}
//AC
export const setAppErrorAC = (error: string | null) =>({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: StatusType) =>({type: 'APP/SET-STATUS', status} as const)
export const setInitializedAC = (initialized: boolean, name: string) =>({type: 'APP/SET-INITIALIZED', initialized, name} as const)
///thunks
export const authUser = (): ThunkType => async (dispatch) => {
  return authAPI.auth().then(res=> {
    if (res.resultCode === 0) {
      dispatch(setInitializedAC(true, res.data.login));
      dispatch(setAuthAC(true))
    }
    dispatch(setInitializedAC(true, res.data.login));
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