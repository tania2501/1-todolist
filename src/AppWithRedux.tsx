import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import "./App.css";
import { SuperInput } from "./SuperInput";
import { TodoList } from "./TodoList";
import MenuIcon from "@mui/icons-material/Menu";
import {
  addTodoAC,
  changeFilterTodoAC,
  changeTitleTodoAC,
  removeTodoAC,
} from "./state/todolists-reducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppRootState } from "./state/store";
import { useCallback } from "react";

export type FilterValuesType = "All" | "Done" | "Active";

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};
type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
export type MainTasksType = {
  [key: string]: TaskType[];
};

function AppWithRedux() {
  const dispatch = useDispatch();
  const todolist = useSelector<AppRootState, TodolistType[]>(
    (state) => state.todolists
  );

  const changeFilter = useCallback((value: FilterValuesType, tId: string) => {
    const action = changeFilterTodoAC(value, tId);
    dispatch(action);
  }, [dispatch]);
  const removeTodolist = useCallback((todolistId: string) => {
    const action = removeTodoAC(todolistId);
    dispatch(action);
  }, [dispatch]);
  const addTodolist = useCallback((title: string) => {
    const action = addTodoAC(title);
    dispatch(action);
  }, [dispatch]);
  const changeTodolistTitle = useCallback((title: string, todolistId: string) => {
    const action = changeTitleTodoAC(title, todolistId);
    dispatch(action);
  }, [dispatch]);

  return (
    <div className="App">
      <AppBar position="static" color="secondary">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
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
      </Container>
    </div>
  );
}
export default AppWithRedux;
