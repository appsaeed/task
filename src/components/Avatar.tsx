import { cn } from "../app/utiles"
import Image from "./Image"

interface Props extends React.HTMLAttributes<HTMLDivElement> {

}
export function AvatarUserI(props: Props) {
    return (
        <div {...props} className={cn("relative w-9 h-9 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600")}>
            <svg className="absolute w-12 h-12 text-gray-400 -left-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
        </div>
    )
}


export function AvatarImage() {
    return (
        <Image className="w-9 h-9 p-1 rounded-full object-contain ring-2 ring-gray-300 dark:ring-gray-500" src="/todo/logo.png" alt="Bordered avatar"></Image>
    )
}