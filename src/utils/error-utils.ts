import { ThunkDispatch } from "redux-thunk";
import { ResponseType } from "../api/todolists-api";
import { setAppErrorAC, setAppStatusAC } from "../app/app-reducer";
import { AppRootState } from "../app/store";
import { Action } from "@reduxjs/toolkit";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: ThunkDispatch<AppRootState, unknown, Action>) => {
    if (data.messages.length) {
      dispatch(setAppErrorAC({error: data.messages[0]}))
    } else {
      dispatch(setAppErrorAC({error: 'some error'}))
    }
  dispatch(setAppStatusAC({status: 'failed'}))
}
export const handleServerNetworkError = (error: string, dispatch: ThunkDispatch<AppRootState, unknown, Action>) => {
  dispatch(setAppErrorAC(error ? {error: error} : {error: 'some error occurred'}))
  dispatch(setAppStatusAC({status: 'failed'}))
}