import { useDispatch } from "react-redux";
import ButtonCircleColor from "../../../components/buttons/ButtonCircleColor";
import { todoColorSelect } from "../redux/actions";

type GroupProp = {
    color: string | undefined
    todo_id: number,
    showGroup: boolean,
    setGroup: (a: boolean) => void
}
export function ShowColorGroup({ color, todo_id, showGroup, setGroup }: GroupProp) {
    const dispatch = useDispatch();

    const handleClick = (key: 'red' | 'green' | 'yellow') => {
        dispatch(todoColorSelect(todo_id, key))
    }

    if (!showGroup) {
        return (
            <ButtonCircleColor
                color={color}
                checked={color === color}
                onClick={() => setGroup(true)}
            />
        )
    }

    return (
        <>
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
        </>
    )
}