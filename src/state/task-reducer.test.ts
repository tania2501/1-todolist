import { addTodoAC, removeTodoAC } from './todolists-reducer';
import { v1 } from "uuid";
import { MainTasksType, addTaskAC, changeTasksStatusAC, changeTasksTitleAC, removeTasksAC, taskReducer } from "./task-reducer";

test('correct task shoud be added', () => {
  let todolist1 = v1();
  let todolist2 = v1();

  const startState: MainTasksType = {
    [todolist1]: [
      {  description: '', title: 'HTML&CSS', completed: true, status: 1, priority: 2, startDate: '', deadline: '', id: v1(), todoListId: '', order: 3, addedDate: ''},
      {  description: '', title: 'JS', completed: true, status: 1, priority: 2, startDate: '', deadline: '', id: v1(), todoListId: '', order: 3, addedDate: ''},
      {  description: '', title: 'ReactJS', completed: false, status: 1, priority: 2, startDate: '', deadline: '', id: v1(), todoListId: '', order: 3, addedDate: ''},
    ],
    [todolist2]: [
      {  description: '', title: 'Book', completed: false, status: 1, priority: 2, startDate: '', deadline: '', id: v1(), todoListId: '', order: 3, addedDate: ''},
      {  description: '', title: 'Milk', completed: true, status: 1, priority: 2, startDate: '', deadline: '', id: v1(), todoListId: '', order: 3, addedDate: ''},
    ],
  }
  let newTitle = 'New Task'
  const endState: MainTasksType = taskReducer(startState, addTaskAC(newTitle, todolist2))

  expect(endState[todolist2].length).toBe(3)
  expect(endState[todolist2][0].title).toBe(newTitle)
});

test('correct tasks shoud be removed', () => {
  let todolist1 = v1();
  let todolist2 = v1();

  const startState: MainTasksType = {
    [todolist1]: [
      {  description: '', title: 'HTML&CSS', completed: true, status: 1, priority: 2, startDate: '', deadline: '', id: v1(), todoListId: '', order: 3, addedDate: ''},
      {  description: '', title: 'JS', completed: true, status: 1, priority: 2, startDate: '', deadline: '', id: v1(), todoListId: '', order: 3, addedDate: ''},
      {  description: '', title: 'ReactJS', completed: false, status: 1, priority: 2, startDate: '', deadline: '', id: v1(), todoListId: '', order: 3, addedDate: ''},
    ],
    [todolist2]: [
      {  description: '', title: 'Book', completed: false, status: 1, priority: 2, startDate: '', deadline: '', id: v1(), todoListId: '', order: 3, addedDate: ''},
      {  description: '', title: 'Milk', completed: true, status: 1, priority: 2, startDate: '', deadline: '', id: v1(), todoListId: '', order: 3, addedDate: ''},
    ],
  }

  const endState = taskReducer(startState, removeTasksAC(todolist1, startState[todolist1][0].id))

  expect(endState[todolist1].length).toBe(2)
  expect(endState[todolist1][0].id).toBe(startState[todolist1][1].id)
});
test('correct tasks status shoud be changed', () => {
  let todolist1 = v1();
  let todolist2 = v1();

  const startState: MainTasksType = {
    [todolist1]: [
      {  description: '', title: 'HTML&CSS', completed: true, status: 1, priority: 2, startDate: '', deadline: '', id: v1(), todoListId: '', order: 3, addedDate: ''},
      {  description: '', title: 'JS', completed: true, status: 1, priority: 2, startDate: '', deadline: '', id: v1(), todoListId: '', order: 3, addedDate: ''},
      {  description: '', title: 'ReactJS', completed: false, status: 1, priority: 2, startDate: '', deadline: '', id: v1(), todoListId: '', order: 3, addedDate: ''},
    ],
    [todolist2]: [
      {  description: '', title: 'Book', completed: false, status: 1, priority: 2, startDate: '', deadline: '', id: v1(), todoListId: '', order: 3, addedDate: ''},
      {  description: '', title: 'Milk', completed: true, status: 1, priority: 2, startDate: '', deadline: '', id: v1(), todoListId: '', order: 3, addedDate: ''},
    ],
  }

  const endState = taskReducer(startState, changeTasksStatusAC(todolist1, startState[todolist1][0].id, false))

  expect(endState[todolist1].length).toBe(3)
  expect(endState[todolist1][0].completed).toBe(false)
});
test('correct tasks title shoud be changed', () => {
  let todolist1 = v1();
  let todolist2 = v1();

  const startState: MainTasksType = {
    [todolist1]: [
      {  description: '', title: 'HTML&CSS', completed: true, status: 1, priority: 2, startDate: '', deadline: '', id: v1(), todoListId: '', order: 3, addedDate: ''},
      {  description: '', title: 'JS', completed: true, status: 1, priority: 2, startDate: '', deadline: '', id: v1(), todoListId: '', order: 3, addedDate: ''},
      {  description: '', title: 'ReactJS', completed: false, status: 1, priority: 2, startDate: '', deadline: '', id: v1(), todoListId: '', order: 3, addedDate: ''},
    ],
    [todolist2]: [
      {  description: '', title: 'Book', completed: false, status: 1, priority: 2, startDate: '', deadline: '', id: v1(), todoListId: '', order: 3, addedDate: ''},
      {  description: '', title: 'Milk', completed: true, status: 1, priority: 2, startDate: '', deadline: '', id: v1(), todoListId: '', order: 3, addedDate: ''},
    ],
  }
  let newTitle = 'Hello'
  const endState = taskReducer(startState, changeTasksTitleAC(todolist1, startState[todolist1][0].id, newTitle))

  expect(endState[todolist1].length).toBe(3)
  expect(endState[todolist1][0].title).toBe(newTitle)
});

test('new property with new array should be added when new todolist is added', () => {
  let todolist1 = v1();
  let todolist2 = v1();

  const startState: MainTasksType = {
    [todolist1]: [
      {  description: '', title: 'HTML&CSS', completed: true, status: 1, priority: 2, startDate: '', deadline: '', id: v1(), todoListId: '', order: 3, addedDate: ''},
      {  description: '', title: 'JS', completed: true, status: 1, priority: 2, startDate: '', deadline: '', id: v1(), todoListId: '', order: 3, addedDate: ''},
      {  description: '', title: 'ReactJS', completed: false, status: 1, priority: 2, startDate: '', deadline: '', id: v1(), todoListId: '', order: 3, addedDate: ''},
    ],
    [todolist2]: [
      {  description: '', title: 'Book', completed: false, status: 1, priority: 2, startDate: '', deadline: '', id: v1(), todoListId: '', order: 3, addedDate: ''},
      {  description: '', title: 'Milk', completed: true, status: 1, priority: 2, startDate: '', deadline: '', id: v1(), todoListId: '', order: 3, addedDate: ''},
    ],
  }
  const action = addTodoAC('new')
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
  let todolist1 = v1();
  let todolist2 = v1();

  const startState: MainTasksType = {
    [todolist1]: [
      {  description: '', title: 'HTML&CSS', completed: true, status: 1, priority: 2, startDate: '', deadline: '', id: v1(), todoListId: '', order: 3, addedDate: ''},
      {  description: '', title: 'JS', completed: true, status: 1, priority: 2, startDate: '', deadline: '', id: v1(), todoListId: '', order: 3, addedDate: ''},
      {  description: '', title: 'ReactJS', completed: false, status: 1, priority: 2, startDate: '', deadline: '', id: v1(), todoListId: '', order: 3, addedDate: ''},
    ],
    [todolist2]: [
      {  description: '', title: 'Book', completed: false, status: 1, priority: 2, startDate: '', deadline: '', id: v1(), todoListId: '', order: 3, addedDate: ''},
      {  description: '', title: 'Milk', completed: true, status: 1, priority: 2, startDate: '', deadline: '', id: v1(), todoListId: '', order: 3, addedDate: ''},
    ],
  }
  const action = removeTodoAC(todolist2)
  const endState = taskReducer(startState, action)

  const keys = Object.keys(endState)
 

  expect(keys.length).toBe(1)
  expect(endState[todolist2]).not.toBeDefined();
});