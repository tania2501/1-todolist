import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { LoginFormType, authAPI } from "../../api/todolists-api"
import { setAppStatusAC } from "../../app/app-reducer"
import { handleServerAppError, handleServerNetworkError } from "../../utils/error-utils"
import { AppDispatch, AppRootState } from "../../app/store"


const InitialState = {
  isAuth: false
}
const slice = createSlice({
  name: 'auth',
  initialState: InitialState,
  reducers: {
    setAuthAC(state, action: PayloadAction<{isAuth: boolean}>) {
      state.isAuth = action.payload.isAuth;
    }
  },
  extraReducers: builder => {
    builder.addCase(loginTC.fulfilled , (state) => {
      state.isAuth = true
    })
    builder.addCase(logOutUser.fulfilled , (state) => {
      state.isAuth = false
    })
  }
})
export const loginReducer = slice.reducer
//AC
export const {setAuthAC} = slice.actions
///thunks 
export const loginTC = createAsyncThunk<undefined, LoginFormType, ThunkApiType>('auth/login', async (arg: LoginFormType, {dispatch, rejectWithValue}) => {
  dispatch(setAppStatusAC({status: 'loading'}))
  try {
    const res = await authAPI.login(arg)
    if(res.data.resultCode === 0) {
      dispatch(setAppStatusAC({status: 'succeeded'}))
      return
    } else {
      handleServerAppError(res.data, dispatch)
      return rejectWithValue(res.data.messages)
    }
  }
 catch(error: any) {
    handleServerNetworkError(error.message, dispatch)
    return rejectWithValue(error.message)
  }
})

export const logOutUser = createAsyncThunk<undefined, undefined, ThunkApiType>('auth/logout', async (__, {dispatch, rejectWithValue}) => {
  dispatch(setAppStatusAC({status: 'loading'}))
  try {
    const res = await authAPI.logOut()
    if (res.resultCode === 0) {
      dispatch(setAppStatusAC({status: 'succeeded'}))
      return
    } else {
      handleServerAppError(res.data, dispatch)
      return rejectWithValue(res.data.message)
    }
  } catch (error: any) {
    handleServerNetworkError(error.message, dispatch)
    return rejectWithValue(error.message)
  }
});

export type ThunkApiType = {
  state: AppRootState, 
  dispatch: AppDispatch, 
}