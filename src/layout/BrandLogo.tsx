import { Link } from "react-router-dom";
import settings from "../app/settings";
import Image from "../components/Image";


export default function BrandLogo() {
    return (
        <Link to={'/'} className="flex items-center">
            <Image src={settings.logo} alt="logo" className="h-8 mr-3" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white max-sm:text-xl">{import.meta.env.VITE_NAME || "Saeed"}</span>
        </Link>
    );
}