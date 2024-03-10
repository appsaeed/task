
export default function Moon(props: React.SVGProps<SVGSVGElement>) {
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
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
    )
}
