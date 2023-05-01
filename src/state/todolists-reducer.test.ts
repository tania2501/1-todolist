import { todolist1, todolist2 } from "./task-reducer";
import { FilterValuesType, InitialStateTodoListType, addTodoAC, changeFilterTodoAC, changeTitleTodoAC, removeTodoAC, setTodoAC, todolistReducer } from "./todolists-reducer";
import { v1 } from "uuid";

let startState: InitialStateTodoListType[] = [];
beforeEach(() => {
    startState = [
      { id: todolist1, title: "What to learn", filter: "All", addedDate: '', order: 1 },
      { id: todolist2, title: "What to buy", filter: "All", addedDate: '', order: 1 },
    ]
});
test('correct todolist shoud be removed', () => {
  const endState = todolistReducer(startState, removeTodoAC(todolist1))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolist2)
});
test('correct todolist shoud be added', () => {
  const endState = todolistReducer(startState, addTodoAC(startState[0]))

  expect(endState.length).toBe(3)
  expect(endState[0].filter).toBe('All')
});
test('correct todolist shoud change its name', () => {
  let newTitle = 'New Todolist';

  const endState = todolistReducer(startState, changeTitleTodoAC(newTitle, todolist2))

  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe(newTitle)
});
test('correct filter of todolist shoud be changed', () => {
  let newFilter: FilterValuesType = 'Done';

  const endState = todolistReducer(startState, changeFilterTodoAC(newFilter, todolist2))

  expect(endState[0].filter).toBe('All')
  expect(endState[1].filter).toBe(newFilter)
});
test('todolists shod be added in state', () => {
 
  const action = setTodoAC(startState)

  const endState = todolistReducer([], action)

  expect(endState.length).toBe(2)
});