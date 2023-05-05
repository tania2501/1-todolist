import { Checkbox, Button } from "@mui/material";
import { ChangeEvent, useCallback } from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import React from "react";
import { TaskType, TaskStatus } from "../../../api/todolists-api";
import { EditableSpan } from "../../../components/EditableSpan/EditableSpan";


export type TaskPropsType = {
  task: TaskType;
  tId: string;
  changeTitle: (todolistId: string, taskId: string, title: string)=>void
  changeStatus: (todolistId: string, taskId: string, statuse: TaskStatus)=>void
  removeTask: (todolistId: string, id: string)=>void
};
export const Task: React.FC<TaskPropsType> = React.memo((props) => {
  const onClickHandler = useCallback(() => {
    props.removeTask(props.tId, props.task.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.tId, props.task.id, props.removeTask]);
  const onChangeTypeHandler =useCallback((e: ChangeEvent<HTMLInputElement>) => {
    let status = e.currentTarget.checked
    props.changeStatus(props.tId, props.task.id, status ? TaskStatus.Completed : TaskStatus.New )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.tId, props.task.id, props.changeStatus]);
  const onChangeTitleHandler =useCallback((newTitle: string) => {
    props.changeTitle(props.tId, props.task.id, newTitle)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.tId, props.task.id, props.changeTitle]);
  return (
    <li className={props.task.status === TaskStatus.Completed ? `list is-done` : "list"}>
      <Checkbox
        color="secondary"
        onChange={onChangeTypeHandler}
        checked={props.task.status === TaskStatus.Completed}
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
