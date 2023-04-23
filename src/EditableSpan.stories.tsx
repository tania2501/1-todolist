import type { Meta, StoryObj } from '@storybook/react';
import { EditableSpan } from './EditableSpan';
import { action } from '@storybook/addon-actions';


const meta: Meta<typeof EditableSpan> = {
  title: 'Todolist/Editable Span',
  component: EditableSpan,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  args: {
    title: 'Hello',
    changeTitleValue: action('change title')
  }
};
export default meta;
type Story = StoryObj<typeof EditableSpan>;

export const EditableSpanBase: Story = {};