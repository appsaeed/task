import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import settings from "./settings";
import { TodoType } from "./types";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const worker_path = settings.url + '/push.js';

export function errorToString(error: any): string {

    if (Array.isArray(error)) {
        return String(error.join(' '))
    } else if (typeof error === 'object') {
        return String(JSON.stringify(error))
    }

    return String(error)

}

export function urlBase64ToUint8Array(base64String: string | any[]) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, "+")
        .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
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


export function subscribe(worker_path: string): Promise<string> {
    return new Promise((resolve, reject) => {
        try {

            const subscribe = {
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(import.meta.env.VITE_NOTIFY_PUBLIC_KEY)
            }

            if (!("serviceWorker" in navigator)) {
                reject('Your browser does not support service worker functionality');
            }

            Notification.requestPermission().then((permission) => {

                if (permission !== 'granted') {
                    reject('Your notification is not allowed please check permissions')
                }

                navigator.serviceWorker.register(worker_path).then((worker) => {

                    worker.pushManager.subscribe(subscribe).then((subscription) => {

                        resolve(btoa(JSON.stringify(subscription)));

                    }).catch(reject);

                }).catch(reject);

            }).catch(reject);

        } catch (error) {
            reject(error)
        }
    })
}


export async function pushSubscribe(callback: (token: string) => void) {

    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
        throw ('Your notification is not allowed please check permissions')
    }

    if (!("serviceWorker" in navigator)) {
        throw ('Your notification is not allowed please check permissions');
    }

    const worker_path = settings.url + '/push.js';
    const register = await navigator.serviceWorker.register(worker_path);

    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(import.meta.env.VITE_NOTIFY_PUBLIC_KEY)
    })

    const token = btoa(JSON.stringify(subscription));

    // localStorage.setItem('notification_token', token)
    return callback(token);
}


