import { useState } from "react";
import { useDispatch } from "react-redux";
import { pushSubscribe } from "../app/utiles";
import useNotify from "../hooks/useNotify";
import { notifyTokenUpdate } from "../redux/notifyStore";

export default function Tokenization() {

    const [loading, setLoading] = useState(false)

    const notify = useNotify();
    const dispatch = useDispatch();

    function updateToken() {
        setLoading(true)
        pushSubscribe(function (token) {
            if (token) dispatch(notifyTokenUpdate(token));
        }).finally(() => setLoading(false));
    }

    return (
        <div className="mx-10 my-20">
            <div className="my-10">
                <div className="font-bold mb-6 text-center">Token</div>
                <span className=" break-words">{notify.token}</span>
            </div>
            <div className="flex justify-center">
                <button disabled={loading} onClick={updateToken} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Generate Token</button>
            </div>
            <div className="flex justify-center my-2">{loading && "Loading..."}</div>
        </div>
    )
}
