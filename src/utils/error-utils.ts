import { ThunkDispatch } from "redux-thunk";
import { ResponseType } from "../api/todolists-api";
import { setAppErrorAC, setAppStatusAC } from "../app/app-reducer";
import { ActionType, AppRootState } from "../app/store";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: ThunkDispatch<AppRootState, unknown, ActionType>) => {
    if (data.messages.length) {
      dispatch(setAppErrorAC(data.messages[0]))
    } else {
      dispatch(setAppErrorAC('some error'))
    }
  dispatch(setAppStatusAC('failed'))
}
export const handleServerNetworkError = (message: string, dispatch: ThunkDispatch<AppRootState, unknown, ActionType>) => {
  dispatch(setAppErrorAC(message ? message : 'some error occurred'))
  dispatch(setAppStatusAC('failed'))
}