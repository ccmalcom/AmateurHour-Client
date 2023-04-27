import {initializeApp} from "firebase/app";
import {getDatabase} from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAe3OyzT09VFH_JwwFEeM9V1RdNgm1jSSI",
    authDomain: "amateur-hour-14080.firebaseapp.com",
    databaseURL: "https://amateur-hour-14080-default-rtdb.firebaseio.com",
    projectId: "amateur-hour-14080",
    storageBucket: "amateur-hour-14080.appspot.com",
    messagingSenderId: "1010700426294",
    appId: "1:1010700426294:web:873d2440166c60c2d30c97",
    measurementId: "G-8NWPJ6BDEG"
};

const app = initializeApp(firebaseConfig)
// .then(() => {
//     console.log("Firebase initialized");
// }).catch((err) => {
//     console.log("Firebase initialization error", err);
// });


export const database = getDatabase(app);
export const auth = getAuth(app);
export default app;
