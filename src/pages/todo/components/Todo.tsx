import { useEffect, useRef, useState } from "react";
import { SlClose } from "react-icons/sl";
import { useDispatch } from "react-redux";
import { TodoType } from "../../../app/types";
import { cn } from "../../../app/utiles";
import ButtonCircleColor from "../../../components/ButtonCircleColor";
import { todoColorSelect, todoCompleteToggle, todoDelete } from "../redux/actions";

export default function Todo(todo: TodoType) {
    const dispatch = useDispatch();
    const { title, id: todo_id, completed, color } = todo;
    const [expand, setExpand] = useState(false);
    const [groupBtns, setGroupBtns] = useState(false);

    const groupRef = useRef<HTMLDivElement>(null)

    useEffect(() => {

        function hideTodoColors(event: Event) {

            if (groupRef.current && !groupRef.current.contains(event.target as Node)) {
                setGroupBtns(false);
            }
        }
        document.body.addEventListener('click', hideTodoColors)

        return () => {
            document.body.removeEventListener('click', hideTodoColors);
        }

    }, [])

    return (
        <div
            onDoubleClick={() => setGroupBtns(true)}
            className={cn("relative flex items-center overflow-hidden px-3 py-1 my-1 text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white space-x-4 cursor-pointer")}
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
                className={cn("ms-3 pl-4 transition-all text-base w-28 max-w-72",
                    {
                        "line-through": completed,
                        "truncate": !expand

                    })}>{title}</div>


            {/* <span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">
                Popular
            </span> */}

            <div
                ref={groupRef}
                className={cn('flex space-x-3 absolute transition-all right-3')}
            >

                {groupBtns
                    ? <ColorButtonGroup color={color} todo_id={todo_id} />
                    : <ButtonCircleColor color={color} todoColor={color} />
                }
                <SlClose
                    className="w-4 h-4 text-gray-800 cursor-pointer"
                    onClick={() => dispatch(todoDelete(todo_id))}
                />
            </div>
        </div>
    )
}


export function ColorButtonGroup({ todo_id, color }: { color: string, todo_id: number }) {
    const dispatch = useDispatch();

    return (<>
        <ButtonCircleColor
            todoColor={color}
            color="green"
            onClick={() => dispatch(todoColorSelect(todo_id, 'green'))}
        />

        <ButtonCircleColor
            todoColor={color}
            color="yellow"
            onClick={() => dispatch(todoColorSelect(todo_id, 'yellow'))}
        />
        <ButtonCircleColor
            todoColor={color}
            color="red"
            onClick={() => dispatch(todoColorSelect(todo_id, 'red'))}
        />
    </>)
}