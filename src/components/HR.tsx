
export default function HRSeparator(props: React.HTMLAttributes<HTMLHRElement>) {
    return (
        <hr
            {...props}
            className={`${props.className} my-6 sm:border-gray-200 mx-auto sm:dark:border-gray-700 max-sm:border-none `}
        />
    );
}