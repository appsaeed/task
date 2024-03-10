import useTodos from "./useTodos";

export default function useTodo(id: number) {
    const todos = useTodos();
    return todos.find(todo => todo.id === id)
}
