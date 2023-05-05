import { ActionType } from "./store"

const InitialState: InitialStateType = {
  status: 'idle',
  error: null
}

export const appReducer = (state: InitialStateType = InitialState, action: ActionType): InitialStateType => {
  switch(action.type) {
    case 'APP/SET-STATUS' :
      return {...state, status: action.status}
    case 'APP/SET-ERROR':
      return {...state, error: action.error}
    default:
      return {...state}
  }
}
//AC
export const setErrorAC = (error: string | null) =>({type: 'APP/SET-ERROR', error} as const)
export const setStatusAC = (status: StatusType) =>({type: 'APP/SET-STATUS', status} as const)
//types
export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
  status: StatusType
  error: string | null
}