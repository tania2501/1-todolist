import {
  AppBar,
  Button,
  Container,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography,
} from "@mui/material";
import "./App.css";
import MenuIcon from "@mui/icons-material/Menu";
import { TodolistsList } from "../pages/TodolistsList";
import { ErrorBar } from "../components/ErrorBar/ErrorBar";
import { useAppSelector } from "./app/hooks/appHooks";

type PropsType = {
  demo?: boolean
}

function AppWithRedux({demo = false}: PropsType) {
  const status = useAppSelector(state => state.app.status)
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
      {status === 'loading' && <LinearProgress color="secondary" />}
      <Container fixed>
        <TodolistsList demo={demo}/>
      </Container>
      <ErrorBar/>
    </div>
  );
}
export default AppWithRedux;
