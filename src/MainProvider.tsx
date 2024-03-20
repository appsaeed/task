import { errorToString } from "appmon/convert";
import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import settings from "./app/settings";
import { pushSubscribe } from "./app/utiles";
import useNotify from "./hooks/useNotify";
import { notifyTokenUpdate } from "./redux/notifyStore";

export default function MainProvider({ children }: { children: ReactNode }) {
    const notify = useNotify();
    const dispatch = useDispatch();

    useEffect(() => {
        const worker_path = settings.url + '/push.js';
        if (!notify.token) {
            pushSubscribe(worker_path)
                .then((token) => dispatch(notifyTokenUpdate(token)))
                .catch((err) => toast.error(errorToString(err)));
        }
    }, []);

    return (
        <>
            {children}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                pauseOnHover
                theme={settings.theme}
            />
        </>
    );
}
