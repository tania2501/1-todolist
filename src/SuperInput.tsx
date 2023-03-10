import { Button, Input } from "@mui/material";
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
      <Input
        value={newTaskTitle}
        onChange={onNewTitleChange}
        onKeyDown={onPressKeyHandler}
        id="outlined-basic" color="secondary"/>
      <Button onClick={addNewTask} color='secondary' variant="contained" size="small">+</Button>
      {error && <div className="errorMessage">{error}</div>}
    </div>
  )
}