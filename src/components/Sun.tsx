
export default function Sun(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            strokeWidth={2}
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
            color="currentColor"
            overflow="visible"
            {...props}
        >
            <circle cx={12} cy={12} r={5} />
            <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
    )
}
