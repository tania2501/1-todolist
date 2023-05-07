import { InitialStateTodoListType, addTodoAC, todolistReducer } from './Todolist/todolists-reducer';
import { MainTasksType, taskReducer } from './Task/task-reducer';


test('ids should be equals', () => {
  const startTaskState: MainTasksType = {};
  const startTodoState: InitialStateTodoListType[] = [];

  const action = addTodoAC({id: '1', title: "What to learn", addedDate: '', order: 1 });

  const endTaskState = taskReducer(startTaskState, action);
  const endTodoState = todolistReducer(startTodoState, action)

  const keys = Object.keys(endTaskState)
  const idFromTasks = keys[0]
  const idFromTodo = endTodoState[0].id

  expect(idFromTasks).toBe(action.todolist.id)
  expect(idFromTodo).toBe(action.todolist.id) 
});