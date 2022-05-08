import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyD6rSZnVUDp2whxDIqDDFG8_76F-jpqFAs",
    authDomain: "social-83131.firebaseapp.com",
    databaseURL: "https://social-83131-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "social-83131",
    storageBucket: "social-83131.appspot.com",
    messagingSenderId: "660762742142",
    appId: "1:660762742142:web:62038487acac55853db72f"
};

const initFirebase = () => initializeApp(firebaseConfig);

export default initFirebase;