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
import React, { useState } from "react";
import { v1 } from "uuid";
import "./App.css";
import { SuperInput } from "./SuperInput";
import { TodoList } from "./TodoList";
import MenuIcon from "@mui/icons-material/Menu";

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

function App() {
  const addTasks = (title: string, todolistId: string) => {
    let newTask = {
      id: v1(),
      title: title,
      isDone: false,
    };
    let task = tasks[todolistId];
    let newTasks = [newTask, ...task];
    tasks[todolistId] = newTasks;
    setTasks({ ...tasks });
  };
  const removeTask = (id: string, todolistId: string) => {
    let task = tasks[todolistId];
    let filteredTasks = task.filter((t) => t.id !== id);
    tasks[todolistId] = filteredTasks;
    setTasks({ ...tasks });
  };

  const changeStatus = (
    taskId: string,
    isDone: boolean,
    todolistId: string
  ) => {
    let task = tasks[todolistId];
    let task2 = task.find((t) => t.id === taskId);
    if (task2) {
      task2.isDone = isDone;
    }
    setTasks({ ...tasks });
  };
  const changeTitleValue = (
    taskId: string,
    title: string,
    todolistId: string
  ) => {
    let task = tasks[todolistId];
    let task2 = task.find((t) => t.id === taskId);
    if (task2) {
      task2.title = title;
    }
    setTasks({ ...tasks });
  };

  const changeFilter = (value: FilterValuesType, tId: string) => {
    let todolists = todolist.find((tl) => tl.id === tId);
    if (todolists) {
      todolists.filter = value;
      setTodolist([...todolist]);
    }
  };

  let todolist1 = v1();
  let todolist2 = v1();

  let [todolist, setTodolist] = useState<Array<TodolistType>>([
    { id: todolist1, title: "What to learn", filter: "All" },
    { id: todolist2, title: "What to buy", filter: "All" },
  ]);
  let [tasks, setTasks] = useState<MainTasksType>({
    [todolist1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
    ],
    [todolist2]: [
      { id: v1(), title: "Book", isDone: false },
      { id: v1(), title: "Milk", isDone: true },
    ],
  });
  const removeTodolist = (todolistId: string) => {
    let todo = todolist.filter((tl) => tl.id !== todolistId);
    setTodolist(todo);

    delete tasks[todolistId];
    setTasks({ ...tasks });
  };
  const addTodolist = (title: string) => {
    let newTodolist: TodolistType = {
      id: v1(),
      filter: "All",
      title: title,
    };
    setTodolist([newTodolist, ...todolist]);
    setTasks({ ...tasks, [newTodolist.id]: [] });
  };
  const changeTodolistTitle = (title: string, todolistId: string) => {
    let todo = todolist.find((t) => t.id === todolistId);
    if (todo) {
      todo.title = title;
    }
    setTodolist([...todolist]);
  };

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
            let taskForTodoList = tasks[tl.id];
            if (tl.filter === "Done") {
              taskForTodoList = taskForTodoList.filter(
                (t) => t.isDone === true
              );
            }
            if (tl.filter === "Active") {
              taskForTodoList = taskForTodoList.filter(
                (t) => t.isDone === false
              );
            }

            return (
              <Grid item key={tl.id}>
                <Paper elevation={3} className='paper'>
                  <TodoList
                  title={tl.title}
                  tasks={taskForTodoList}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTasks={addTasks}
                  changeStatus={changeStatus}
                  filter={tl.filter}
                  tId={tl.id}
                  key={tl.id}
                  removeTodolist={removeTodolist}
                  changeTitleValue={changeTitleValue}
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
export default App;
