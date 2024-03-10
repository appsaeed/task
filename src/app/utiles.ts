import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { TodoType } from "./types";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}



//get todo from local storage 
export function getTodoStore(): TodoType[] {
    try {
        const data = JSON.parse(localStorage.getItem('todos') || "{}");
        if (data && typeof data === 'object' && Array.isArray(data)) return data;
    } catch (error) {
        return [];
    }

    return [];
}


export const nextTodo = (arr: TodoType[]) => {
    const maxid = arr.reduce((maxId, todo) => Math.max(todo.id, maxId), -1);
    return maxid + 1;
}



//make item pritty look like todo, tood no 
export const grammarlyItem = (count: number, items: [string, string, string | undefined]) => {

    switch (count) {
        case 0:
            return items[2] ? items[2] : 'Empty';
        case 1:
            return count + ' ' + items[0]
        default:
            return count + ' ' + items[1]
    }
}