import { ref, set } from "firebase/database";
import { MiddlewareAPI } from "redux";
import { database } from "../../../firebase";
import { todoListReducer } from "./todoReducer";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Store = MiddlewareAPI<any, any>;
type Next = (action: unknown) => void;

const notify_token = localStorage.getItem('notify_token');
const finali_token = notify_token || "base64_" + btoa(navigator.userAgent);
const db_ref = ref(database, 'todos/' + finali_token)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const saveTodoStorage = (store: Store) => (next: Next) => (action: any) => {

    //get prevous state
    const todos_state = store.getState()['todos'];

    //get next state 
    const updatedTodos = [action].reduce(todoListReducer, todos_state);

    localStorage.setItem('todos', JSON.stringify(updatedTodos))

    try {
        set(db_ref, updatedTodos)
    } catch (error) {
        console.log('Error in redux middleware: ', error)
    }

    //pass next middleware
    return next(action)

}