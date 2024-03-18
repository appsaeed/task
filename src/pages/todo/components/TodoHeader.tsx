import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { GiNotebook } from "react-icons/gi";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { addTodo, todoCompleteAll, todoCompleteAllClear } from "../redux/actions";

export default function TodoHeader() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [datetime, setDatetime] = useState('') // '2024-03-18T00:40'

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function formSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        let makeTime = Date.now() + (60000 * 60);
        if (datetime && datetime != '') {
            makeTime = (new Date(datetime)).getTime();
        }

        console.log((new Date(makeTime).toLocaleString()));

        if (title) {
            dispatch(addTodo({
                title: title,
                datetime: makeTime,
            }))
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
                <GiNotebook className="text-gray-800 w-6 h-6 absolute left-2" />
                <input type="text" name="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500  w-full py-2 px-12 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white outline-none" placeholder="Type your task..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <div className="flex gap-1 absolute right-2 top-1.5 h-full">
                    <div>
                        <button
                            title="Click to add new Task"
                            type="submit"
                            className={`appearance-none w-6 h-6 bg-no-repeat bg-contain  right-2 top-1`}
                        >
                            <CiCirclePlus className="w-full h-full text-gray-900" />
                        </button>
                    </div>
                    <div className="w-5 cursor-pointer relative">
                        {/* <CiClock2 className="w-full h-full absolute" /> */}
                        <input value={datetime} onChange={(e) => setDatetime(e.target.value)} type="datetime-local" className="bg-transparent w-full cursor-pointer outline-none border-0 dark:text-white" />
                    </div>
                </div>
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