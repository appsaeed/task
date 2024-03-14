import { ref, set } from 'firebase/database';
import { getToken } from 'firebase/messaging';
import { ReactNode, useEffect } from 'react';
import { database, messaging } from './firebase';

export default function MainProvider({ children }: { children: ReactNode }) {

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

                            if (!localStorage.getItem('notify_token')) {

                                const tokens_ref = ref(database, 'tokens/' + token);
                                set(tokens_ref, token)
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

    return children;
}
