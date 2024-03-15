
export type Action = {
    type: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload: any
}
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

export type NotifyType = {
    token: string | null
}