import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

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
const db = getFirestore(app);

// htmlと連携
let logout = document.getElementById("logout");
let top = document.getElementById("top");
let back = document.getElementById("back");

// ログイン状況を確認し、未ログインならログイン画面に遷移
document.addEventListener("DOMContentLoaded", function () {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      app;
      const user = auth.currentUser;
      const email = user.email;
      const user_id = user.uid;
      document.getElementById("user_mail").innerText = email;
      document.getElementById("user_mail-sp").innerText = email;

      // Firebaseから原稿リストを取得
      (async () => {
        const q = query(collection(db, "data"), where("userId", "==", user_id));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          console.log(doc.data().title, doc.data().text, doc.data().time_ideal);
        });
      })();
    } else {
      location.href = "login.html";
    }
  });
});

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

// ロゴをクリックするとメニュー画面に移動
top.addEventListener("click", () => {
  location.href = "index.html";
});

// ひとつ前に戻るボタンを押すとメニュー画面に移動
back.addEventListener("click", () => {
  location.href = "index.html";
});
