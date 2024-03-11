import { useEffect, useRef, useState } from "react";
import { User } from "../app/types";
import { cn } from "../app/utiles";
import Profile from "./Profile";

interface DropdownProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
    header?: React.ReactNode;
    user?: User;
}
export default function Dropdown({ header, user, ...props }: DropdownProps) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null); // Use a more descriptive ref name

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
        // if (!user) {
        //     navigate('/login')
        //     return false;
        // }
        setOpen((p) => !p)
    }

    return (
        <>
            <div ref={dropdownRef} {...props} className={cn("w-full h-full m-0 p-0 border-0 outline-none", props.className)} onClick={handleMenuOpen}>
                <Profile user={user} />
            </div>
            <div
                className={cn('z-50  md:ml-6 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 transition-all duration-100 absolute right-0 top-full opacity-0 invisible translate-x-[60px] translate-y-0',
                    { "opacity-100 visible translate-x-0": open })}

            >

                {header && header}

                <ul className="py-2">
                    {props.children}
                </ul>
            </div>
        </>)
}





