import { Grid, Paper } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { TodoList } from './Todolist/TodoList';
import { getTodolists, FilterValuesType, changeFilterTodoAC, deleteTodolists, createTodolists, updateTodolistTitle, InitialStateTodoListType } from './Todolist/todolists-reducer';
import { useAppSelector, useAppDispatch } from '../../app/app/hooks/appHooks';
import { SuperInput } from '../../components/SuperInput/SuperInput';
import { Navigate } from 'react-router';

type PropsType = {
  demo?: boolean
}
export const TodolistsList: React.FC<PropsType> = ({demo = false}) => {
  const todolist = useAppSelector(state => state.todolists);
  const auth = useAppSelector(state => state.login.isAuth)
  const dispatch = useAppDispatch();
  useEffect(() => {
    if(demo || !auth) {
      return;
    }
    dispatch(getTodolists());
  }, [dispatch, demo, auth]);
  const changeFilter = useCallback(
    (value: FilterValuesType, tId: string) => {
      const action = changeFilterTodoAC({filter: value,  tId});
      dispatch(action);
    }, [dispatch]);
  const removeTodolist = useCallback(
    (todolistId: string) => {
      dispatch(deleteTodolists(todolistId));
    }, [dispatch]);
  const addTodolist = useCallback(
    (title: string) => {
      dispatch(createTodolists(title));
    }, [dispatch]);
  const changeTodolistTitle = useCallback(
    (title: string, todolistId: string) => {
      dispatch(updateTodolistTitle({id: todolistId, title}));
    }, [dispatch]);
  if(!auth) {
    return <Navigate to='/login'/>
  }
  return (
    <>
    <Grid container>
        <SuperInput addItem={addTodolist} />
        </Grid>
        <Grid container spacing={5}>
          {todolist.map((tl: InitialStateTodoListType) => {
            return (
              <Grid item key={tl.id}>
                <Paper elevation={3} className="paper">
                  <TodoList
                    todolist={tl}
                    changeFilter={changeFilter}
                    key={tl.id}
                    removeTodolist={removeTodolist}
                    changeTodolistTitle={changeTodolistTitle}
                    demo={demo}
                  />{" "}
                </Paper>
              </Grid>
            );
          })}
        </Grid>
    </>
  )
}