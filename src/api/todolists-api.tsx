import axios from "axios";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "9ea0b65b-29dc-4d3d-81d5-a42faf1e493e",
  },
});

export const TodolistsAPI = {
  getTodolists() {
    return instance.get<TodolistsType[]>(`todo-lists`);
  },
  createTodolist(title: string) {
    return instance.post<ResponseType<{ item: TodolistsType }>>(`todo-lists`, {title});
  },
  deleteTodolist(id: string) {
    return instance.delete<ResponseType<{}>>(`todo-lists/${id}`);
  },
  updateTitle(title: string, id: string) {
    return instance.put<ResponseType<{}>>(`todo-lists/${id}`, { title });
  },
  updateStatus(todoId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<ResponseType<{}>>(`todo-lists/${todoId}/tasks/${taskId}`, model);
  },
  getTasks(id: string) {
    return instance.get<GetTasksType>(`todo-lists/${id}/tasks`);
  },
  createTask(title: string, id: string) {
    return instance.post<ResponseType<{item: TaskType}>>(`todo-lists/${id}/tasks`, { title });
  },
  deleteTask(todoId: string, taskId: string) {
    return instance.delete<ResponseType<{}>>(`todo-lists/${todoId}/tasks/${taskId}`);
  },
  updateTitleTask(todoId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<ResponseType<{}>>(`todo-lists/${todoId}/tasks/${taskId}`,  model);
  },
};

export const authAPI = {
  login(data: LoginFormType) {
    return instance.post<ResponseType<{userId?: number}>>(`auth/login`, data)
  },
  auth() {
    return instance.get(`auth/me`).then(response => {
      return response.data
    })
  },
  logOut() {
    return instance.delete('auth/login').then( response => {
      return response.data
    })
  }
}
//types
export type LoginFormType = {
  email: string
  password: string
  rememberMe: boolean
  captcha?: string
}
export type TodolistsType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};
export type TaskType = {
  description: string;
  title: string;
  completed: boolean;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};
export enum TaskStatus {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3
}
export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4
}
export type UpdateTaskModelType = {
  title: string
  description: string;
  status: TaskStatus
  priority: TaskPriorities
  startDate: string;
  deadline: string;
}
export type ResponseType<D> = {
  resultCode: number;
  messages: string[];
  data: D;
};
type GetTasksType = {
  items: TaskType[]
  totalCount: number
  error: string
}
