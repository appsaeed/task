import useTodoFilter from "../../../hooks/useTodoFilter";
import useTodos from "../../../hooks/useTodos";
import { TodoType } from "../todo";
import Todo from "./Todo";


export default function Todos() {

    const todos = useTodos();
    const filters = useTodoFilter();


    //filter by status
    const filterByStatus = (todo: TodoType) => {
        switch (filters.status) {
            case 'complete':

                return todo.completed;

            case 'in_complete':

                return !todo.completed

            default:
                return true;
        }
    }

    //filter by colors 
    const filterByColors = (todo: TodoType) => {

        const { colors } = filters;

        if (colors.length > 0) {
            return colors.includes(todo?.color)
        }

        return true;
    }

    return (
        <div className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto overflow-hidden">
            {todos
                .filter(filterByStatus)
                .filter(filterByColors).sort((a, b) => b.id - a.id)
                .map((todo, k) => (
                    <Todo {...todo} key={k} />
                ))}

        </div>
    );
}