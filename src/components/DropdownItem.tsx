import { Link } from "react-router-dom";
import { cn } from "../app/utiles";

interface DropdownItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
    name: string;
    link?: string;
}
export default function DropdownItem({ link, name = 'name', ...props }: DropdownItemProps) {
    return (
        <li {...props} className={cn("block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white", props.className)}>
            {
                link
                    ?
                    <Link to={link} className=" block overflow-hidden w-full">
                        {props.children ? props.children : name}
                    </Link>
                    : props.children ? props.children : name
            }

        </li>
    )
}