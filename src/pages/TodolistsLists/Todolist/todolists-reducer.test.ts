import { StatusType } from "../../../app/app-reducer";
import { FilterValuesType, InitialStateTodoListType, addTodoAC, changeEntitiStatusTodoAC, changeFilterTodoAC, changeTitleTodoAC, removeTodoAC, setTodoAC, todolistReducer } from "./todolists-reducer";
import { v1 } from "uuid";

const todolist1 = v1()
const todolist2 = v1()
let startState: InitialStateTodoListType[] = [];
beforeEach(() => {
    startState = [
      { id: todolist1, title: "What to learn", filter: "All", addedDate: '', order: 1 , entitiStatus: 'idle'},
      { id: todolist2, title: "What to buy", filter: "All", addedDate: '', order: 1, entitiStatus: 'idle' },
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
test('correct entiti status of todolist shoud be changed', () => {
  let newStatus: StatusType = 'loading';

  const endState = todolistReducer(startState, changeEntitiStatusTodoAC(newStatus, todolist2))

  expect(endState[0].entitiStatus).toBe('idle')
  expect(endState[1].entitiStatus).toBe(newStatus)
});