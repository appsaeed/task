
export default function TestPage() {
    return (
        <div className="w-[400px]">
            <div>token: {localStorage.getItem('notify_token')}</div>
            <button onClick={() => localStorage.removeItem('notify_token')} className="">clear token</button>
        </div>
    )
}
