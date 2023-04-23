import { Button } from "@mui/material";
import React, { useCallback } from "react";
import { FilterValuesType } from "./AppWithRedux";
import { EditableSpan } from "./EditableSpan";
import { SuperInput } from "./SuperInput";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "./state/store";
import {
  addTaskAC,
  changeTasksStatusAC,
  changeTasksTitleAC,
  removeTasksAC,
} from "./state/task-reducer";
import { Task } from "./Task";
import { SuperButton } from "./SuperButton";

export type TasksType = {
  id: string;
  title: string;
  isDone: boolean;
};
type TitleProps = {
  title: string;
  changeFilter: (value: FilterValuesType, tId: string) => void;
  filter: FilterValuesType;
  tId: string;
  removeTodolist: (todolistId: string) => void;
  changeTodolistTitle: (title: string, todolistId: string) => void;
};

export const TodoList = React.memo((props: TitleProps) => {
  const tasks = useSelector<AppRootState, TasksType[]>(
    (state) => state.tasks[props.tId]
  );
  const dispatch = useDispatch();

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
  const removeTask = (todolistId: string, id: string) => {
    const action = removeTasksAC(todolistId, id);
    dispatch(action);
  };
  const changeStatus = (
    todolistId: string,
    taskId: string,
    isDone: boolean
  ) => {
    const action = changeTasksStatusAC(todolistId, taskId, isDone);
    dispatch(action);
  };
  const changeTitleValue = (
    todolistId: string,
    taskId: string,
    title: string
  ) => {
    const action = changeTasksTitleAC(todolistId, taskId, title);
    dispatch(action);
  };
  const changeTodolistTitleHandler = useCallback(
    (title: string) => {
      props.changeTodolistTitle(title, props.tId);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.changeTodolistTitle, props.tId]
  );
  let taskForTodoList = tasks;
  if (props.filter === "Done") {
    taskForTodoList = taskForTodoList.filter((t) => t.isDone === true);
  }
  if (props.filter === "Active") {
    taskForTodoList = taskForTodoList.filter((t) => t.isDone === false);
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
              dispatch(addTaskAC(title, props.tId));
            },
            [dispatch, props.tId]
          )}
        />
        <ul>
          {taskForTodoList.map((t) => (
            <Task task={t} tId={props.tId} key={t.id} changeStatus={changeStatus} changeTitle={changeTitleValue} removeTask={removeTask}/>
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
