import { setThemeStore } from "appmon/storage";
import { adslash } from "appmon/url";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import settings from "../app/settings";
import { cn } from "../app/utiles";
import Image from "../components/Image";
import Moon from "../components/Moon";
import Sun from "../components/Sun";
import BrandLogo from "./BrandLogo";

export default function Header() {

    const [isMobileMenu, setMobileMenu] = useState(false);
    const [dropdown, setDropdown] = useState(false);
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
        <header id="header" className={cn(`transition-all z-[999] top-0 left-0 right-0 w-full bg-slate-200 dark:bg-slate-800 shadow-2xl  fixed`, {
            'fixeds py-3': fixed,
            'py-4': !fixed
        })}>
            <nav className={'w-full px-8'}>
                <div className="w-full flex flex-wrap items-center justify-between mx-auto">

                    <BrandLogo />

                    <SwtichTheme />

                    <div className="flex items-center md:order-2">
                        <div
                            className=" relative cursor-pointer mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 w-8 h-8"


                        >
                            <button className="w-full h-full m-0 p-0 border-0 outline-none" onClick={() => setDropdown(!dropdown)} onBlur={() => setDropdown(false)}>
                                <Image className="w-8 h-8 rounded-full max-sm:hidden" src={'/logo.png'} alt="user photo" />
                            </button>
                            <div
                                className={cn('z-50  md:ml-6 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 transition-all duration-100 absolute right-0 top-full opacity-0',

                                    {

                                        "opacity-100 visible translate-x-0": dropdown,
                                        "opacity-0 invisible translate-x-[60px] translate-y-0": !dropdown
                                    })}

                            >
                                <div className="px-4 py-3">
                                    <span className="block text-sm text-gray-900 dark:text-white">{'Saeed'}</span>
                                    <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{'appsaed7@gmail.com'} </span>
                                </div>
                                <ul className="py-2" aria-labelledby="user-menu-button">
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                            Dashboard
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                            Settings
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                            Earnings
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                            Sign out
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false" onClick={() => setMobileMenu(!isMobileMenu)} onBlur={() => setMobileMenu(false)}>
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                    <div className={cn(`items-center justify-between w-full md:flex md:w-auto md:order-1 transition-all `,
                        {
                            "max-sm:opacity-100 max-sm:visible": isMobileMenu,
                            "max-sm:opacity-0 max-sm:h-0 max-sm:invisible": !isMobileMenu
                        }
                    )} id="navbar-user">
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  max-md:bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:bg-gray-800 max-md:dark:bg-gray-900 max-sm:dark:border-gray-700">

                            <MenuList name="Home" />
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

type MenuListProps = {
    index?: number;
    name: string;
};
export function MenuList({ name }: MenuListProps) {
    return (
        <li>
            <Link to={adslash(settings.url) + `#${name}`} className={`block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 capitalize`}>
                {name}
            </Link>
        </li>
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