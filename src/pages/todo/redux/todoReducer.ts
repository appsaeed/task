
import { TodoFilterType, TodoType } from "../../../app/types";
import { getTodoStore, nextTodo } from "../../../app/utiles";
import { TODO_ADD, TODO_COLOR_SELECT, TODO_COMPLETE_ALL, TODO_COMPLETE_ALL_CLEAR, TODO_COMPLETE_TOGGLE, TODO_DELETE, TODO_FILTER_COLOR_CHANGE, TODO_FILTER_STATUS_CHANGE, } from "./actions";



type Action = {
    type: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload: any
}



export const todoListReducer = (state = getTodoStore(), action: Action): TodoType[] => {

    switch (action.type) {

        //add new todo in todo list
        case TODO_ADD:

            return [
                ...state,
                {
                    id: nextTodo(state),
                    title: action.payload,
                    color: '',
                    completed: false,
                    datetime: action.payload?.time || Date.now() + (1000 * 60 * 30),
                    notifyAt: Date.now(),
                    notify_count: 0,
                }
            ];

        //fetch todos from api

        case 'fetch-todos':

            return [
                ...action.payload
            ]

        //toggle todo in todo list
        case TODO_COMPLETE_TOGGLE:

            return state.map(todo => {

                if (todo.id !== action.payload) {
                    return todo;
                }

                return {
                    ...todo,
                    completed: !todo.completed,
                }

            })

        case TODO_COLOR_SELECT:

            // eslint-disable-next-line no-case-declarations
            const { todo_id, color } = action.payload;

            return state.map(todo => {

                if (todo.id === todo_id) {
                    const todo_color = color === todo?.color ? '' : color;
                    return {
                        ...todo,
                        color: todo_color
                    };
                }

                return todo;
            })


        case TODO_DELETE:

            return state.filter(todo => todo.id !== action.payload);

        case TODO_COMPLETE_ALL:

            return state.map(todo => {
                return { ...todo, completed: true }
            })


        case TODO_COMPLETE_ALL_CLEAR:

            return state.map(todo => {
                return { ...todo, completed: false }
            })

        default:
            return state
    }
}


/**
 * create todo filter reducer function
 * =================================================================
 * 
 * 
 */
const filterInitState: TodoFilterType = {
    status: 'all',
    colors: []
}

export const todoFilterReducer = (state = filterInitState, action: Action): TodoFilterType => {

    switch (action.type) {

        case TODO_FILTER_STATUS_CHANGE:

            return {
                ...state,
                status: action.payload
            }


        case TODO_FILTER_COLOR_CHANGE:


            if (action.payload.changedType === 'add') {
                return {
                    ...state,
                    colors: [
                        ...state.colors,
                        action.payload.color
                    ]
                }
            } else if (action.payload.changedType === 'remove') {
                return {
                    ...state,
                    colors: state.colors.filter(c => c !== action.payload.color)
                }
            }

            return state

        default:
            return state
    }
}


export default {
    todos: todoListReducer,
    todo_filter: todoFilterReducer
}