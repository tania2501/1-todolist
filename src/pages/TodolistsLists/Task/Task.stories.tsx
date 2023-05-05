import type { Meta, StoryObj } from '@storybook/react';
import { Task } from './Task';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof Task> = {
  title: 'Todolist/Task',
  component: Task,
  tags: ['autodocs'],
  args: {
    task:  {  description: '', title: 'HTML&CSS', completed: true, status: 1, priority: 2, startDate: '', deadline: '', id: '1', todoListId: '', order: 3, addedDate: ''},
    tId: 'gbvgb5',
    changeStatus: action('change task status'),
    removeTask: action('remove task'),
    changeTitle: action('change Title')
  },
};

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsDone = {}

export const TaskIsActive = {
  args: {
    task:  { id: '1', title: "HTML&CSS", completed: false },
  }
}