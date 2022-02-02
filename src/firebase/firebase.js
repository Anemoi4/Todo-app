import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyCMuPlI8wuv5zv2qZKXHoAZdva3sqsDQXI",
    authDomain: "todo-app-aefe8.firebaseapp.com",
    projectId: "todo-app-aefe8",
    storageBucket: "todo-app-aefe8.appspot.com",
    messagingSenderId: "866632872732",
    appId: "1:866632872732:web:a91b76f8d15fe47c5800d9"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore()