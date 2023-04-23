import type { Meta, StoryObj } from '@storybook/react';
import { Task } from './Task';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof Task> = {
  title: 'Todolist/Task',
  component: Task,
  tags: ['autodocs'],
  args: {
    task:  { id: '1', title: "HTML&CSS", isDone: true },
    tId: 'gbvgb5',
    changeStatus: action('change task status'),
    removeTask: action('remove task'),
    changeTitle: action('change Title')
  },
};

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsDone = {
  args: {

  }
}

export const TaskIsActive = {
  args: {
    task:  { id: '1', title: "HTML&CSS", isDone: false },
  }
}