
import { useEffect, useRef } from "react";
import { cn } from "../app/utiles";
import './image.css';

export type Props = React.ImgHTMLAttributes<HTMLImageElement>;

export default function Image({ className, ...props }: Props) {


    const img = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        //create ovserver instance of ovserver to display the image
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove("image-blurr");
                    observer.unobserve(entry.target);
                }
            });
        });

        //check if the image is url loaded
        if (img.current) {
            const image = img.current;
            image.addEventListener("load", () => {
                if (image.complete && image.naturalHeight) {
                    observer.observe(image);
                }
            });

            return () => {
                observer.unobserve(image);
            }
        }

        return () => {
            observer?.disconnect();
        }
    }, []);

    return (
        <img ref={img}  {...props} loading="lazy" className={cn('image-blurr', className)} />
    );
}