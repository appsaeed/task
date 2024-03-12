import { ref, set } from 'firebase/database';
import { getToken } from 'firebase/messaging';
import { onBackgroundMessage } from 'firebase/messaging/sw';
import { ReactNode, useEffect } from 'react';
import { database, messaging } from './firebase';

export default function MainProvider({ children }: { children: ReactNode }) {

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    const deviceName = isMobile ? 'android' : 'desktop';
    const db_ref = ref(database, 'tokens/' + deviceName)

    useEffect(() => {
        Notification.requestPermission().then(function (permission) {
            if (permission === 'granted') {

                navigator.serviceWorker.register('/todo/firebase-messaging-sw.js')
                    .then((registration) => {

                        return getToken(messaging, {
                            serviceWorkerRegistration: registration,
                            vapidKey: "BA5JPPeF4zvv0tMQX_MUS0KwtqE4YFeV2Pkj1casM7JTVtX69AvpQLjHA7MVeBt9SKKjejE_4n5g66Ygp5ZWu7E"
                        })

                    })
                    .then((token) => {
                        if (token) {
                            set(db_ref, token)
                        } else {
                            console.log('No registration token available.')
                        }
                    })
                    .catch(err => console.error(err));

            } else {
                alert('Your notification is not allowed please check permissions')
            }
        })
    }, [db_ref])

    onBackgroundMessage(messaging, function (payload) {
        console.log('firebase Recieved background message', payload)
    })
    return children;
}
