import { cn } from "../../app/utiles";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color?: string,
    checked?: boolean
}

export default function ButtonCircleColor({ color, checked, ...props }: Props) {
    const colour = (color && color != "") ? color : 'neutral';
    return (
        <button {...props} className={cn(`h-4 w-4 rounded-full border-2 cursor-pointer border-${colour}-400 hover:bg-${colour}-500`,
            {
                [`bg-${colour}-600`]: checked,
            })} >

        </button>
    )
}
