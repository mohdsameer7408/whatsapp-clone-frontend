import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdWnjLscvTuulChBP4GH5KV9reU-QKlpo",
  authDomain: "whatsapp-clone-acd10.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-acd10.firebaseio.com",
  projectId: "whatsapp-clone-acd10",
  storageBucket: "whatsapp-clone-acd10.appspot.com",
  messagingSenderId: "95708831364",
  appId: "1:95708831364:web:c20025bf849c828f62ecd1",
  measurementId: "G-DVRF72BM0E",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
