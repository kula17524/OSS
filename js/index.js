import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  browserSessionPersistence,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: config.APIKEY,
  authDomain: config.AUTH,
  projectId: config.PROJECTID,
  storageBucket: config.BUCKET,
  messagingSenderId: config.SENDID,
  appId: config.APPID,
};

// Initialize Firebase
initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

firebaseApp.fireauth.onAuthStateChanged((user) => {
  if (!user) {
    window.location.replace("login.html");
  }
});
