import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { GiNotebook } from "react-icons/gi";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { addTodo, todoCompleteAll, todoCompleteAllClear } from "../redux/actions";

export default function TodoHeader() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function formSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (title) {
            dispatch(addTodo(title))
            setTitle('')
        }
        return void 0;
    }

    return (
        <div>
            <form
                onSubmit={formSubmit}
                className="flex items-center relative"
            >
                <input type="text" name="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500  w-full py-2 px-12 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white outline-none" placeholder="Type your task..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <GiNotebook className="text-gray-800 w-6 h-6 absolute left-2" />

                <button
                    title="Click to add new Task"
                    type="submit"
                    className={`appearance-none w-6 h-6 bg-no-repeat bg-contain absolute right-2 top-1`}
                >
                    <CiCirclePlus className="w-6 h-8 text-gray-900" />

                </button>
            </form>
            <ul className="flex justify-between my-4 text-xs text-gray-500">
                <li
                    onClick={() => dispatch(todoCompleteAll())}
                    className="flex space-x-1 cursor-pointer"
                    title="Complete all tasks"
                >
                    <span>Complete All Tasks</span>
                    <IoCheckmarkDoneSharp className="w-4 h-4 text-green-600" />
                </li>
                <li
                    onClick={() => dispatch(todoCompleteAllClear())}
                    className="cursor-pointer"
                    title="Clear all completed tasks"
                >
                    Clear completed
                </li>
            </ul>
        </div>
    );
}