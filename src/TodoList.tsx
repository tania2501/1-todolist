import {Button, Checkbox} from "@mui/material";
import React, { ChangeEvent } from "react";
import { FilterValuesType } from "./App";
import { EditableSpan } from "./EditableSpan";
import { SuperInput } from "./SuperInput";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { SuperButton } from "./SuperButton";

export type TasksType = {
  id: string;
  title: string;
  isDone: boolean;
};
type TitleProps = {
  title: string;
  tasks: Array<TasksType>;
  removeTask: (id: string, todolistId: string) => void;
  changeFilter: (value: FilterValuesType, tId: string) => void;
  addTasks: (title: string, todolistId: string) => void;
  changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
  filter: FilterValuesType;
  tId: string;
  removeTodolist: (todolistId: string) => void;
  changeTitleValue: (taskId: string, title: string, todolistId: string) => void;
  changeTodolistTitle: (title: string, todolistId: string) => void;
};

export function TodoList(props: TitleProps) {
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
  const addTask = (title: string) => {
    props.addTasks(title, props.tId);
  };
  const changeTodolistTitleHandler = (title: string) => {
    props.changeTodolistTitle(title, props.tId);
  };
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
        <SuperInput addItem={addTask} />
        <ul>
          {props.tasks.map((t) => {
            const onClickHandler = () => props.removeTask(t.id, props.tId);
            const onChangeTypeHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeStatus(t.id, e.currentTarget.checked, props.tId);
            };
            const onChangeTitleHandler = (newTitle: string) => {
              props.changeTitleValue(t.id, newTitle, props.tId);
            };
            return (
              <li
                key={t.id}
                className={t.isDone ? `list is-done` : "list"}
              >
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
