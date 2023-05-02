import { Grid, Paper } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppRootState, AppDispatch } from '../../app/store';
import { SuperInput } from '../SuperInput/SuperInput';
import { TodoList } from './TodolistsLists/Todolist/TodoList';
import { InitialStateTodoListType, getTodolists, FilterValuesType, changeFilterTodoAC, deleteTodolists, createTodolists, updateTodolistTitle } from './TodolistsLists/todolists-reducer';


export const TodolistsList = () => {
  const todolist = useSelector<AppRootState, InitialStateTodoListType[]>(
    (state) => state.todolists
  );
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getTodolists());
  }, [dispatch]);
  const changeFilter = useCallback(
    (value: FilterValuesType, tId: string) => {
      const action = changeFilterTodoAC(value, tId);
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
      dispatch(updateTodolistTitle(title, todolistId));
    }, [dispatch]);
  return (
    <>
    <Grid container>
        <SuperInput addItem={addTodolist} />
        </Grid>
        <Grid container spacing={5}>
          {todolist.map((tl) => {
            return (
              <Grid item key={tl.id}>
                <Paper elevation={3} className="paper">
                  <TodoList
                    title={tl.title}
                    changeFilter={changeFilter}
                    filter={tl.filter}
                    tId={tl.id}
                    key={tl.id}
                    removeTodolist={removeTodolist}
                    changeTodolistTitle={changeTodolistTitle}
                  />{" "}
                </Paper>
              </Grid>
            );
          })}
        </Grid>
    </>
  )
}