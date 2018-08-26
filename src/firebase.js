import firebase from 'firebase';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyCY10MrLYQ-5lsLZojjwq3EwsuIv-N-ODE",
    authDomain: "todo-app-fc96c.firebaseapp.com",
    databaseURL: "https://todo-app-fc96c.firebaseio.com",
    projectId: "todo-app-fc96c",
    storageBucket: "todo-app-fc96c.appspot.com",
    messagingSenderId: "293317367732"
};
// firebase.initializeApp(config);

const firebaseApp = firebase.initializeApp(config);
const firestore = firebaseApp.firestore();
firestore.settings({ timestampsInSnapshots: true});

export default firestore;