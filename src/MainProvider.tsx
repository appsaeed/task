import { ReactNode, useEffect } from 'react';
import settings from './app/settings';
import { urlBase64ToUint8Array } from './app/utiles';

export default function MainProvider({ children }: { children: ReactNode }) {

    useEffect(() => {

        Notification.requestPermission().then(function (permission) {

            if (permission === 'granted') {

                const serviceWorker = settings.url + '/worker.js';

                if ("serviceWorker" in navigator) {
                    //register service worker
                    navigator.serviceWorker.register(serviceWorker).then((register) => {

                        //register subscription
                        register.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: urlBase64ToUint8Array('BNt0ygqWTSXEd9AJ_Vv2e0jaK73vAjCykOD58lXwinRrnkpwX0lN1cGETwjS10Tvby3d9fDSNZMy6ZdA4xmA30U')
                        }).then(subscription => {

                            const token = btoa(JSON.stringify(subscription));

                            localStorage.setItem('notify_token', token)

                        })

                    }).catch(e => console.error(e))

                }

            } else {
                alert('Your notification is not allowed please check permissions')
            }
        })
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
