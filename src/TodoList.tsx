import { title } from "process";
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
  removeTask: (id: string) => void;
  changeFilter: (value: FilterValuesType) => void;
  addTasks: (title: string) => void;
  changeStatus: (taskId: string, isDone: boolean) => void;
  filter: FilterValuesType;
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
      props.addTasks(newTaskTitle);
      setNewTaskTitle("");
    }
  };
  const addNewTask = () => {
    if (newTaskTitle.trim() !== "") {
      props.addTasks(newTaskTitle.trim());
    setNewTaskTitle("");
    } else {
      setError('Field is required!')
    }
  };
  const onAllClick = () => {
    props.changeFilter("all");
  };
  const onCompletedClick = () => {
    props.changeFilter("completed");
  };
  const onActiveClick = () => {
    props.changeFilter("active");
  };

  return (
    <div className="App">
      <div>
        <h3>{props.title}</h3>
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
            const onClickHandler = () => props.removeTask(t.id);
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeStatus(t.id, e.currentTarget.checked);
            };
            return (
              <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                <input
                  type="checkbox"
                  onChange={onChangeHandler}
                  checked={t.isDone}
                />{" "}
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
