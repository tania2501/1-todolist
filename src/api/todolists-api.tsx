import axios from "axios";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "9ea0b65b-29dc-4d3d-81d5-a42faf1e493e",
  },
});

type TodolistsType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};
type TaskType = {
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
type ResponseType<D> = {
  resultCode: number;
  messages: string[];
  data: D;
};
type GetTasksType = {
  items: TaskType[]
  totalCount: number
  error: string
}
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
  getTasks(id: string) {
    return instance.get<GetTasksType>(`todo-lists/${id}/tasks`);
  },
  createTask(title: string, id: string) {
    return instance.post<ResponseType<{item: TaskType}>>(`todo-lists/${id}/tasks`, { title });
  },
  deleteTask(todoId: string, taskId: string) {
    return instance.delete<ResponseType<{}>>(`todo-lists/${todoId}/tasks${taskId}`);
  },
  updateTitleTask(todoId: string, taskId: string, title: string) {
    return instance.put<ResponseType<{}>>(`todo-lists/${todoId}/tasks${taskId}`, { title });
  },
};
