import { setThemeStore } from "appmon/storage";
import { useEffect, useState } from "react";
import settings from "../app/settings";
import { cn } from "../app/utiles";
import Dropdown from "../components/Dropdown";
import DropdownHeader from "../components/DropdownHeader";
import DropdownItem from "../components/DropdownItem";
import Moon from "../components/Moon";
import Sun from "../components/Sun";
import BrandLogo from "./BrandLogo";

export default function Header() {

    const [fixed, setFixed] = useState(false);

    useEffect(() => {

        function scrollToFixed() {
            if (document.documentElement.scrollTop > 100) {
                setFixed(true);
            } else {
                setFixed(false);
            }
        }

        scrollToFixed();

        //page scroll event fire
        window.addEventListener("scroll", scrollToFixed);

        return () => {
            //clear scoll event listener
            window.removeEventListener("scroll", scrollToFixed);
        };
    }, [])

    return (
        <header id="header" className={cn(`transition-all z-[999] top-0 left-0 right-0 w-full bg-slate-200 dark:bg-slate-800 shadow-2xl  fixed py-4`, {
            'py-2.5': fixed
        })}>
            <nav className={'w-full px-8'}>
                <div className="w-full flex flex-wrap items-center justify-between mx-auto">

                    <BrandLogo logo={settings.logo} href="/" />

                    <SwtichTheme />

                    <div className="flex items-center md:order-2">
                        <div className="relative cursor-pointer mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 w-8 h-8">
                            <Dropdown header={<DropdownHeader />}>
                                <DropdownItem name="Tokenization" link="/tokenization" />
                                <DropdownItem name="Settings" />
                                <DropdownItem name="Earnings" />
                                <DropdownItem name="Sign out" />
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}


export function SwtichTheme() {

    const [dark, setDark] = useState(settings.theme === "dark");

    const handleTheme = () => {
        const theme = dark ? "light" : "dark";
        setDark(!dark);
        setThemeStore(theme, settings.theme_key);
        if (theme === 'dark') {
            document.documentElement.classList.remove('light');
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <div onClick={handleTheme} className={`block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent cursor-pointer text-2xl`}>
            {dark ? <Moon /> : <Sun />}
        </div>
    );
}