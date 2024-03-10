import { MiddlewareAPI } from "redux";
import { todoListReducer } from "./todoReducer";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Store = MiddlewareAPI<any, any>;
type Next = (action: unknown) => void;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const saveTodoStorage = (store: Store) => (next: Next) => (action: any) => {

    //get prevous state
    const todos_state = store.getState()['todos'];

    //get next state 
    const updatedTodos = [action].reduce(todoListReducer, todos_state);

    localStorage.setItem('todos', JSON.stringify(updatedTodos))

    //pass next middleware
    return next(action)

}