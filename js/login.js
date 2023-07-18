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
let login_button = document.getElementById("login-button");
let new_button = document.getElementById("new-button");
document.getElementById("login-error-text").innerText = "　";

//ログイン処理
document.addEventListener("DOMContentLoaded", function () {
  login_button.addEventListener(
    "click",
    function () {
      var mailAddress = document.getElementById("login-mail").value;
      var password = document.getElementById("login-pass").value;
      document.getElementById("login-error-text").innerText = "　";

      signInWithEmailAndPassword(auth, mailAddress, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          location.href = "index.html";
        })
        .catch((error) => {
          if (mailAddress == "" || password == "") {
            document.getElementById("login-error-text").innerText =
              "空欄の項目があります。";
          } else {
            document.getElementById("login-error-text").innerText =
              "入力に誤りがあります。";
          }
        });
    },
    false
  );
});
