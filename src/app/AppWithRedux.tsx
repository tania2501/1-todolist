import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography,
} from "@mui/material";
import "./App.css";
import MenuIcon from "@mui/icons-material/Menu";
import { TodolistsList } from "../pages/TodolistsLists/TodolistsList";
import { ErrorBar } from "../components/ErrorBar/ErrorBar";
import { useAppDispatch, useAppSelector } from "./app/hooks/appHooks";
import { BrowserRouter, Routes, Route, NavLink, Navigate } from "react-router-dom";
import { Login } from "../pages/Login/Login";
import logout from './../assets/logout-32.png'
import { useEffect } from "react";
import { authUser } from "./app-reducer";
import { logOutUser } from "../pages/Login/login-reducer";

type PropsType = {
  demo?: boolean;
};

function AppWithRedux({ demo = false }: PropsType) {
  const status = useAppSelector(state => state.app.status);
  const auth = useAppSelector(state => state.login.isAuth);
  const initialized = useAppSelector(state => state.app.initialized)
  const name = useAppSelector(state => state.app.name)
  const dispatch = useAppDispatch()
  useEffect(()=> {
    if (!demo) {
      dispatch(authUser())
    }
    // eslint-disable-next-line
  }, [dispatch])
  
  if (!initialized) {
    return <div className="loader">
      <CircularProgress color="secondary" />
    </div>
  }
  
  return (
    <BrowserRouter>
    {auth ? <Navigate to='/'/> : <Navigate to='/login'/>}
      <div className="App">
        <AppBar component={'nav'} position="static" color="secondary">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Todo List
            </Typography>
            <Button color="inherit">{auth ? <div className='login'><span>{name}</span><img src={logout} alt="#" onClick={()=>dispatch(logOutUser())}/></div> : <NavLink to="/login">Login</NavLink>}</Button>
          </Toolbar>
        </AppBar>
        {status === "loading" && <LinearProgress color="secondary" />}
        <Container fixed>
          <Routes>
            <Route path="/" element={<TodolistsList demo={demo} />} />
            <Route path="/login" element={<Login auth={auth}/>} />
          </Routes>
        </Container>
        <ErrorBar />
      </div>
    </BrowserRouter>
  );
}
export default AppWithRedux;
