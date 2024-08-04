import {ITodo} from './interfaces';
import {persist} from 'zustand/middleware';
import create from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SetState {
  (update: (state: {todos: ITodo[]}) => {todos: ITodo[]}): void;
}
interface StoreState {
  todos: ITodo[];
  editTodo: (id: string, todo: Partial<ITodo>) => void;
  deleteTodo: (tId: string) => void;
  createNewTodo: (item: ITodo) => void;
  selectCurrentTodo: (todoId: string) => void;
  // addNewTodoItem: (tId: string, value: ITodo) => void;
  completeTask: (tId: string, itemId: string) => void;
  initializeTodos: () => Promise<void>;
}

const setCreateNewTodo = (set: SetState, item: ITodo) => {
  set(state => {
    const updatedTodos = [
      ...state.todos.map(t => ({...t, isSelected: false})),
      item,
    ];
    saveTodosToLocalStorage(updatedTodos);
    return {todos: updatedTodos};
  });
};

const setSelectCurrentTodo = (set: SetState, todoId: string) => {
  set(state => {
    const updatedTodos = state.todos.map(t => {
      if (t.id === todoId) {
        return {...t, isSelected: true};
      }
      return {...t, isSelected: false};
    });
    saveTodosToLocalStorage(updatedTodos);
    return {todos: updatedTodos};
  });
};

const setCompleteTask = (set: SetState, tId: string, ItemId: string) => {
  set(state => {
    return {
      todos: state.todos.map(_t => {
        if (tId === _t.id) {
          return {
            ..._t,
            items: _t.items.map((_i: any) => {
              if (_i.id === ItemId) {
                return {..._i, pending: 'done'};
              }
              return _i;
            }),
          };
        }
        return _t;
      }),
    };
  });
};

const setDeleteTodo = (
  set: (callback: (state: StoreState) => void) => void,
  tId: string,
) => {
  set(state => {
    const updatedTodos = state.todos.filter(_t => _t.id !== tId);
    saveTodosToLocalStorage(updatedTodos);
    return {todos: updatedTodos};
  });
};

const setEditTodo = (
  set: (callback: (state: StoreState) => void) => void,
  id: string,
  todo: Partial<ITodo>,
) =>
  set(state => {
    const todos = state.todos.map(_t => {
      if (_t.id === id) {
        const updatedTodo = {..._t};
        for (const key in todo) {
          if (key in _t) {
            updatedTodo[key] = todo[key];
          }
        }
        if ('v' in _t) {
          updatedTodo.v = (_t.v ?? 0) + 1;
        }
        return updatedTodo;
      }
      return _t;
    });
    saveTodosToLocalStorage(todos);
    return {todos};
  });

const getLocalStorage = async (key: string): Promise<any> => {
  const value = await AsyncStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};
const saveTodosToLocalStorage = async (todos: ITodo[]) => {
  try {
    await AsyncStorage.setItem('todos', JSON.stringify(todos));
  } catch (error) {
    console.error('Failed to save todos to local storage', error);
  }
};

const useStoreTodo = create<any>(
  persist<any>(
    set => ({
      todos: [],
      editTodo: (id: string, todo: ITodo) => setEditTodo(set, id, todo),
      deleteTodo: (tId: string) => setDeleteTodo(set, tId),
      createNewTodo: (item: ITodo) => setCreateNewTodo(set, item),
      selectCurrentTodo: (todoId: string) => setSelectCurrentTodo(set, todoId),
      completeTask: () => (tId: string, ItemId: string) =>
        setCompleteTask(set, tId, ItemId),
      initializeTodos: async () => {
        const todos = (await getLocalStorage('todos')) ?? [];
        set({todos});
      },
    }),
    {
      name: 'my-store',
      getStorage: () => AsyncStorage,
    },
  ),
);
export default useStoreTodo;
