// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

function firebaseConfig() {
    const firebaseConfig = {
        apiKey: "AIzaSyD-BnSQEqMgi-u55FW2N9zNWUJIfyJLqX0",
        authDomain: "tnp-nitap.firebaseapp.com",
        databaseURL: "https://tnp-nitap-default-rtdb.firebaseio.com",
        projectId: "tnp-nitap",
        storageBucket: "tnp-nitap.appspot.com",
        messagingSenderId: "726054026157",
        appId: "1:726054026157:web:c32fd9200a792d89ee7f24",
        measurementId: "G-PC649G4207"
      };
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    // const analytics = getAnalytics(app);

    return getDatabase(app);
}

export default firebaseConfig;