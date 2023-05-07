import { Button } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  changeTaskStatus,
  createTask,
  deleteTask,
  getTasks,
  updateTaskTitle,
} from "../Task/task-reducer";
import { Task } from "../Task/Task";
import { TaskStatus } from "../../../api/todolists-api";
import { useAppDispatch, useAppSelector } from "../../../app/app/hooks/appHooks";
import { EditableSpan } from "../../../components/EditableSpan/EditableSpan";
import { SuperButton } from "../../../components/SuperButton/SuperButton";
import { SuperInput } from "../../../components/SuperInput/SuperInput";
import { FilterValuesType, InitialStateTodoListType } from "./todolists-reducer";

type TodoPropsType = {
  todolist: InitialStateTodoListType;
  changeFilter: (value: FilterValuesType, tId: string) => void;
  removeTodolist: (todolistId: string) => void;
  changeTodolistTitle: (title: string, todolistId: string) => void;
  demo?: boolean
};

export const TodoList = React.memo(({demo = false, ...props}: TodoPropsType) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if(demo) {
      return
    }
    dispatch(getTasks(props.todolist.id));
  }, [dispatch, props.todolist.id, demo]);
  const tasks = useAppSelector(state => state.tasks[props.todolist.id])

  const onAllClick = useCallback(() => {
    props.changeFilter("All", props.todolist.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.changeFilter, props.todolist.id]);
  const onCompletedClick = useCallback(() => {
    props.changeFilter("Done", props.todolist.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.changeFilter, props.todolist.id]);
  const onActiveClick = useCallback(() => {
    props.changeFilter("Active", props.todolist.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.changeFilter, props.todolist.id]);
  const removeTodolist = useCallback(() => {
    props.removeTodolist(props.todolist.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.removeTodolist, props.todolist.id]);
  const removeTasks = (todolistId: string, id: string) => {
    dispatch(deleteTask(todolistId, id));
  };
  const changeStatus = (todolistId: string, taskId: string, status: TaskStatus) => {
    dispatch(changeTaskStatus(todolistId, taskId, status));
  };
  const changeTitleValue = (todolistId: string, taskId: string, title: string) => {
    dispatch(updateTaskTitle(todolistId, taskId, title));
  };
  const changeTodolistTitleHandler = useCallback((title: string) => {
    props.changeTodolistTitle(title, props.todolist.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.changeTodolistTitle, props.todolist.id]);
  let taskForTodoList = tasks;
  if (props.todolist.filter === "Done") {
    taskForTodoList = taskForTodoList.filter((t) => t.status === TaskStatus.Completed);
  }
  if (props.todolist.filter === "Active") {
    taskForTodoList = taskForTodoList.filter((t) => t.status === TaskStatus.New);
  }
  return (
    <div>
      <div>
        <h3>
          <EditableSpan
            title={props.todolist.title}
            changeTitleValue={changeTodolistTitleHandler}
          />
          <Button onClick={removeTodolist} color="secondary" disabled={props.todolist.entitiStatus === 'loading'}>
            <DeleteIcon />
          </Button>
        </h3>
        <SuperInput
          addItem={useCallback(
            (title) => {
              dispatch(createTask(title, props.todolist.id));
            },
            [dispatch, props.todolist.id]
          )}
          disable={props.todolist.entitiStatus === 'loading'}
        />
        <ul>
          {taskForTodoList.map((t) => (
            <Task task={t} tId={props.todolist.id} key={t.id} changeStatus={changeStatus} changeTitle={changeTitleValue} removeTask={removeTasks}/>
          ))}
        </ul>
        <div className="filterButton">
          <SuperButton
            title={"All"}
            onclick={onAllClick}
            filterType={props.todolist.filter}
          />
          <SuperButton
            title={"Active"}
            onclick={onActiveClick}
            filterType={props.todolist.filter}
          />
          <SuperButton
            title={"Done"}
            onclick={onCompletedClick}
            filterType={props.todolist.filter}
          />
        </div>
      </div>
    </div>
  );
});
