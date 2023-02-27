import React, { ChangeEvent, useState, KeyboardEvent } from "react";

type SuperInputType = {
  addItem: (title: string) => void;
}

export const SuperInput = (props: SuperInputType) => {
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [error, setError]= useState<string | null>(null);

  const onNewTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setNewTaskTitle(e.currentTarget.value);
  };
  const addNewTask = () => {
    if (newTaskTitle.trim() !== "") {
      props.addItem(newTaskTitle.trim());
    setNewTaskTitle("");
    } else {
      setError('Field is required!')
    }
  };
  const onPressKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setError(null);
      props.addItem(newTaskTitle);
      setNewTaskTitle("");
    }
  };

  return (
    <div>
      <input
        value={newTaskTitle}
        onChange={onNewTitleChange}
        onKeyDown={onPressKeyHandler}
        className={error ? 'error' : ''} />
      <button onClick={addNewTask}>+</button>
      {error && <div className="errorMessage">{error}</div>}
    </div>
  )
}