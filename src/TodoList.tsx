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
};

export function TodoList(props: TitleProps) {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const onNewTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const onPressKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode === 13) {
      props.addTasks(newTaskTitle);
      setNewTaskTitle("");
    }
  };
  const addNewTask = () => {
    props.addTasks(newTaskTitle);
    setNewTaskTitle("");
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
          />
          <button onClick={addNewTask}>+</button>
        </div>
        <ul>
          {props.tasks.map((t) => (
            <li key={t.id}>
              <input type="checkbox" checked={t.isDone} />{" "}
              <span>{t.title}</span>
              <button onClick={() => props.removeTask(t.id)}>x</button>
            </li>
          ))}
        </ul>
        <div>
          <button onClick={onAllClick}>All</button>
          <button onClick={onActiveClick}>Active</button>
          <button onClick={onCompletedClick}>Completed</button>
        </div>
      </div>
    </div>
  );
}
