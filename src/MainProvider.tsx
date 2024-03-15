import { getToken } from 'firebase/messaging';
import { ReactNode, useEffect } from 'react';
import settings from './app/settings';
import { messaging } from './firebase';

export default function MainProvider({ children }: { children: ReactNode }) {

    useEffect(() => {

        Notification.requestPermission().then(function (permission) {

            if (permission === 'granted') {

                navigator.serviceWorker.register('/firebase-messaging-sw.js')
                    .then((sw) => getToken(messaging, {
                        serviceWorkerRegistration: sw,
                        vapidKey: "BA5JPPeF4zvv0tMQX_MUS0KwtqE4YFeV2Pkj1casM7JTVtX69AvpQLjHA7MVeBt9SKKjejE_4n5g66Ygp5ZWu7E"
                    }))
                    .then((token) => {

                        if (token) {

                            const local_token = localStorage.getItem('notify_token')

                            if (!local_token) {

                                console.log('token updated to local storage')

                                localStorage.setItem('notify_token', token)
                            }

                        } else {
                            console.log('No registration token available.')
                        }
                    })
                    .catch(err => console.error(err));

            } else {
                alert('Your notification is not allowed please check permissions')
            }
        })
    }, [])


    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                .then(_registration => {
                    // console.log('Service Worker registered');
                })
                .catch(error => {
                    console.error('Service Worker registration failed:', error);
                });
        }

        navigator.serviceWorker.controller?.postMessage({
            type: 'settings',
            payload: settings
        });
    })

    return children;
}
