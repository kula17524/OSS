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
let credit = document.getElementById("credit");
let credit_button = document.getElementById("credit_button");

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

credit.addEventListener("click", () => {
  Swal.fire({
    title: "作業担当",
    html:
      "<企画・立案><br />大倉、杉尾、杉崎" +
      "<br />" +
      "- UIデザイン：主担当...杉尾" +
      "<br />" +
      "　　　　　　　原稿ダウンロード・フルスクリーン表示ボタン・" +
      "<br />" +
      "　　　　　　　マイク停止ボタン・初期化ボタン・クレジットボタン...大倉" +
      "<br />" +
      "- ログイン・アカウント登録画面：大倉 - メニュー画面：大倉" +
      "<br />" +
      "- 原稿リスト画面(新規作成・編集用/発表練習用)：大倉" +
      "<br />" +
      "- 原稿新規作成画面：主担当...杉尾" +
      "<br />" +
      "　　　　　　　　　原稿ダウンロード実装・UI微調整...大倉" +
      "<br />" +
      "- 原稿編集画面：主担当...杉尾" +
      "<br />" +
      "　　　　　　　原稿ダウンロード実装・UI微調整...大倉" +
      "<br />" +
      "- 発表練習画面：主担当...杉崎" +
      "<br />" +
      "　　　　　　　　フルスクリーン表示実装・自動スクロール実装・" +
      "<br />" +
      "　　　　　　　　強調表示実装・UI調整...大倉" +
      "<br />" +
      "- Firebase構築・管理：大倉 - GitHub構築・管理：大倉" +
      "<br />" +
      "- GitHub使用：大倉、杉尾、杉崎",
    showConfirmButton: true,
    confirmButtonText: "閉じる",
    confirmButtonColor: "#1AA7C5",
  });
});
credit_button.addEventListener("click", () => {
  Swal.fire({
    title: "作業担当",
    html:
      "【企画・立案】大倉、杉尾、杉崎" +
      "<br /><br />" +
      "【UIデザイン】<br />主担当...杉尾" +
      "<br />" +
      "原稿ダウンロード・全画面表示ボタン・マイク停止ボタン・初期化ボタン・クレジットボタン...大倉" +
      "<br /><br />" +
      "【ログイン・アカウント登録画面】大倉" +
      "<br /><br />" +
      "【メニュー画面】大倉" +
      "<br /><br />" +
      "【原稿リスト画面(新規作成・編集用/発表練習用)】大倉" +
      "<br /><br />" +
      "【原稿新規作成画面】<br />主担当...杉尾" +
      "<br />" +
      "原稿ダウンロード実装・UI微調整...大倉" +
      "<br /><br />" +
      "【原稿編集画面】<br />主担当...杉尾" +
      "<br />" +
      "原稿ダウンロード実装・UI微調整...大倉" +
      "<br /><br />" +
      "【発表練習画面】<br />主担当...杉崎" +
      "<br />" +
      "全画面表示実装・自動スクロール実装・強調表示実装・UI調整...大倉" +
      "<br /><br />" +
      "【Firebase構築・管理】大倉" +
      "<br /><br />" +
      "【GitHub構築・管理】大倉" +
      "<br /><br />" +
      "【GitHub使用】大倉、杉尾、杉崎",
    showConfirmButton: true,
    confirmButtonText: "閉じる",
    confirmButtonColor: "#1AA7C5",
  });
});
