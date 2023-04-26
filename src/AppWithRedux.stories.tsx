import type { Meta, StoryObj } from '@storybook/react';
import AppWithRedux from './AppWithRedux';
import { action } from '@storybook/addon-actions';
import { ReduxStoreProviderDecorator } from './stories/decorator/ReduxStoreProviderDecorator';


const meta: Meta<typeof AppWithRedux> = {
  title: 'Todolist/App',
  component: AppWithRedux,
  tags: ['autodocs'],
  decorators: [ReduxStoreProviderDecorator]
};
export default meta;
type Story = StoryObj<typeof AppWithRedux>;

export const AppWithReduxBase: Story = { 
  render: () => <AppWithRedux/>
}