import { IconButton, TextField } from "@mui/material";
import React, { ChangeEvent, useState, KeyboardEvent } from "react";
import { AddToPhotos } from "@mui/icons-material";

export type SuperInputType = {
  addItem: (title: string) => void;
}

export const SuperInput = React.memo((props: SuperInputType) => {

  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [error, setError]= useState<string | null>(null);

  const onNewTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
    if (error !== null) {
       setError(null);
    }
    if (e.key === 'Enter') {
      props.addItem(newTaskTitle);
      setNewTaskTitle("");
    }
  };

  return (
    <div>
      <TextField
        value={newTaskTitle}
        onChange={onNewTitleChange}
        onKeyDown={onPressKeyHandler}
        error={!!error}
        helperText={error}
        variant="standard"
        color="secondary" label='Type value'/>
      <IconButton onClick={addNewTask} color='secondary' size="small" className="addButton"><AddToPhotos/></IconButton>
    </div>
  )
});