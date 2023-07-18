import { InitialStateTodoListType, createTodolists, todolistReducer } from './Todolist/todolists-reducer';
import { MainTasksType, taskReducer } from './Task/task-reducer';


test('ids should be equals', () => {
  const startTaskState: MainTasksType = {};
  const startTodoState: InitialStateTodoListType[] = [];

  const action = createTodolists.fulfilled({ id: '1', title: "What to learn", addedDate: '', order: 1 }, '', 'What to learn');

  const endTaskState = taskReducer(startTaskState, action);
  const endTodoState = todolistReducer(startTodoState, action)

  const keys = Object.keys(endTaskState)
  const idFromTasks = keys[0]
  const idFromTodo = endTodoState[0].id

  expect(idFromTasks).toBe(action.payload.id)
  expect(idFromTodo).toBe(action.payload.id) 
});