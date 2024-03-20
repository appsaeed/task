import { Action, NotifyType } from "../app/types";

export const NOTIFY_TOKEN_ADD = "notify-token-add";
export const NOTIFY_TOKEN_UPDATE = "notify-token-update";


export function notifyTokenAdd(token: string) {
    return {
        type: NOTIFY_TOKEN_ADD,
        payload: token
    }
}

export function notifyTokenUpdate(token: string) {
    return {
        type: NOTIFY_TOKEN_UPDATE,
        payload: token
    }
}

const initState: NotifyType = {
    // token: localStorage.getItem('notification_token'),
    token: null
}

export const notifyReducer = (state = initState, action: Action): NotifyType => {

    switch (action.type) {

        //add new todo in todo list
        case NOTIFY_TOKEN_ADD:
            return {
                ...state,
                token: action.payload
            }


        case NOTIFY_TOKEN_UPDATE:
            return {
                ...state,
                token: action.payload
            }

        default:
            return state
    }
}
