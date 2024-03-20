import { ref, set } from "firebase/database";
import { MiddlewareAPI } from "redux";
import { NotifyType } from "../../../app/types";
import { database } from "../../../firebase";
import { notifyReducer } from "../../../redux/notifyStore";
import { TodoType } from "../todo";
import { todoListReducer } from "./todoReducer";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Store = MiddlewareAPI<any, any>;
type Next = (action: unknown) => void;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const saveTodoStorage = (store: Store) => (next: Next) => (action: any) => {

    //get prevous state
    const todos_state: TodoType[] = store.getState()['todos'];
    const notify_state: NotifyType = store.getState()['notify']

    const todos_next = [action].reduce(todoListReducer, todos_state);
    const notify_next: NotifyType = [action].reduce(notifyReducer, notify_state);

    const notify_token = notify_next.token;

    //get next state 

    localStorage.setItem('todos', JSON.stringify(todos_next))
    localStorage.setItem('notification_token', String(notify_next.token))

    try {

        set(ref(database, 'todos/' + notify_token), todos_next)

    } catch (error) {
        console.log('Error in redux middleware: ', error)
    }

    //pass next middleware
    return next(action)

}