export type TodoType = {
    title: string,
    id: number,
    completed: boolean,
    color: string,
    datetime?: number,
    notifyAt?: number,
    notify_count?: number,
}

export type TodoFilterType = {
    status: "all" | 'complete' | 'in_complete',
    colors: string[]
}

export type User = {
    name: string,
    email: string
    user_id: string | number
    image_url?: string
}