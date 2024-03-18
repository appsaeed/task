import { cn } from "../app/utiles";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color?: string,
    todoColor?: string,
}

export default function ButtonCircleColor(props: Props) {

    const { color, todoColor, ...rest } = props;
    const _color = (color && color != '') ? color : 'violet';
    const colorsString = `border-${_color}-400 hover:bg-${_color}-500`;

    return (
        <button {...rest} className={cn(`h-4 w-4 rounded-full border-2 cursor-pointer`,
            colorsString,
            {
                [`bg-${color}-600`]: todoColor === color,
            })} ></button>
    )
}
