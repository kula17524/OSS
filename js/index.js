import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// 情報設定
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

// htmlと連携
let logout = document.getElementById("logout");
let create = document.getElementById("create_menu");
let practice = document.getElementById("practice_menu");

// 戻るボタンを実質的に無効化
history.replaceState(null, null, null);
history.pushState(null, null, null);
window.addEventListener("popstate", function (e) {
  history.pushState(null, null, null);
  return;
});
// ログイン状況を確認し、未ログインならログイン画面に遷移
window.onload = function () {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      app;
      const user = auth.currentUser;
      const email = user.email;
      document.getElementById("user_mail").innerText = email;
    } else {
      location.href = "login.html";
    }
  });
};

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

// 新規作成ボタンをクリック
create.addEventListener("click", () => {
  location.href = "newlist.html";
});

// 発表練習ボタンをクリック
practice.addEventListener("click", () => {
  location.href = "practicelist.html";
});

user_button.addEventListener("click", () => {});
