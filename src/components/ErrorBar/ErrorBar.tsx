import { Snackbar, Alert } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/app/hooks/appHooks";
import { setAppErrorAC } from "../../app/app-reducer";
import s from './ErrorBar.module.css'

export const ErrorBar = () => {
  const error = useAppSelector(state => state.app.error)
  const dispatch = useAppDispatch();

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    dispatch(setAppErrorAC({error: null}))
  };
  return (
    <div className={s.errorMessage}>
      <Snackbar open={error !== null} autoHideDuration={3000} onClose={handleClose} anchorOrigin={ {vertical: 'bottom', horizontal: 'center'} }>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};
