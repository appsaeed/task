import { ref, set } from "firebase/database";
import { MiddlewareAPI } from "redux";
import { NotifyType } from "../../../app/types";
import { database } from "../../../firebase";
import { notifyReducer } from "../../../redux/notifyStore";
import { todoListReducer } from "./todoReducer";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Store = MiddlewareAPI<any, any>;
type Next = (action: unknown) => void;

const base64_token = "base64_" + btoa(navigator.userAgent);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const saveTodoStorage = (store: Store) => (next: Next) => (action: any) => {

    //get prevous state
    const todos_state = store.getState()['todos'];
    const notify = store.getState()['notify']
    const notify_state: NotifyType = [action].reduce(notifyReducer, notify);
    const notify_token = notify_state.token || base64_token;

    //get next state 
    const updatedTodos = [action].reduce(todoListReducer, todos_state);

    localStorage.setItem('todos', JSON.stringify(updatedTodos))

    try {
        const db_ref = ref(database, 'todos/' + notify_token)
        set(db_ref, updatedTodos)
    } catch (error) {
        console.log('Error in redux middleware: ', error)
    }

    //pass next middleware
    return next(action)

}