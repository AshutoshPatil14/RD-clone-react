import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDWt_H-V3rS8hy1vwEjENDA6EjVWaOSrhU",
  authDomain: "rd-pushnotifications.firebaseapp.com",
  projectId: "rd-pushnotifications",
  storageBucket: "rd-pushnotifications.firebasestorage.app",
  messagingSenderId: "401635913740",
  appId: "1:401635913740:web:fcf39a6813cf7016acbe29",
  measurementId: "G-FJ7G2WEJLC",
};

const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);

export const generateToken = async () => {
  const permission = await Notification.requestPermission();
  // console.log(permission)
  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey:
        "BBC2zefJYAa-cJNYB6OmLDh8WRCaNxUaILW_jv7oCZyOtflWpr4aS4OI-acum7vePTgj5W3OhQfqzl-Q9ig_tPQ",
    });
    console.log(token)
  }
};
