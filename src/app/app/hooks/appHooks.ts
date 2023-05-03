import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux"
import { AppDispatch, AppRootState } from "../../store"

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector