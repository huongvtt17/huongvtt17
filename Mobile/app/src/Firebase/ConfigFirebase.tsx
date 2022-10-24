// Import the functions you need from the SDKs you need
import firebase from "@react-native-firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyALRQ8QCw50E4aQ4fttXgkA68QQiE9RbFI",
    authDomain: "esp32-mushroom.firebaseapp.com",
    databaseURL: "https://esp32-mushroom-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "esp32-mushroom",
    storageBucket: "esp32-mushroom.appspot.com",
    messagingSenderId: "793102736307",
    appId: "1:793102736307:web:0b86d18945aa1c14abc9c6",
    measurementId: "G-MTNHDBG4VR"
};

// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);