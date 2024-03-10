import { useDispatch } from "react-redux";
import { grammarlyItem } from "../../../app/utils";
import useTodoFilters from "../../../hooks/useTodoFilters";
import useTodos from "../../../hooks/useTodos";
import { colorChanged, statusChanged } from "../reduxs/actions";

export default function Footer() {

    //calculate left task from todos 
    const dispatch = useDispatch();
    const filters = useTodoFilters();
    const todos = useTodos();
    const left_todo = useTodos().filter((todo) => !todo.completed);

    //color changed
    const handleColorChange = (color: 'red' | 'yellow' | 'green') => {
        if (filters.colors.includes(color)) {
            dispatch(colorChanged(color, 'removed'))
        } else {
            dispatch(colorChanged(color, 'added'))
        }
    }

    return (
        <div className="mt-4 flex justify-between text-xs text-gray-500">
            <p>{grammarlyItem(left_todo?.length, ['task', 'tasks', 'No task'])} left of {todos?.length}</p>
            <ul className="flex space-x-1 items-center text-xs">
                <li onClick={() => dispatch(statusChanged('all'))} className={`cursor-pointer hover:underline ${filters.status === 'all' && 'font-bold'}`}>All</li>
                <li>|</li>
                <li onClick={() => dispatch(statusChanged('in_complete'))} className={`cursor-pointer hover:underline ${filters.status === 'in_complete' && 'font-bold'}`}>Incomplete</li>
                <li>|</li>
                <li onClick={() => dispatch(statusChanged('complete'))} className={`cursor-pointer hover:underline ${filters.status === 'complete' && 'font-bold'}`}>Complete</li>
                <li />
                <li />
                <li onClick={() => handleColorChange('green')} className={`h-3 w-3 border-2 border-green-500 md:hover:bg-green-500 rounded-full cursor-pointer ${filters?.colors?.includes('green') && 'bg-green-600'}`} />
                <li onClick={() => handleColorChange('red')} className={`h-3 w-3 border-2 border-red-500 md:hover:bg-red-500 rounded-full cursor-pointer ${filters?.colors?.includes('red') && 'bg-red-600'}`} />
                <li onClick={() => handleColorChange('yellow')} className={`h-3 w-3 border-2 border-yellow-500 md:hover:bg-yellow-500 rounded-full cursor-pointer ${filters?.colors?.includes('yellow') && 'bg-yellow-600'}`} />
            </ul>
        </div>
    )
}
