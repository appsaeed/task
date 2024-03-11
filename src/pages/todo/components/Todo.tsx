import { useState } from "react";
import { SlClose } from "react-icons/sl";
import { useDispatch } from "react-redux";
import { TodoType } from "../../../app/types";
import { cn } from "../../../app/utiles";
import { todoColorSelect, todoCompleteToggle, todoDelete } from "../redux/actions";

export default function Todo(todo: TodoType) {
    const dispatch = useDispatch();
    const { title, id: todo_id, completed, color } = todo;
    const [expand, setExpand] = useState(false);

    return (
        <div
            className={cn("relative flex items-center px-3 py-1 my-1 text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white space-x-4 cursor-pointer")}
        >
            <div
                onClick={() => dispatch(todoCompleteToggle(todo_id))}
                className={cn("absolute rounded-full border-2 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 cursor-pointer focus-within:border-green-500 border-gray-400 left-3 top-1.5",
                    {
                        "border-green-400": completed,
                    })}
            >
                {completed && (
                    <svg
                        className="fill-current w-3 h-3 text-green-500 pointer-events-none"
                        viewBox="0 0 20 20"
                    >
                        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                    </svg>
                )}
            </div>
            <div onClick={() => setExpand(!expand)} className={cn("ms-3 pl-4 transition-all text-base w-28 max-w-72",
                {
                    "line-through": completed,
                    "truncate": !expand

                })}>{title}</div>


            {/* <span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">
                Popular
            </span> */}

            <div className="flex space-x-3 absolute right-4 top-2">
                <div className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer border-green-400 hover:bg-green-500 ${color === 'green' && 'bg-green-600'}`} onClick={() => dispatch(todoColorSelect(todo_id, 'green'))}></div>

                <div className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer border-yellow-400 hover:bg-yellow-500 ${color === 'yellow' && 'bg-yellow-600'}`} onClick={() => dispatch(todoColorSelect(todo_id, 'yellow'))}></div>

                <div className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer border-red-400 hover:bg-red-500 ${color === 'red' && 'bg-red-600'}`} onClick={() => dispatch(todoColorSelect(todo_id, 'red'))}></div>

                <SlClose className="w-4 h-4 text-gray-800 cursor-pointer" onClick={() => dispatch(todoDelete(todo_id))} />
                {/* <img
                    src={cancelImage}
                    className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
                    alt="Cancel"
                    onClick={() => dispatch(todoDelete(todo_id))}
                /> */}
            </div>
        </div>
    )
}