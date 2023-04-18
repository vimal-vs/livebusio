import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCxJYUfPZrylKpvWLHRmEMvRPnDJX-Sx4k",
    authDomain: "livebus-io.firebaseapp.com",
    databaseURL: "https://livebus-io-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "livebus-io",
    storageBucket: "livebus-io.appspot.com",
    messagingSenderId: "461514775302",
    appId: "1:461514775302:web:684f354e8927924f609c87"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default db;