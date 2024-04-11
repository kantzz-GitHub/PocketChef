
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAwaYitXyY-flz6I_tu4w-XEI_qbrPdw7c",
  authDomain: "rn-final-project-d9982.firebaseapp.com",
  projectId: "rn-final-project-d9982",
  storageBucket: "rn-final-project-d9982.appspot.com",
  messagingSenderId: "124609253674",
  appId: "1:124609253674:web:76fb88e0e712c3f9844e53"
};


//Initializing Firebase Auth
if (!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
