import { produce } from "immer";

export const LOAD_TODOS_REQUEST = "LOAD_TODOS_REQUEST" as const;
export const LOAD_TODOS_SUCCESS = "LOAD_TODOS_SUCCESS" as const;
export const CREATE_TODO_REQUEST = "CREATE_TODO_REQUEST" as const;
export const CREATE_TODO_SUCCESS = "CREATE_TODO_SUCCESS" as const;
export const DELETE_TODO_REQUEST = "DELETE_TODO_REQUEST" as const;
export const DELETE_TODO_SUCCESS = "DELETE_TODO_SUCCESS" as const;
export const PATCH_TODO_REQUEST = "PATCH_TODO_REQUEST" as const;
export const PATCH_TODO_SUCCESS = "PATCH_TODO_SUCCESS" as const;
export const REQUEST_ALERT = "REQUEST_ALERT" as const;
export const SUCCESS_ALERT = "SUCCESS_ALERT" as const;
export const SET_EDIT_TODO = "SET_EDIT_TODO" as const;
export const FILTER_REQUEST = "FILTER_REQUEST" as const;
export const FILTER_SUCCESS = "FILTER_SUCCESS" as const;

export const filterRequest = (payload) => ({
  type: FILTER_REQUEST,
  payload,
});
export const filterSuccess = (payload) => ({
  type: FILTER_SUCCESS,
  payload,
});
export const setEditTodo = (payload) => ({
  type: SET_EDIT_TODO,
  payload,
});

export const patchTodoRequest = (payload) => ({
  type: PATCH_TODO_REQUEST,
  payload,
});
export const patchTodoSuccess = (payload) => ({
  type: PATCH_TODO_SUCCESS,
  payload,
});
export const deleteTodoRequest = (payload) => ({
  type: DELETE_TODO_REQUEST,
  payload,
});
export const deleteTodoSuccess = (payload) => ({
  type: DELETE_TODO_SUCCESS,
  payload,
});
export const requestAlert = (payload) => ({
  type: REQUEST_ALERT,
  payload,
});
export const successAlert = () => ({
  type: SUCCESS_ALERT,
});
export const loadTodosRequest = (payload?) => ({
  type: LOAD_TODOS_REQUEST,
  payload,
});
export const loadTodosSuccess = (payload) => ({
  type: LOAD_TODOS_SUCCESS,
  payload,
});
export const createTodoRequest = (payload) => ({
  type: CREATE_TODO_REQUEST,
  payload,
});
export const createTodoSuccess = (payload) => ({
  type: CREATE_TODO_SUCCESS,
  payload,
});

type TodoAction =
  | ReturnType<typeof filterRequest>
  | ReturnType<typeof filterSuccess>
  | ReturnType<typeof setEditTodo>
  | ReturnType<typeof requestAlert>
  | ReturnType<typeof successAlert>
  | ReturnType<typeof patchTodoRequest>
  | ReturnType<typeof patchTodoSuccess>
  | ReturnType<typeof loadTodosRequest>
  | ReturnType<typeof loadTodosSuccess>
  | ReturnType<typeof createTodoRequest>
  | ReturnType<typeof createTodoSuccess>
  | ReturnType<typeof deleteTodoRequest>
  | ReturnType<typeof deleteTodoSuccess>;

export interface TODO {
  id?: number;
  title: string;
  contents: string;
  complete?: boolean;
  priority: string;
  deadline: number | string;
}
export interface Filter {
  priority: number;
  deadline: number;
  complete: number;
}

type TodoState = {
  todos: [TODO?];
  filter: Filter;
  editTodo: TODO | null;

  creatingTodo: boolean;
  createdTodo: boolean;

  hasMoreTodo: boolean;

  alertHidden: boolean;
  alertMessage: string;
};

const initialState: TodoState = {
  todos: [],
  filter: {
    priority: 0,
    deadline: 0,
    complete: 0,
  },
  editTodo: null,
  creatingTodo: false,
  createdTodo: false,

  hasMoreTodo: false,
  alertHidden: true,
  alertMessage: "",
};

const reducer = (state: TodoState = initialState, action: TodoAction) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case FILTER_REQUEST: {
        draft.filter = action.payload;
        draft.todos = [];
        break;
      }
      case FILTER_SUCCESS: {
        break;
      }
      case SET_EDIT_TODO: {
        draft.editTodo = action.payload;
        break;
      }
      case REQUEST_ALERT: {
        draft.alertHidden = false;
        draft.alertMessage = action.payload;
        break;
      }
      case SUCCESS_ALERT: {
        draft.alertHidden = true;
        break;
      }
      case PATCH_TODO_REQUEST: {
        break;
      }
      case PATCH_TODO_SUCCESS: {
        const index = draft.todos.findIndex((v) => v?.id === action.payload.id);
        draft.todos[index] = action.payload;
        draft.editTodo = null;

        break;
      }
      case LOAD_TODOS_REQUEST: {
        break;
      }
      case LOAD_TODOS_SUCCESS: {
        action.payload.forEach((v: TODO) => {
          draft.todos.push(v as never);
        });
        draft.hasMoreTodo = action.payload.length === 20;
        break;
      }
      case CREATE_TODO_REQUEST: {
        draft.creatingTodo = true;
        draft.createdTodo = false;
        break;
      }
      case CREATE_TODO_SUCCESS: {
        draft.creatingTodo = false;
        draft.createdTodo = true;
        draft.todos.unshift(action.payload as never);

        break;
      }
      case DELETE_TODO_REQUEST: {
        break;
      }
      case DELETE_TODO_SUCCESS: {
        const index = draft.todos.findIndex((v) => v?.id === action.payload);
        draft.todos.splice(index, 1);
        break;
      }
      default: {
        break;
      }
    }
  });
};

export default reducer;
