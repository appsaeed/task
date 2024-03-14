
export default function Tokenization() {
    const updateTokenization = () => {
        const currentToken = localStorage.getItem('notify_token');
        localStorage.setItem('prevous_token', currentToken || '')
        localStorage.removeItem('notify_token')
        location.reload()
    }
    return (
        <div className="w-full mx-10 my-20">
            <div className="my-10">
                <span className=" font-bold mr-5">Current Token:</span>
                <span className=" ">{localStorage.getItem('notify_token')}</span>
            </div>
            <div className="flex justify-center">
                <button onClick={updateTokenization} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Clear Token and replace new</button>
            </div>
            <div className="my-10">
                <span className=" font-bold mr-5">Prevous Token:</span>
                <span className=" ">{localStorage.getItem('prevous_token')}</span>
            </div>
        </div>
    )
}
