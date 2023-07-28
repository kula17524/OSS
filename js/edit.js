import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

//情報設定
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

//htmlと連携
let back = document.getElementById("back_button");
let logout = document.getElementById("logout");
let logoicon = document.getElementById("logoicon");
let exiticon = document.getElementById("exiticon");
let home = document.getElementById("home");
let back_button = document.getElementById("back_button");

// ログイン状況を確認し、未ログインならログイン画面に遷移
document.addEventListener("DOMContentLoaded", async function () {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      app;
      const user = auth.currentUser;
      const email = user.email;
      const user_id = user.uid;
      document.getElementById("user_mail").innerText = email;
      //document.getElementById("user_mail-sp").innerText = email;
      // ↑ HTMLを見るにPC版のみになっているから「user_mail-sp」がHTML内にない

      // ☆前のページからドキュメントIDを取得
      const url = new URL(window.location.href);
      const param = url.searchParams;
      const doc_id = param.get("docid");

      // ドキュメントIDからデータを取得
      try {
        const docRef = doc(db, "data", doc_id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists) {
          const data = docSnap.data();

          // HTMLから取得
          const textarea = document.getElementById("textarea");
          const word = document.getElementById("inputlength");
          const time = document.getElementById("inputtime");
          const word_i = document.getElementsByClassName("mojisu")[0];
          const time_i = document.getElementsByClassName("time")[0];
          const title = document.getElementsByClassName("genko_title")[0];

          // 反映
          if (data.title == undefined || data.title == null) {
            title.value = "無題";
          } else {
            title.value = data.title;
          }
          if (data.text == undefined || data.text == null) {
            textarea.innerHTML = "本文";
          } else {
            textarea.innerHTML = data.text;
          }
          if (data.word_ideal == undefined || data.word_ideal == null) {
            word_i.value = "0";
          } else {
            word_i.value = data.word_ideal;
          }
          if (data.word_input == undefined || data.word_input == null) {
            word.innerText = "0";
          } else {
            word.innerText = data.word_input;
          }
          if (data.time_ideal == undefined || data.time_ideal == null) {
            time_i.value = "0";
          } else {
            time_i.value = data.time_ideal;
          }
          if (data.time_input == undefined || data.time_input == null) {
            time.innerText = "0";
          } else {
            time.innerText = data.time_input;
          }
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Error getting document:", error);
      }
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

/*保存ボタン*/
const savebtn = document.getElementById("saveicon");
const mask = document.getElementById("mask");
const modal = document.getElementById("modal");

savebtn.addEventListener("click", () => {
  mask.classList.remove("hidden");
  modal.classList.remove("hidden");
});

// ロゴをクリックするとメニュー画面に移動
logoicon.addEventListener("click", () => {
  location.href = "index.html";
});
// exitボタンをクリックするとメニュー画面に移動
exiticon.addEventListener("click", () => {
  location.href = "newlist.html";
});
// homeボタンをクリックするとメニュー画面に移動
home.addEventListener("click", () => {
  location.href = "index.html";
});
// ひとつ前に戻るボタンを押すとメニュー画面に移動
back_button.addEventListener("click", () => {
  location.href = "newlist.html";
});
