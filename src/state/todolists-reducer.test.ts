import { AddTodoAC, ChangeFilterTodoAC, ChangeTitleTodoAC, RemoveTodoAC, todolistReducer } from "./todolists-reducer";
import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "../App";

test('correct todolist shoud be removed', () => {
  let todolist1 = v1();
  let todolist2 = v1();

  const startState: TodolistType[] = [
    { id: todolist1, title: "What to learn", filter: "All" },
    { id: todolist2, title: "What to buy", filter: "All" },
  ]

  const endState = todolistReducer(startState, RemoveTodoAC(todolist1))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolist2)
});
test('correct todolist shoud be added', () => {
  let todolist1 = v1();
  let todolist2 = v1();

  let newTitle = 'New Todolist';

  const startState: TodolistType[] = [
    { id: todolist1, title: "What to learn", filter: "All" },
    { id: todolist2, title: "What to buy", filter: "All" },
  ]

  const endState = todolistReducer(startState, AddTodoAC(newTitle))

  expect(endState.length).toBe(3)
  expect(endState[2].title).toBe(newTitle)
  expect(endState[2].filter).toBe('All')
});
test('correct todolist shoud change its name', () => {
  let todolist1 = v1();
  let todolist2 = v1();

  let newTitle = 'New Todolist';

  const startState: TodolistType[] = [
    { id: todolist1, title: "What to learn", filter: "All" },
    { id: todolist2, title: "What to buy", filter: "All" },
  ]

  const endState = todolistReducer(startState, ChangeTitleTodoAC(newTitle, todolist2))

  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe(newTitle)
});
test('correct filter of todolist shoud be changed', () => {
  let todolist1 = v1();
  let todolist2 = v1();

  let newFilter: FilterValuesType = 'Done';

  const startState: TodolistType[] = [
    { id: todolist1, title: "What to learn", filter: "All" },
    { id: todolist2, title: "What to buy", filter: "All" },
  ]

  const endState = todolistReducer(startState, ChangeFilterTodoAC(newFilter, todolist2))

  expect(endState[0].filter).toBe('All')
  expect(endState[1].filter).toBe(newFilter)
});