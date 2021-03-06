import firebase from 'firebase';

const config = {
	apiKey: "AIzaSyCMd6IjY9JlrJccYSK2rTyaC2m3Zvt936M",
    authDomain: "food-baby-306819.firebaseapp.com",
    projectId: "food-baby-306819",
    storageBucket: "food-baby-306819.appspot.com",
    messagingSenderId: "93962966164",
    appId: "1:93962966164:web:99a4a5f03af319d7bd1081",
    measurementId: "G-4K99RL70EJ"
};

firebase.initializeApp(config);

//export const googleProvider = new firebase.auth.GoogleAuthProvider();
// export const firebaseAuth = firebase.auth;
export const db = firebase.firestore().settings({ timestampsInSnapshots: true });