import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "./App";

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
  tId: string
  removeTodolist: (todolistId: string)=> void
};

export function TodoList(props: TitleProps) {
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [error, setError]= useState<string | null>(null)

  const onNewTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setNewTaskTitle(e.currentTarget.value);
  };

  const onPressKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode === 13) {
      setError(null);
      props.addTasks(newTaskTitle, props.tId);
      setNewTaskTitle("");
    }
  };
  const addNewTask = () => {
    if (newTaskTitle.trim() !== "") {
      props.addTasks(newTaskTitle.trim(), props.tId);
    setNewTaskTitle("");
    } else {
      setError('Field is required!')
    }
  };
  const onAllClick = () => {
    props.changeFilter("all", props.tId);
  };
  const onCompletedClick = () => {
    props.changeFilter("completed", props.tId);
  };
  const onActiveClick = () => {
    props.changeFilter("active", props.tId);
  };
  const removeTodolist = () => {
    props.removeTodolist(props.tId)
  }

  return (
    <div className="App">
      <div>
        <h3>{props.title} <button onClick={removeTodolist}>x</button></h3>
        <div>
          <input
            value={newTaskTitle}
            onChange={onNewTitleChange}
            onKeyPress={onPressKeyHandler}
            className={error ? 'error' : ''}
          />
          <button onClick={addNewTask}>+</button>
          {error && <div className="errorMessage">{error}</div>}
        </div>
        <ul>
          {props.tasks.map((t) => {
            const onClickHandler = () => props.removeTask(t.id, props.tId);
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeStatus(t.id, e.currentTarget.checked, props.tId);
            };
            return (
              <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                <input
                  type="checkbox"
                  onChange={onChangeHandler}
                  checked={t.isDone}
                />
                <span>{t.title}</span>
                <button onClick={onClickHandler}>x</button>
              </li>
            );
          })}
        </ul>
        <div>
          <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClick}>All</button>
          <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClick}>Active</button>
          <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={onCompletedClick}>Completed</button>
        </div>
      </div>
    </div>
  );
}
