import { useDispatch } from "react-redux";
import { grammarlyItem } from "../../../app/utiles";
import useTodoFilter from "../../../hooks/useTodoFilter";
import useTodos from "../../../hooks/useTodos";
import { todoFilterColorChange, todoFilterStatusChange } from "../redux/actions";


export default function TodoFooter() {

    //calculate left task from todos 
    const dispatch = useDispatch();
    const filters = useTodoFilter();
    const todos = useTodos();
    const left_todo = todos.filter((todo) => !todo.completed);

    //color changed
    const handleColorChange = (color: 'red' | 'yellow' | 'green') => {
        if (filters.colors.includes(color)) {
            dispatch(todoFilterColorChange(color, "remove"))
        } else {
            dispatch(todoFilterColorChange(color, 'add'))
        }
    }

    return (
        <div className="mt-4 flex justify-between text-xs text-gray-500">
            <p>{grammarlyItem(left_todo?.length, ['task', 'tasks', 'No task'])} left of {todos?.length}</p>
            <ul className="flex space-x-1 items-center text-xs">
                <li onClick={() => dispatch(todoFilterStatusChange('all'))} className={`cursor-pointer hover:underline ${filters.status === 'all' && 'font-bold'}`}>All</li>
                <li>|</li>
                <li onClick={() => dispatch(todoFilterStatusChange('in_complete'))} className={`cursor-pointer hover:underline ${filters.status === 'in_complete' && 'font-bold'}`}>Incomplete</li>
                <li>|</li>
                <li onClick={() => dispatch(todoFilterStatusChange('complete'))} className={`cursor-pointer hover:underline ${filters.status === 'complete' && 'font-bold'}`}>Complete</li>
                <li />
                <li />
                <li onClick={() => handleColorChange('green')} className={`h-3 w-3 border-2 border-green-500 md:hover:bg-green-500 rounded-full cursor-pointer ${filters?.colors?.includes('green') && 'bg-green-600'}`} />
                <li onClick={() => handleColorChange('red')} className={`h-3 w-3 border-2 border-red-500 md:hover:bg-red-500 rounded-full cursor-pointer ${filters?.colors?.includes('red') && 'bg-red-600'}`} />
                <li onClick={() => handleColorChange('yellow')} className={`h-3 w-3 border-2 border-yellow-500 md:hover:bg-yellow-500 rounded-full cursor-pointer ${filters?.colors?.includes('yellow') && 'bg-yellow-600'}`} />
            </ul>
        </div>
    )
}