import { StatusType } from "../../../app/app-reducer";
import { FilterValuesType, InitialStateTodoListType, changeEntitiStatusTodoAC, changeFilterTodoAC, createTodolists, deleteTodolists, getTodolists, todolistReducer, updateTodolistTitle } from "./todolists-reducer";
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
test('correct todolist should be removed', () => {
  const endState = todolistReducer(startState, deleteTodolists.fulfilled(todolist1, '', todolist1))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolist2)
});
test('correct todolist should be added', () => {
  const endState = todolistReducer(startState, createTodolists.fulfilled(startState[0], '', startState[0].title))

  expect(endState.length).toBe(3)
  expect(endState[0].filter).toBe('All')
});
test('correct todolist should change its name', () => {
  let newTitle = 'New Todolist';

  const endState = todolistReducer(startState, updateTodolistTitle.fulfilled({title: newTitle, tId: todolist2}, '', {title: newTitle, id: todolist2}))

  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe(newTitle)
});
test('correct filter of todolist should be changed', () => {
  let newFilter: FilterValuesType = 'Done';

  const endState = todolistReducer(startState, changeFilterTodoAC({filter: newFilter, tId: todolist2}))

  expect(endState[0].filter).toBe('All')
  expect(endState[1].filter).toBe(newFilter)
});
  test('todolists shod be added in state', () => {
 
  const action = getTodolists.fulfilled({todolists: startState}, '')

  const endState = todolistReducer([], action)

  expect(endState.length).toBe(2)
});
test('correct entiti status of todolist shoud be changed', () => {
  let newStatus: StatusType = 'loading';

  const endState = todolistReducer(startState, changeEntitiStatusTodoAC({status: newStatus, tId: todolist2}))

  expect(endState[0].entitiStatus).toBe('idle')
  expect(endState[1].entitiStatus).toBe(newStatus)
});