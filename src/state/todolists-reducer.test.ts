import { FilterValuesType, InitialStateTodoListType, addTodoAC, changeFilterTodoAC, changeTitleTodoAC, removeTodoAC, todolistReducer } from "./todolists-reducer";
import { v1 } from "uuid";

test('correct todolist shoud be removed', () => {
  let todolist1 = v1();
  let todolist2 = v1();

  const startState: InitialStateTodoListType[] = [
    { id: todolist1, title: "What to learn", filter: "All", addedDate: '', order: 1},
    { id: todolist2, title: "What to buy", filter: "All", addedDate: '', order: 1, },
  ]

  const endState = todolistReducer(startState, removeTodoAC(todolist1))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolist2)
});
test('correct todolist shoud be added', () => {
  let todolist1 = v1();
  let todolist2 = v1();

  let newTitle = 'New Todolist';

  const startState: InitialStateTodoListType[] = [
    { id: todolist1, title: "What to learn", filter: "All", addedDate: '', order: 1 },
    { id: todolist2, title: "What to buy", filter: "All", addedDate: '', order: 1 },
  ]

  const endState = todolistReducer(startState, addTodoAC(newTitle))

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(newTitle)
  expect(endState[0].filter).toBe('All')
});
test('correct todolist shoud change its name', () => {
  let todolist1 = v1();
  let todolist2 = v1();

  let newTitle = 'New Todolist';

  const startState: InitialStateTodoListType[] = [
    { id: todolist1, title: "What to learn", filter: "All", addedDate: '', order: 1 },
    { id: todolist2, title: "What to buy", filter: "All", addedDate: '', order: 1 },
  ]

  const endState = todolistReducer(startState, changeTitleTodoAC(newTitle, todolist2))

  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe(newTitle)
});
test('correct filter of todolist shoud be changed', () => {
  let todolist1 = v1();
  let todolist2 = v1();

  let newFilter: FilterValuesType = 'Done';

  const startState: InitialStateTodoListType[] = [
    { id: todolist1, title: "What to learn", filter: "All", addedDate: '', order: 1  },
    { id: todolist2, title: "What to buy", filter: "All", addedDate: '', order: 1  },
  ]

  const endState = todolistReducer(startState, changeFilterTodoAC(newFilter, todolist2))

  expect(endState[0].filter).toBe('All')
  expect(endState[1].filter).toBe(newFilter)
});