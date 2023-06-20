import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
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

// ログインしているかどうか
window.addEventListener("DOMContentLoaded", function () {
  // 0.5秒ごとに実行
  setInterval(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
      } else {
        location.href = "mainmenu.html";
      }
    });
  }, 500);
});

//ログイン処理
document.addEventListener("DOMContentLoaded", function () {
  login_button.addEventListener(
    "click",
    function () {
      var mailAddress = document.getElementById("login-mail").value;
      var password = document.getElementById("login-pass").value;

      signInWithEmailAndPassword(auth, mailAddress, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          location.href = "mainmenu.html";
        })
        .catch((error) => {
          alert(
            "メールアドレスまたはパスワードが異なります。再度入力してください。"
          );
        });
    },
    false
  );
});
