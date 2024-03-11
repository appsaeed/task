import { Link } from "react-router-dom";
import Image from "../components/Image";

interface Props {
    href: string;
    logo?: string;
}
export default function BrandLogo({ href, logo }: Props) {
    return (
        <Link to={href} className="flex items-center">
            <Image src={logo} alt="logo" className="h-8 mr-3" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white max-sm:text-xl">{import.meta.env.VITE_NAME || "Saeed"}</span>
        </Link>
    );
}