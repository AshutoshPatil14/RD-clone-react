import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = initializeApp({
  apiKey: "AIzaSyDWt_H-V3rS8hy1vwEjENDA6EjVWaOSrhU",
  authDomain: "rd-pushnotifications.firebaseapp.com",
  projectId: "rd-pushnotifications",
  storageBucket: "rd-pushnotifications.firebasestorage.app",
  messagingSenderId: "401635913740",
  appId: "1:401635913740:web:fcf39a6813cf7016acbe29",
  measurementId: "G-FJ7G2WEJLC",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = getMessaging(firebaseApp);


onBackgroundMessage(messaging, (payload) => {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});



