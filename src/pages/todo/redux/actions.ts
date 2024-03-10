
export const TODO_ADD = 'TODO_INSERT';
export const TODO_UPDATE = 'TODO_UPDATE';
export const TODO_DELETE = 'TODO_delete';
export const TODO_UPDATE_BULK = 'TODO_UPDATE_BULK';
export const TODO_DELETE_BULK = 'TODO_DELE_BULK';
export const TODO_COLOR_SELECT = 'TODO_COLOR_SELECT';
export const TODO_COMPLETE_TOGGLE = 'TODO_COMPLETE_TOGGLE';
export const TODO_COMPLETE_ALL = 'TODO_COMPLETE_ALL';
export const TODO_COMPLETE_ALL_CLEAR = 'TODO_COMPLETE_ALL_CLEAR';
//todo filter constants
export const TODO_FILTER_STATUS_CHANGE = 'TODO_FILTER_STATUS_CHANGED';
export const TODO_FILTER_COLOR_CHANGE = 'TODO_FILTER_COLOR_CHANGE';

//add todo list
export function addTodo(title: string) {
    return {
        type: TODO_ADD,
        payload: title,
    }
}

//update todo
export function todoUpdate(todo_id: number) {
    return {
        type: TODO_UPDATE,
        payload: todo_id,
    }
}

//delete tood
export function todoDelete(todo_id: number) {
    return {
        type: TODO_DELETE,
        payload: todo_id
    }
}

// bulk delete todo
export function todoDeleteBulk(ids: number[]) {
    return {
        type: TODO_DELETE_BULK,
        payload: ids
    }
}


// todo update bulk
export function todoUpdateBulk(ids: number[]) {
    return {
        type: TODO_UPDATE_BULK,
        payload: ids
    }
}

// todo color selection
export function todoColorSelect(todo_id: number, color: "red" | "green" | "yellow") {
    return {
        type: TODO_COLOR_SELECT,
        payload: { todo_id, color }
    }
}


//todo complete toggle
export function todoCompleteToggle(id: number) {
    return {
        type: TODO_COMPLETE_TOGGLE,
        payload: id,
    }
}


//todo complete all
export function todoCompleteAll() {
    return {
        type: TODO_COMPLETE_ALL
    }
}

//todo complete all clear
export function todoCompleteAllClear() {
    return {
        type: TODO_COMPLETE_ALL_CLEAR
    }
}


//todo filter color change
export function todoFilterColorChange(color: string, changedType: 'add' | 'remove') {
    return {
        type: TODO_FILTER_COLOR_CHANGE,
        payload: { color, changedType }
    }
}

//todo filter status change
export function todoFilterStatusChange(status: "all" | "complete" | 'in_complete') {
    return {
        type: TODO_FILTER_STATUS_CHANGE,
        payload: status
    }
}