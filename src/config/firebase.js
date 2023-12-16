import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyD9DjbcieBprJ53sgoCS_QZC32vKkl2cAk",
    authDomain: "bizcard-web.firebaseapp.com",
    projectId: "bizcard-web",
    storageBucket: "bizcard-web.appspot.com",
    messagingSenderId: "168166500487",
    appId: "1:168166500487:web:9409a0658c14164eb6b022",
    measurementId: "G-NZQT5YJL11"
}; 

initializeApp(firebaseConfig);

export const storage = getStorage();