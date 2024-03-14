/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");


const firebaseConfig = {
  apiKey: "AIzaSyAHptr-auvkr-O1y7mFvE5JPxdXuiu9ErE",
  authDomain: "todo-app-3a900.firebaseapp.com",
  databaseURL: "https://todo-app-3a900-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "todo-app-3a900",
  storageBucket: "todo-app-3a900.appspot.com",
  messagingSenderId: "16814261758",
  appId: "1:16814261758:web:3391aaceb75edd7c326caf"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});