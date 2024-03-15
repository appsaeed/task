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
            console.log('loading ')
            pushSubscribe(function (token) {
                if (token) dispatch(notifyTokenUpdate(token));
            })
        }

        // Notification.requestPermission().then(function (permission) {

        //     if (permission === 'granted') {

        //         const serviceWorker = settings.url + '/worker.js';

        //         if ("serviceWorker" in navigator) {
        //             //register service worker
        //             navigator.serviceWorker.register(serviceWorker).then((register) => {

        //                 //register subscription
        //                 register.pushManager.subscribe({
        //                     userVisibleOnly: true,
        //                     applicationServerKey: urlBase64ToUint8Array('BNt0ygqWTSXEd9AJ_Vv2e0jaK73vAjCykOD58lXwinRrnkpwX0lN1cGETwjS10Tvby3d9fDSNZMy6ZdA4xmA30U')
        //                 }).then(subscription => {

        //                     //create token to base64 encode
        //                     const token = btoa(JSON.stringify(subscription));

        //                     dispatch(notifyTokenAdd(token))

        //                     //save to local storage
        //                     localStorage.setItem('notify_token', token)

        //                 })

        //             }).catch(e => console.error(e))

        //         }

        //     } else {
        //         alert('Your notification is not allowed please check permissions')
        //     }
        // })
    }, [])


    // useEffect(() => {
    //     if ('serviceWorker' in navigator) {
    //         navigator.serviceWorker.register('/sw.js')
    //             // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //             .then(_registration => {
    //                 // console.log('Service Worker registered');
    //             })
    //             .catch(error => {
    //                 console.error('Service Worker registration failed:', error);
    //             });
    //     }

    //     navigator.serviceWorker.controller?.postMessage({
    //         type: 'settings',
    //         payload: settings
    //     });
    // })

    return children;
}
