import { v1 } from 'uuid';
import { AddTodolistType, RemoveTodolistType, SetTodolistsType } from './todolists-reducer';
import { Reducer } from 'redux';
import { TaskStatus, TaskType, TodolistsAPI, UpdateTaskModelType } from '../api/todolists-api';
import { ThunkAction } from 'redux-thunk';
import { AppRootState } from './store';


const ADD_TASK = 'ADD-TASK';
const REMOVE_TASK = 'REMOVE-TASK';
const CHANGE_STATUS = 'CHANGE-STATUS';
const CHANGE_TITLE = 'CHANGE-TITLE';
const SET_TASKS = 'SET-TASKS'
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
  status: TaskStatus
}
type AddTaskType = {
  type: 'ADD-TASK'
  task: TaskType
}
type RemoveTaskType = {
  type: 'REMOVE-TASK'
  idTodo: string
  idTask: string
}
type SetTasksType = {
  type: 'SET-TASKS'
  tasks: TaskType[]
  todolistId: string
}
type ActionType = AddTaskType | RemoveTaskType | ChangeStatus | ChangeTitle | AddTodolistType | RemoveTodolistType | SetTodolistsType | SetTasksType

export const todolist1 = v1();
export const todolist2 = v1();
const initialState: MainTasksType = {}

export type MainTasksType = {
  [key: string]: TaskType[];
};
export const taskReducer: Reducer<MainTasksType, ActionType> = (state = initialState, action): MainTasksType => {
  switch (action.type) {
    case ADD_TASK: {
      const stateCopy = {...state}
      const newTask = action.task
      const task = stateCopy[newTask.todoListId]
      const newTasks = [newTask, ...task]
      stateCopy[newTask.todoListId] = newTasks
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
          return {...t, status: action.status}
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
      stateCopy[action.todolist.id] = [];
     
      return stateCopy;
    }
    case 'REMOVE_TODOLIST': {
      const stateCopy = {...state};
      delete stateCopy[action.tId]
      return stateCopy
    }
    case 'SET-TODOLISTS': {
      const stateCopy = {...state};
      action.todolists.forEach( tl => {
        stateCopy[tl.id] = []
      })
      return stateCopy;
    }
    case SET_TASKS : {
      const stateCopy = {...state};
      stateCopy[action.todolistId] = action.tasks
      return stateCopy
    }
    default: 
      return state; 
  }
}
export const addTaskAC = (task: TaskType): AddTaskType => {
  return {type: 'ADD-TASK',  task}
}
export const removeTasksAC = (idTodo: string, idTask: string): RemoveTaskType => {
  return {type: 'REMOVE-TASK', idTodo, idTask} 
}
export const changeTasksStatusAC = (idTodo: string, idTask: string, status: TaskStatus): ChangeStatus => {
  return {type: 'CHANGE-STATUS', idTodo, idTask, status} 
}
export const changeTasksTitleAC = (idTodo: string, idTask: string, title: string): ChangeTitle => {
  return {type: 'CHANGE-TITLE', idTodo, idTask, title} 
}
export const setTaskAC = (tasks: TaskType[], todolistId: string): SetTasksType => {
  return {type: 'SET-TASKS', tasks, todolistId} 
}
export const getTasks = (tId: string): ThunkAction<Promise<void>, AppRootState, unknown, ActionType> => {
  return async (dispatch) => {
    TodolistsAPI.getTasks(tId).then((data) => {
      dispatch(setTaskAC(data.data.items, tId));
    });
  }
}
export const deleteTask = (tId: string, taskId: string): ThunkAction<Promise<void>, AppRootState, unknown, ActionType> => {
  return async (dispatch) => {
    TodolistsAPI.deleteTask(tId, taskId).then((data) => {
      dispatch(removeTasksAC(tId, taskId));
    });
  }
}
export const createTask = (title: string, taskId: string): ThunkAction<Promise<void>, AppRootState, unknown, ActionType> => {
  return async (dispatch) => {
    TodolistsAPI.createTask(title, taskId).then((data) => {
      dispatch(addTaskAC(data.data.data.item));
    });
  }
}
export const updateTaskTitle = (todoId: string, taskId: string, title: string): ThunkAction<Promise<void>, AppRootState, unknown, ActionType> => {
  return async (dispatch, getState) => {
    const state = getState();
    const task = state.tasks[todoId].find( t => t.id === taskId)
    if(!task) {
      console.warn('task not found in state')
      return
    }
    const model: UpdateTaskModelType = {
      ...task,
      status: task.status
    }
    TodolistsAPI.updateTitleTask(todoId, taskId, model).then((data) => {
      dispatch(changeTasksTitleAC(todoId, taskId, title));
    });
  }
}
export const changeTaskStatus = (todoId: string, taskId: string, status: TaskStatus): ThunkAction<Promise<void>, AppRootState, unknown, ActionType> => {
  return async (dispatch, getState) => {
    const state = getState();
    const task = state.tasks[todoId].find( t => t.id === taskId)
    if(!task) {
      console.warn('task not found in state')
      return
    }
    const model: UpdateTaskModelType = {
      ...task,
      status: status
    }
    TodolistsAPI.updateStatus(todoId, taskId, model).then((data) => {
      dispatch(changeTasksStatusAC(todoId, taskId, status));
    });
  }
}