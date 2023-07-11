import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: config.APIKEY,
  authDomain: config.AUTH,
  projectId: config.PROJECTID,
  storageBucket: config.BUCKET,
  messagingSenderId: config.SENDID,
  appId: config.APPID,
};
initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let logout = document.getElementById("logout");

onAuthStateChanged(auth, (user) => {
  //ログイン状態が変更された時の処理
  let logout = document.getElementById("logout");

  //-----------------------------------
  // ログインチェック
  //-----------------------------------
  if (user) {
    app;
    const user = auth.currentUser;
    const email = user.email;
  } else {
    location.href = "login.html";
  }

  // ログアウトボタンを押下
  logout.addEventListener("click", () => {
    signOut(auth)
      .then(() => {
        location.href = "login.html";
      })
      .catch((error) => {
        console.log(`ログアウト時にエラーが発生しました (${error})`);
      });
  });
});
