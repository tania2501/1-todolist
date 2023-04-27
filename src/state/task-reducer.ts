import { v1 } from 'uuid';
import { AddTodolistType, RemoveTodolistType } from './todolists-reducer';
import { Reducer } from 'redux';
import { TaskType } from '../api/todolists-api';


const ADD_TASK = 'ADD-TASK';
const REMOVE_TASK = 'REMOVE-TASK';
const CHANGE_STATUS = 'CHANGE-STATUS';
const CHANGE_TITLE = 'CHANGE-TITLE';
type ChangeTitle = {
  type: 'CHANGE-TITLE'
  idTodo: string
  idTask: string
  title: string
}
type ChangeStatus = {
  type: 'CHANGE-STATUS'
  idTodo: string
  idTask: string
  completed: boolean
}
type AddTaskType = {
  type: 'ADD-TASK'
  id: string
  title: string
}
type RemoveTaskType = {
  type: 'REMOVE-TASK'
  idTodo: string
  idTask: string
}
type ActionType = AddTaskType | RemoveTaskType | ChangeStatus | ChangeTitle | AddTodolistType | RemoveTodolistType

export const todolist1 = v1();
export const todolist2 = v1();
const initialState: MainTasksType = {
  [todolist1]: [
    { description: '', title: 'HTML&CSS', completed: true, status: 1, priority: 2, startDate: '', deadline: '', id: v1(), todoListId: '', order: 3, addedDate: ''},
    { description: '', title: 'JS"', completed: false, status: 1, priority: 2,
      startDate: '', deadline: '', id: v1(), todoListId: '', order: 3,
      addedDate: ''},
  ],
  [todolist2]: [
    { description: '', title: 'Book', completed: true, status: 1, priority: 2,
      startDate: '', deadline: '', id: v1(), todoListId: '', order: 3,
      addedDate: ''},
    { description: '', title: 'Milk', completed: false, status: 1, priority: 2,
      startDate: '', deadline: '', id: v1(), todoListId: '', order: 3,
      addedDate: ''}
  ],
}

export type MainTasksType = {
  [key: string]: TaskType[];
};
export const taskReducer: Reducer<MainTasksType, ActionType> = (state = initialState, action): MainTasksType => {
  switch (action.type) {
    case ADD_TASK: {
      const stateCopy = {...state}
      const task = { id: v1(), description: '',  title: action.title, completed: false, status: 0, priority: 0, startDate: '', deadline: '', todoListId: '', order: 3,
      addedDate: ''}
      stateCopy[action.id] = [task, ...state[action.id]]
      return stateCopy;
    };
    case REMOVE_TASK: {
      const stateCopy = {...state}
      const tasks = stateCopy[action.idTodo];
      const filteredTask = tasks.filter( t => t.id !== action.idTask);
      stateCopy[action.idTodo] = filteredTask;
      return stateCopy;
    }
    case CHANGE_STATUS: {
      const tasks = state[action.idTodo].map( t => {
        if (t.id === action.idTask) {
          return {...t, completed: action.completed}
        }
        return t;
      })
      return {...state, [action.idTodo]: tasks};
    }
    case CHANGE_TITLE: {
      const tasks = state[action.idTodo].map( t => {
        if (t.id === action.idTask) {
          return { ...t, title: action.title}
        }
        return t;
      });
      return {...state, [action.idTodo]: tasks}
    }
    case 'ADD_TODOLIST': {
      const stateCopy = {...state};
      stateCopy[action.idTodo] = [];
     
      return stateCopy;
    }
    case 'REMOVE_TODOLIST': {
      const stateCopy = {...state};
      delete stateCopy[action.tId]
      return stateCopy
    }
    default: 
      return state; 
  }
}
export const addTaskAC = (title: string, id: string): AddTaskType => {
  return {type: 'ADD-TASK',  title, id}
}
export const removeTasksAC = (idTodo: string, idTask: string): RemoveTaskType => {
  return {type: 'REMOVE-TASK', idTodo, idTask} 
}
export const changeTasksStatusAC = (idTodo: string, idTask: string, completed: boolean): ChangeStatus => {
  return {type: 'CHANGE-STATUS', idTodo, idTask, completed} 
}
export const changeTasksTitleAC = (idTodo: string, idTask: string, title: string): ChangeTitle => {
  return {type: 'CHANGE-TITLE', idTodo, idTask, title} 
}
