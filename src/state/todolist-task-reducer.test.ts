import { addTodoAC, todolistReducer } from './todolists-reducer';
import { MainTasksType, TodolistType } from "../AppWithRedux";
import { taskReducer } from './task-reducer';

test('ids should be equals', () => {
  const startTaskState: MainTasksType = {};
  const startTodoState: TodolistType[] = [];

  const action = addTodoAC('new');

  const endTaskState = taskReducer(startTaskState, action);
  const endTodoState = todolistReducer(startTodoState, action)

  const keys = Object.keys(endTaskState)
  const idFromTasks = keys[0]
  const idFromTodo = endTodoState[0].id

  expect(idFromTasks).toBe(action.idTodo)
  expect(idFromTodo).toBe(action.idTodo) 
});