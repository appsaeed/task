import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiTrash } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { TodoType } from "../../../app/types";
import { cn, timeago } from "../../../app/utiles";
import ButtonCircleColor from "../../../components/buttons/ButtonCircleColor";
import { todoColorSelect, todoCompleteToggle, todoDelete } from "../redux/actions";

export default function Todo(todo: TodoType) {
    const dispatch = useDispatch();
    const { title, id: todo_id, completed, color, datetime } = todo;
    const [expand, setExpand] = useState(false);

    const groupRef = useRef<HTMLDivElement>(null)

    const handleClick = (key: 'red' | 'green' | 'yellow') => {
        dispatch(todoColorSelect(todo_id, key))
    }

    return (
        <div
            className={cn("relative flex items-center px-3 py-1 my-1 text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white space-x-4 cursor-pointer")}
        >
            <div
                onClick={() => dispatch(todoCompleteToggle(todo_id))}
                className={cn("absolute rounded-full border-2 w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2 cursor-pointer focus-within:border-green-500 border-gray-400 left-3 top-2",
                    {
                        "border-green-400": completed,
                    }
                )}
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
            <div
                onClick={() => setExpand(!expand)}
                className={cn("ms-3 pl-4 transition-all text-bases w-28  min-w-72",
                    {
                        "line-through": completed,
                        "truncate": !expand

                    })}>{title}</div>

            {<span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">
                {timeago(datetime)}
            </span>}

            <div
                className={cn('flex space-x-3 absolute transition-all right-3')}
                ref={groupRef}
            >

                {/* <ShowColorGroup
                    color={color}
                    todo_id={todo_id}
                    showGroup={showGroup}
                    setGroup={() => setGroup(true)}
                /> */}

                {/* <SlClose
                    className="w-4 h-4 text-gray-800 cursor-pointer"
                    onClick={() => dispatch(todoDelete(todo_id))}
                /> */}
                <Dropdown>
                    <DropdownItem onClick={() => dispatch(todoDelete(todo_id))}>
                        <FiTrash className="mr-1" /> <span className="">Delete</span>
                    </DropdownItem>
                    <DropdownItem>
                        <ButtonCircleColor
                            color='green'
                            checked={color === 'green'}
                            onClick={() => handleClick('green')}
                        />
                        <ButtonCircleColor
                            color='yellow'
                            checked={color === 'yellow'}
                            onClick={() => handleClick('yellow')}
                        />
                        <ButtonCircleColor
                            color='red'
                            checked={color === 'red'}
                            onClick={() => handleClick('red')}
                        />
                    </DropdownItem>
                </Dropdown>
            </div>
        </div>
    )
}






interface DropdownProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
    header?: React.ReactNode;
}
export function Dropdown({ ...props }: DropdownProps) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
            return false;
        };

        document.addEventListener("click", handleClickOutside);

        return () => document.removeEventListener("click", handleClickOutside);
    }, [open]);

    function handleMenuOpen() {
        setOpen((p) => !p)
    }

    return (
        <div className="relative">
            <div ref={dropdownRef} {...props} className={cn("w-full h-full m-0 p-0 border-0 outline-none", props.className)}
                onClick={handleMenuOpen}
            >
                <BsThreeDotsVertical className="text-slate-400" />
            </div>
            <div
                className={cn('z-50  md:ml-6 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 transition-all duration-100 absolute right-0 top-full opacity-0 invisible translate-x-[60px] translate-y-0',
                    { "opacity-100 visible translate-x-0": open })}

            >
                <ul className="py-2">
                    {props.children}
                </ul>
            </div>
        </div>)
}






interface DropdownItemProps extends React.LiHTMLAttributes<HTMLLIElement> { }
export function DropdownItem({ ...props }: DropdownItemProps) {
    return (
        <li {...props} className={cn("flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white")}>
            {props.children}
        </li>
    )
}