import { Checkbox, Button } from "@mui/material";
import { ChangeEvent, useCallback } from "react";
import { useDispatch } from "react-redux";
import { EditableSpan } from "./EditableSpan";
import { TasksType } from "./TodoList";
import {
  removeTasksAC,
  changeTasksStatusAC,
  changeTasksTitleAC,
} from "./state/task-reducer";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import React from "react";

type TaskPropsType = {
  task: TasksType;
  tId: string;
};
export const Task = React.memo((props: TaskPropsType) => {
  const dispatch = useDispatch();
  const onClickHandler = useCallback(() => {
    dispatch(removeTasksAC(props.tId, props.task.id));
  }, [props.tId, props.task.id]);
  const onChangeTypeHandler =useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      changeTasksStatusAC(props.tId, props.task.id, e.currentTarget.checked)
    );
  }, [props.tId, props.task.id]);
  const onChangeTitleHandler =useCallback((newTitle: string) => {
    dispatch(changeTasksTitleAC(props.tId, props.task.id, newTitle));
  }, [props.tId, props.task.id]);
  return (
    <li className={props.task.isDone ? `list is-done` : "list"}>
      <Checkbox
        color="secondary"
        onChange={onChangeTypeHandler}
        checked={props.task.isDone}
        className="checkbox"
      />

      <EditableSpan
        title={props.task.title}
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
});
