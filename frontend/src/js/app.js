let enableNotificationsButtons = document.querySelectorAll('.enable-notifications');

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js')
        .then(() => {
            console.log('service worker registriert')
        })
        .catch(
            err => { console.log(err); }
        );
}

function displayConfirmNotification() {
    if('serviceWorker' in navigator) {
        let options = {
            body: 'You successfully subscribed to our Notification service!',
            icon: '/src/images/icons/foodIcon96x96.png',
            image: '/src/images/krabby-patty.jpeg',
            lang: 'de-DE',
            vibrate: [100, 50, 200],
            badge: '/src/images/icons/foodIcon96x96.png',
            tag: 'confirm-notification',
            renotify: true,
            actions: [
                { action: 'confirm', title: 'Ok', icon: '/src/images/icons/foodIcon96x96.png' },
                { action: 'cancel', title: 'Cancel', icon: '/src/images/icons/foodIcon96x96.png' },
            ]
        };

        navigator.serviceWorker.ready
            .then( sw => {
                sw.showNotification('Successfully subscribed (from SW)!', options);
            });
    }
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

function configurePushSubscription() {
    if(!('serviceWorker' in navigator)) {
        return
    }

    let swReg;
    navigator.serviceWorker.ready
        .then( sw => {
            swReg = sw;
            const subscription = sw.pushManager.getSubscription();
            console.log('subscription', subscription)
            return subscription
        })
        .then( sub => {
            if (sub === null) {
                console.log('sub==null')
                // create a new subscription
                let vapidPublicKey = 'BM8oZZuUzCbrrBLou5ALaLvDqFoZ-spsUse8B_HYgLF0iA6NGYXIWMRrtEPZ4foBIYj2GiJOHsDTW1aq9RKdyag';
                let convertedVapidPublicKey = urlBase64ToUint8Array(vapidPublicKey);

                return swReg.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: convertedVapidPublicKey,
                });
            } else {
                /* zum Testen, falls subscription bereits existierte,
                 * aber neue erstellt werden soll
                 */
/*
                sub.unsubscribe()
                    .then(() => {
                        console.log('unsubscribed()', sub)
                    })*/

            }
        })
        .then( newSub => {
            return fetch('http://localhost:3000/subscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(newSub)
            })
                .then( response => {
                    if(response.ok) {
                        displayConfirmNotification();
                    }
                })
        });
}

function askForNotificationPermission() {
    Notification.requestPermission( result => {
        console.log('User choice', result);
        if(result !== 'granted') {
            console.log('No notification permission granted');
        } else {
            // displayConfirmNotification();
            configurePushSubscription();
        }
    });
}

if('Notification' in window && 'serviceWorker' in navigator) {
    for(let button of enableNotificationsButtons) {
        button.style.display = 'inline-block';
        button.addEventListener('click', askForNotificationPermission);
    }
}