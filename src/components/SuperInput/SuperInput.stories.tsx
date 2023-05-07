import type { Meta, StoryObj } from '@storybook/react';
import { SuperInput, SuperInputType } from "./SuperInput";
import { ChangeEvent, useState, KeyboardEvent } from 'react';
import { IconButton, TextField } from '@mui/material';
import { AddToPhotos } from '@mui/icons-material';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof SuperInput> = {
  title: 'Todolist/SuperInput',
  component: SuperInput,
  tags: ['autodocs'],
  args: {
    addItem: action('type text'),
    disable: false
  },
};

export default meta;
type Story = StoryObj<typeof SuperInput>;

export const SuperInputBase: Story = {} 
export const SuperInputDisabled: Story = {
  args: {
    disable: true
  }
} 
export const SuperInputError = (args: SuperInputType) => {
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [error, setError]= useState<string | null>('Field is required!');

  const onNewTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };
  const addNewTask = () => {
    if (newTaskTitle.trim() !== "") {
      args.addItem(newTaskTitle.trim());
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
      args.addItem(newTaskTitle);
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
}