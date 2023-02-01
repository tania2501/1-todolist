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
          {
            props.tasks.map( t => <li><input type="checkbox" checked={t.isDone}/> <span>{t.title}</span></li>)
          }
        </ul>
        <button onClick={}>x</button>
        <div>
          <button>All</button>
          <button>Active</button>
          <button>Completed</button>
        </div>
        
      </div>
    </div>
  );
}
