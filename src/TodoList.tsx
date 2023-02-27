import React, { ChangeEvent } from "react";
import { FilterValuesType } from "./App";
import { EditableSpan } from "./EditableSpan";
import { SuperInput } from "./SuperInput";

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
  changeTitleValue: (taskId: string, title: string, todolistId: string) => void;
  changeTodolistTitle: (title: string, todolistId: string) => void;
};

export function TodoList(props: TitleProps) {
  const onAllClick = () => {
    props.changeFilter("all", props.tId);
  };
  const onCompletedClick = () => {
    props.changeFilter("done", props.tId);
  };
  const onActiveClick = () => {
    props.changeFilter("active", props.tId);
  };
  const removeTodolist = () => {
    props.removeTodolist(props.tId)
  }
  const addTask = (title: string)=> {
    props.addTasks(title, props.tId)
  }
  const changeTodolistTitleHandler = (title: string) => {
    props.changeTodolistTitle(title, props.tId)
  }
  return (
    <div className="todo">
      <div>
        <h3 className="title">
          <EditableSpan title={props.title} changeTitleValue={changeTodolistTitleHandler}/>
          <button onClick={removeTodolist}>x</button>
        </h3>
        <SuperInput addItem={addTask}/>
        <ul className="listblock">
          {props.tasks.map((t) => {
            const onClickHandler = () => props.removeTask(t.id, props.tId);
            const onChangeTypeHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeStatus(t.id, e.currentTarget.checked, props.tId);
            };
            const onChangeTitleHandler = (newTitle: string) => {
              props.changeTitleValue(t.id, newTitle, props.tId);
            };
            return (
              <li key={t.id} className={'list' + (t.isDone ? ' ' + 'is-done' : '')}>
                <input
                  type="checkbox"
                  onChange={onChangeTypeHandler}
                  checked={t.isDone}
                  className='checkbox'
                />
                <EditableSpan title={t.title} changeTitleValue={onChangeTitleHandler}/>
                <button onClick={onClickHandler}>x</button>
              </li>
            );
          })}
        </ul>
        <div className="filterButton">
          <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClick}>All</button>
          <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClick}>Active</button>
          <button className={props.filter === 'done' ? 'active-filter' : ''} onClick={onCompletedClick}>Done &#10004;</button>
        </div>
      </div>
    </div>
  );
}

