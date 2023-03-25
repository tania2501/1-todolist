import { addTodoAC, removeTodoAC } from './todolists-reducer';
import { v1 } from "uuid";
import { MainTasksType } from "../App";
import { addTaskAC, changeTasksStatusAC, changeTasksTitleAC, removeTasksAC, taskReducer } from "./task-reducer";

test('correct task shoud be added', () => {
  let todolist1 = v1();
  let todolist2 = v1();

  const startState: MainTasksType = {
    [todolist1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
    ],
    [todolist2]: [
      { id: v1(), title: "Book", isDone: false },
      { id: v1(), title: "Milk", isDone: true },
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
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
    ],
    [todolist2]: [
      { id: v1(), title: "Book", isDone: false },
      { id: v1(), title: "Milk", isDone: true },
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
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
    ],
    [todolist2]: [
      { id: v1(), title: "Book", isDone: false },
      { id: v1(), title: "Milk", isDone: true },
    ],
  }

  const endState = taskReducer(startState, changeTasksStatusAC(todolist1, startState[todolist1][0].id, false))

  expect(endState[todolist1].length).toBe(3)
  expect(endState[todolist1][0].isDone).toBe(false)
});
test('correct tasks title shoud be changed', () => {
  let todolist1 = v1();
  let todolist2 = v1();

  const startState: MainTasksType = {
    [todolist1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
    ],
    [todolist2]: [
      { id: v1(), title: "Book", isDone: false },
      { id: v1(), title: "Milk", isDone: true },
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
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
    ],
    [todolist2]: [
      { id: v1(), title: "Book", isDone: false },
      { id: v1(), title: "Milk", isDone: true },
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
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
    ],
    [todolist2]: [
      { id: v1(), title: "Book", isDone: false },
      { id: v1(), title: "Milk", isDone: true },
    ],
  }
  const action = removeTodoAC(todolist2)
  const endState = taskReducer(startState, action)

  const keys = Object.keys(endState)
 

  expect(keys.length).toBe(1)
  expect(endState[todolist2]).not.toBeDefined();
});