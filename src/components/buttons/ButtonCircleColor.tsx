import { cn } from "../../app/utiles";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color?: string,
    checked?: boolean
}

export default function ButtonCircleColor({ color, checked, ...props }: Props) {
    const colour: string = (color && color != "") ? color : 'neutral';
    const colors: { [key: string]: string } = {
        "red": cn("border-red-400 hover:bg-red-500", { "bg-red-600": checked }),
        "green": cn("border-green-400 hover:bg-green-500", { "bg-green-600": checked }),
        "yellow": cn("border-yellow-400 hover:bg-yellow-500", { "bg-yellow-600": checked }),
        "neutral": cn("border-neutral-400 hover:bg-neutral-500", { "bg-neutral-600": checked }),
    }
    return (
        <button {...props} className={cn(`h-4 w-4 rounded-full border-2 cursor-pointer`, colors[colour])} >

        </button>
    )
}
