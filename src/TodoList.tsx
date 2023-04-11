import { Button } from "@mui/material";
import React, { useCallback } from "react";
import { FilterValuesType } from "./AppWithRedux";
import { EditableSpan } from "./EditableSpan";
import { SuperInput } from "./SuperInput";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "./state/store";
import { addTaskAC } from "./state/task-reducer";
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
  }, [props.changeFilter,  props.tId]);
  const onCompletedClick = useCallback(() => {
    props.changeFilter("Done", props.tId);
  }, [props.changeFilter,  props.tId]);
  const onActiveClick = useCallback(() => {
    props.changeFilter("Active", props.tId);
  }, [props.changeFilter,  props.tId]);
  const removeTodolist = useCallback(() => {
    props.removeTodolist(props.tId);
  }, [props.removeTodolist, props.tId]);

  const changeTodolistTitleHandler = useCallback((title: string) => {
    props.changeTodolistTitle(title, props.tId);
  }, [props.changeTodolistTitle, props.tId]);
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
          addItem={useCallback( (title) => {
            dispatch(addTaskAC(title, props.tId));
          }, [dispatch, props.tId])}
        />
        <ul>
          {taskForTodoList.map(t => <Task task={t} tId={props.tId} key={t.id}/>)}
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