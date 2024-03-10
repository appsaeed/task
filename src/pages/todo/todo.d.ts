export type TodoType = {
    title: string,
    id: number,
    completed: boolean,
    color: string,
}

export type TodoFilterType = {
    status: "all" | 'complete' | 'in_complete',
    colors: string[]
}
