import { avatar } from "appmon/generate";
import { User } from "../app/types";
import { cn } from "../app/utiles";
import Image from "./Image";

type Props = {
    user?: User;
}
export default function Profile({ user }: Props) {

    if (!user) {
        return (
            <div className={cn("relative w-9 h-9 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600")}>
                <svg className="absolute w-12 h-12 text-gray-400 -left-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
            </div>
        )
    }

    const image_url = user.image_url || avatar(user?.name);
    return (
        <Image className="w-8 h-8 rounded-full p-1 ring-2 ring-gray-300 dark:ring-gray-500" src={image_url} alt="user photo" />
    )
}
