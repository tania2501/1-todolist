import { InitialStateType, appReducer, setAppErrorAC, setAppStatusAC } from "./app-reducer";

let startState: InitialStateType;

beforeEach(() => {
    startState = {
      status: 'idle',
      error: null,
      initialized: false,
      name: ''
    };
    
});
test('correct error message should be set', () => {
  const endState = appReducer(startState, setAppErrorAC({error: 'some error'}))

  expect(endState.error).toBe('some error')
});
test('correct status message should be set', () => {
  const endState = appReducer(startState, setAppStatusAC({status: 'loading'}))

  expect(endState.status).toBe('loading')
});