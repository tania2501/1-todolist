import { createTodolists, deleteTodolists, getTodolists } from '../Todolist/todolists-reducer';
import { v1 } from "uuid";
import { MainTasksType, changeTaskStatus, createTask, deleteTask, getTasks, taskReducer, updateTaskTitle } from "./task-reducer";
import { TaskStatus, TaskType } from '../../../api/todolists-api';


let startState: MainTasksType = {};
const todolist1 = v1()
const todolist2 = v1()
beforeEach(() => {
    startState = {
      [todolist1]: [
        {  description: '', title: 'HTML&CSS', completed: true, status: TaskStatus.Completed, priority: 2, startDate: '', deadline: '', id: v1(), todoListId: '', order: 3, addedDate: ''},
        {  description: '', title: 'JS', completed: true, status: TaskStatus.Completed, priority: 2, startDate: '', deadline: '', id: v1(), todoListId: '', order: 3, addedDate: ''},
        {  description: '', title: 'ReactJS', completed: false, status: TaskStatus.New, priority: 2, startDate: '', deadline: '', id: v1(), todoListId: '', order: 3, addedDate: ''},
      ],
      [todolist2]: [
        {  description: '', title: 'Book', completed: false, status: TaskStatus.New, priority: 2, startDate: '', deadline: '', id: v1(), todoListId: '', order: 3, addedDate: ''},
        {  description: '', title: 'Milk', completed: true, status: TaskStatus.Completed, priority: 2, startDate: '', deadline: '', id: v1(), todoListId: '', order: 3, addedDate: ''},
      ],
    };
    
});
test('correct task shoud be added', () => {
  const task: TaskType = {  description: '', title: 'aaaaa', completed: true, status: TaskStatus.New, priority: 2, startDate: '', deadline: '', id: v1(), todoListId: todolist2, order: 3, addedDate: ''}
  const action = createTask.fulfilled({task: task}, '', {title: task.title, taskId: task.id})
  const endState = taskReducer(startState, action)

  expect(endState[todolist2].length).toBe(3)
  expect(endState[todolist2][0].title).toBe('aaaaa')
});

test('correct tasks shoud be removed', () => {
  const endState = taskReducer(startState, deleteTask.fulfilled({idTodo: todolist1, idTask: startState[todolist1][0].id}, '', {tId: todolist1, taskId: startState[todolist1][0].id}))
  expect(endState[todolist1].length).toBe(2)
  expect(endState[todolist1][0].id).toBe(startState[todolist1][1].id)
});
test('correct tasks status shoud be changed', () => {
  const endState = taskReducer(startState, changeTaskStatus.fulfilled({idTodo: todolist1, idTask: startState[todolist1][0].id, status: TaskStatus.New}, '', {todoId: todolist1, taskId: startState[todolist1][0].id, status: TaskStatus.New}))

  expect(endState[todolist1].length).toBe(3)
  expect(endState[todolist1][0].status).toBe(TaskStatus.New)
});
test('correct tasks title shoud be changed', () => {
  let newTitle = 'Hello'
  const endState = taskReducer(startState, updateTaskTitle.fulfilled({idTodo: todolist1, idTask: startState[todolist1][0].id, title: newTitle}, '', {idTask: startState[todolist1][0].id, title: newTitle, idTodo: todolist1}))

  expect(endState[todolist1].length).toBe(3)
  expect(endState[todolist1][0].title).toBe(newTitle)
});

test('new property with new array should be added when new todolist is added', () => {
  const action = createTodolists.fulfilled(startState[todolist1][0], '', startState[todolist1][0].title)
  const endState = taskReducer(startState, action)

  const keys = Object.keys(endState)
  const newKeys = keys.find(k => k != todolist1 && k != todolist2)
  if(!newKeys) {
    throw Error('new key should be added')
  }

  expect(keys.length).toBe(3)
  expect(endState[newKeys]).toEqual([])
});

test('property should be deleted', () => {
  const action = deleteTodolists.fulfilled(todolist2, '', todolist2)
  const endState = taskReducer(startState, action)

  const keys = Object.keys(endState)
 

  expect(keys.length).toBe(1)
  expect(endState[todolist2]).not.toBeDefined();
});
test('empty array should be added when we set todolists', () => {
  let todolist1 = v1();
  let todolist2 = v1();

  const startState = [
    { id: todolist1, title: "What to learn", filter: "All", addedDate: '', order: 1 },
    { id: todolist2, title: "What to buy", filter: "All", addedDate: '', order: 1 },
  ]
  const action = getTodolists.fulfilled({todolists: startState}, '')
  const endState = taskReducer({}, action)

  const keys = Object.keys(endState)
 

  expect(keys.length).toBe(2)
  expect(endState[todolist1]).toStrictEqual([]);
  expect(endState[todolist2]).toStrictEqual([]);
});

test('tasks array should be added when we set todolists', () => {
  const action = getTasks.fulfilled({tasks: startState[todolist2], todolistId: todolist2}, '', todolist2)
  const endState = taskReducer({
    [todolist1] : [],
    [todolist2] : []
  }, action)

  expect(endState[todolist2].length).toBe(2)
});