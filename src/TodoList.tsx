import { Button, Checkbox } from "@mui/material";
import React, { ChangeEvent } from "react";
import { FilterValuesType } from "./AppWithRedux";
import { EditableSpan } from "./EditableSpan";
import { SuperInput } from "./SuperInput";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { SuperButton } from "./SuperButton";
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "./state/store";
import {
  addTaskAC,
  removeTasksAC,
  changeTasksStatusAC,
  changeTasksTitleAC,
} from "./state/task-reducer";

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

export function TodoList(props: TitleProps) {
  const tasks = useSelector<AppRootState, TasksType[]>(
    (state) => state.tasks[props.tId]
  );
  const dispatch = useDispatch();

  const onAllClick = () => {
    props.changeFilter("All", props.tId);
  };
  const onCompletedClick = () => {
    props.changeFilter("Done", props.tId);
  };
  const onActiveClick = () => {
    props.changeFilter("Active", props.tId);
  };
  const removeTodolist = () => {
    props.removeTodolist(props.tId);
  };

  const changeTodolistTitleHandler = (title: string) => {
    props.changeTodolistTitle(title, props.tId);
  };
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
          addItem={(title) => {
            dispatch(addTaskAC(title, props.tId));
          }}
        />
        <ul>
          {tasks.map((t) => {
            const onClickHandler = () => {
              dispatch(removeTasksAC(props.tId, t.id));
            };
            const onChangeTypeHandler = (e: ChangeEvent<HTMLInputElement>) => {
              dispatch(
                changeTasksStatusAC(props.tId, t.id, e.currentTarget.checked)
              );
            };
            const onChangeTitleHandler = (newTitle: string) => {
              dispatch(changeTasksTitleAC(props.tId, t.id, newTitle));
            };
            return (
              <li key={t.id} className={t.isDone ? `list is-done` : "list"}>
                <Checkbox
                  color="secondary"
                  onChange={onChangeTypeHandler}
                  checked={t.isDone}
                  className="checkbox"
                />

                <EditableSpan
                  title={t.title}
                  changeTitleValue={onChangeTitleHandler}
                />

                <Button
                  onClick={onClickHandler}
                  size="small"
                  color="secondary"
                  className="close"
                >
                  <DeleteOutlinedIcon />
                </Button>
              </li>
            );
          })}
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
}
