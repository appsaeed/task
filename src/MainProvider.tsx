import { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { pushSubscribe } from './app/utiles';
import useNotify from './hooks/useNotify';
import { notifyTokenUpdate } from './redux/notifyStore';

export default function MainProvider({ children }: { children: ReactNode }) {


    const notify = useNotify();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!notify.token) {
            console.log('loading new notification token')
            pushSubscribe(function (token) {
                if (token) dispatch(notifyTokenUpdate(token));
            })
        }
    }, [])

    return children;
}
