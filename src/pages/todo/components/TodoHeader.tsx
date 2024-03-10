import { useState } from "react";
import { useDispatch } from "react-redux";
import double_tick from "../images/double-tick.png";
import note from "../images/notes.png";
import plus from "../images/plus.png";
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
                <img src={note} className="w-6 h-6 absolute left-2" alt="Add todo" />

                <button
                    type="submit"
                    className={`appearance-none w-6 h-6 bg-no-repeat bg-contain absolute right-2`}
                    style={{
                        backgroundImage: `url(${plus})`,
                    }}
                />
            </form>
            <ul className="flex justify-between my-4 text-xs text-gray-500">
                <li
                    onClick={() => dispatch(todoCompleteAll())}
                    className="flex space-x-1 cursor-pointer"
                >
                    <span>Complete All Tasks</span>
                    <img className="w-4 h-4" src={double_tick} alt="Complete" />
                </li>
                <li
                    onClick={() => dispatch(todoCompleteAllClear())}
                    className="cursor-pointer"
                >
                    Clear completed
                </li>
            </ul>
        </div>
    );
}