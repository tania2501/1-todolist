import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { authAPI } from "../api/todolists-api"
import { setAuthAC } from "../pages/Login/login-reducer"

const InitialState: InitialStateType = {
  status: 'idle',
  error: null,
  initialized: false,
  name: ''
}

const slice = createSlice({
  name: 'app',
  initialState: InitialState,
  reducers: {
    setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error
    },
    setAppStatusAC(state, action: PayloadAction<{ status: StatusType }>) {
      state.status = action.payload.status
    }
  },
  extraReducers: (builder) => {
    builder.addCase(authUser.fulfilled, (state, action) => {
      state.initialized = action.payload.initialized;
      state.name = action.payload.name
    })
  },
})
export const appReducer = slice.reducer;
//AC
export const { setAppErrorAC, setAppStatusAC } = slice.actions;
///thunks
export const authUser = createAsyncThunk('app/init', async (_, { dispatch, rejectWithValue }) => {
  try {
    const res = await authAPI.auth()
    dispatch(setAuthAC( res.resultCode === 1 ? { isAuth: false } : { isAuth: true } ))
    return { initialized: true, name: res.data.login }
  } catch (e: any) {
    return rejectWithValue(e.message)
  }
})

//types
export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
  status: StatusType
  error: string | null
  initialized: boolean
  name: string
}