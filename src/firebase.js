import firebase from "firebase";


  const firebaseConfig = {
    apiKey: "AIzaSyBuO8DzfOR3ZUL9kK1QLs-iHojDpwiYSj4",
    authDomain: "bt3103-week-6-ca182.firebaseapp.com",
    projectId: "bt3103-week-6-ca182",
    storageBucket: "bt3103-week-6-ca182.appspot.com",
    messagingSenderId: "327645385005",
    appId: "1:327645385005:web:d1f1d961ca661b454ec3a4",
    measurementId: "G-DEV4J8C5TY"
  };


firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;