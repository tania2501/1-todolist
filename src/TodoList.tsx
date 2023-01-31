import React from 'react';
type TasksType = {
  id: number;
  title: string;
  isDone: boolean;
}
type TitleProps = { 
  title: string; 
  tasks: Array<TasksType>;
}

export function TodoList(props: TitleProps) {
  return (
    <div className="App">
      <div>
        <h3>{ props.title }</h3>
        <div>
          <input />
          <button>+</button>
        </div>
        <ul>
          <li><input type="checkbox" checked={true} /> <span>HTML&CSS</span></li>
          <li><input type="checkbox" checked={true} /> <span>JS</span></li>
          <li><input type="checkbox" checked={false} /> <span>React</span></li>
        </ul>
        <div>
          <button>All</button>
          <button>Active</button>
          <button>Completed</button>
        </div>
        <ul>
          <li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>
          <li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span></li>
          <li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span></li>
        </ul>
      </div>
    </div>
  );
}
