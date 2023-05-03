import { Button } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { EditableSpan } from "../../../EditableSpan/EditableSpan";
import { SuperInput } from "../../../SuperInput/SuperInput";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  changeTaskStatus,
  createTask,
  deleteTask,
  getTasks,
  updateTaskTitle,
} from "../Task/task-reducer";
import { Task } from "../Task/Task";
import { SuperButton } from "../../../SuperButton/SuperButton";
import { FilterValuesType } from "../todolists-reducer";
import { TaskStatus } from "../../../../api/todolists-api";
import { useAppDispatch, useAppSelector } from "../../../../app/app/hooks/appHooks";


type TitleProps = {
  title: string;
  changeFilter: (value: FilterValuesType, tId: string) => void;
  filter: FilterValuesType;
  tId: string;
  removeTodolist: (todolistId: string) => void;
  changeTodolistTitle: (title: string, todolistId: string) => void;
};

export const TodoList = React.memo((props: TitleProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTasks(props.tId));
  }, [dispatch, props.tId]);
  const tasks = useAppSelector(state => state.tasks[props.tId])

  const onAllClick = useCallback(() => {
    props.changeFilter("All", props.tId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.changeFilter, props.tId]);
  const onCompletedClick = useCallback(() => {
    props.changeFilter("Done", props.tId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.changeFilter, props.tId]);
  const onActiveClick = useCallback(() => {
    props.changeFilter("Active", props.tId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.changeFilter, props.tId]);
  const removeTodolist = useCallback(() => {
    props.removeTodolist(props.tId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.removeTodolist, props.tId]);
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
    props.changeTodolistTitle(title, props.tId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.changeTodolistTitle, props.tId]);
  let taskForTodoList = tasks;
  if (props.filter === "Done") {
    taskForTodoList = taskForTodoList.filter((t) => t.status === TaskStatus.Completed);
  }
  if (props.filter === "Active") {
    taskForTodoList = taskForTodoList.filter((t) => t.status === TaskStatus.New);
  }
  return (
    <div>
      <div>
        <h3>
          <EditableSpan
            title={props.title}
            changeTitleValue={changeTodolistTitleHandler}
          />
          <Button onClick={removeTodolist} color="secondary">
            <DeleteIcon />
          </Button>
        </h3>
        <SuperInput
          addItem={useCallback(
            (title) => {
              dispatch(createTask(title, props.tId));
            },
            [dispatch, props.tId]
          )}
        />
        <ul>
          {taskForTodoList.map((t) => (
            <Task task={t} tId={props.tId} key={t.id} changeStatus={changeStatus} changeTitle={changeTitleValue} removeTask={removeTasks}/>
          ))}
        </ul>
        <div className="filterButton">
          <SuperButton
            title={"All"}
            onclick={onAllClick}
            filterType={props.filter}
          />
          <SuperButton
            title={"Active"}
            onclick={onActiveClick}
            filterType={props.filter}
          />
          <SuperButton
            title={"Done"}
            onclick={onCompletedClick}
            filterType={props.filter}
          />
        </div>
      </div>
    </div>
  );
});
