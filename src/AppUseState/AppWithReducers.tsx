export {}
// import {
//   AppBar,
//   Button,
//   Container,
//   Grid,
//   IconButton,
//   Paper,
//   Toolbar,
//   Typography,
// } from "@mui/material";
// import React, { useReducer} from "react";
// import { v1 } from "uuid";
// import "./App.css";
// import { SuperInput } from "./SuperInput";
// import { TodoList } from "./TodoList";
// import MenuIcon from "@mui/icons-material/Menu";
// import { addTodoAC, changeFilterTodoAC, changeTitleTodoAC, removeTodoAC, todolistReducer } from "./state/todolists-reducer";
// import { addTaskAC, changeTasksStatusAC, changeTasksTitleAC, removeTasksAC, taskReducer } from "./state/task-reducer";

// export type FilterValuesType = "All" | "Done" | "Active";

// export type TodolistType = {
//   id: string;
//   title: string;
//   filter: FilterValuesType;
// };
// type TaskType = {
//   id: string;
//   title: string;
//   isDone: boolean;
// };
// export type MainTasksType = {
//   [key: string]: TaskType[];
// };

// function AppWithReducers() {
//   let todolist1 = v1();
//   let todolist2 = v1();

//   let [todolist, dispatchTodolistsReducer] = useReducer(todolistReducer, [
//     { id: todolist1, title: "What to learn", filter: "All" },
//     { id: todolist2, title: "What to buy", filter: "All" },
//   ]);
//   let [tasks, dispatchTaskReducer] = useReducer(taskReducer, {
//     [todolist1]: [
//       { id: v1(), title: "HTML&CSS", isDone: true },
//       { id: v1(), title: "JS", isDone: true },
//       { id: v1(), title: "ReactJS", isDone: false },
//     ],
//     [todolist2]: [
//       { id: v1(), title: "Book", isDone: false },
//       { id: v1(), title: "Milk", isDone: true },
//     ],
//   });

//   const addTasks = (title: string, todolistId: string) => {
//     const action = addTaskAC(title, todolistId);
//     dispatchTaskReducer(action);
//   };
//   const removeTask = (todolistId: string, id: string ) => {
//    const action = removeTasksAC(todolistId, id);
//    dispatchTaskReducer(action);
//   };
//   const changeStatus = (todolistId: string, taskId: string, isDone: boolean) => {
//     const action = changeTasksStatusAC(todolistId, taskId, isDone);
//     dispatchTaskReducer(action);
//   };
//   const changeTitleValue = (todolistId: string, taskId: string, title: string) => {
//     const action = changeTasksTitleAC(todolistId, taskId, title);
//     dispatchTaskReducer(action);
//   };

//   const changeFilter = (value: FilterValuesType, tId: string) => {
//     const action = changeFilterTodoAC(value, tId);
//     dispatchTodolistsReducer(action)
//   };
//   const removeTodolist = (todolistId: string) => {
//     const action = removeTodoAC(todolistId);
//     dispatchTodolistsReducer(action);
//     dispatchTaskReducer(action)
//   };
//   const addTodolist = (title: string) => {
//     const action = addTodoAC(title);
//     dispatchTodolistsReducer(action);
//     dispatchTaskReducer(action);
//   };
//   const changeTodolistTitle = (title: string, todolistId: string) => {
//     const action = changeTitleTodoAC(title, todolistId)
//   };

//   return (
//     <div className="App">
//       <AppBar position="static" color="secondary">
//         <Toolbar>
//           <IconButton
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             sx={{ mr: 2 }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             News
//           </Typography>
//           <Button color="inherit">Login</Button>
//         </Toolbar>
//       </AppBar>
//       <Container fixed>
//         <Grid container>
//           <SuperInput addItem={addTodolist} />
//         </Grid>
//         <Grid container spacing={5}>
//           {todolist.map((tl) => {
//             let taskForTodoList = tasks[tl.id];
//             if (tl.filter === "Done") {
//               taskForTodoList = taskForTodoList.filter(
//                 (t) => t.isDone === true
//               );
//             }
//             if (tl.filter === "Active") {
//               taskForTodoList = taskForTodoList.filter(
//                 (t) => t.isDone === false
//               );
//             }

//             return (
//               <Grid item key={tl.id}>
//                 <Paper elevation={3} className='paper'>
//                   <TodoList
//                   title={tl.title}
//                   tasks={taskForTodoList}
//                   removeTask={removeTask}
//                   changeFilter={changeFilter}
//                   addTasks={addTasks}
//                   changeStatus={changeStatus}
//                   filter={tl.filter}
//                   tId={tl.id}
//                   key={tl.id}
//                   removeTodolist={removeTodolist}
//                   changeTitleValue={changeTitleValue}
//                   changeTodolistTitle={changeTodolistTitle}
//                 />{" "}
//                 </Paper>
//               </Grid>
//             );
//           })}
//         </Grid>
//       </Container>
//     </div>
//   );
// }
// export default AppWithReducers;
