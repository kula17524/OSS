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
let logout = document.getElementById("logout");
let logout_sp = document.getElementById("logout-sp");
let logoicon = document.getElementById("logoicon");
let exiticon = document.getElementById("exiticon");
let back_button = document.getElementById("back_button");

// ログイン状況を確認し、未ログインならログイン画面に遷移
document.addEventListener("DOMContentLoaded", async function () {
  onAuthStateChanged(auth, async (user) => {
    // ☆前のページからドキュメントIDを取得
    const url = new URL(window.location.href);
    const param = url.searchParams;
    const doc_id = param.get("docid");
    const userId = user.uid;

    // ドキュメントがなければリストへ戻る
    if (doc_id == "" || doc_id == null || doc_id == undefined) {
      location.href = "practicelist.html";
    }

    if (user) {
      const user = auth.currentUser;
      const email = user.email;
      document.getElementById("user_mail").innerText = email;
      document.getElementById("user_mail-sp").innerText = email;

      // ドキュメントIDからデータを取得
      try {
        const docRef = doc(db, "data", doc_id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists) {
          const data = docSnap.data();
          if (data.userId === userId) {
            // HTMLから取得
            const textarea = document.getElementById("textarea");
            const word = document.getElementById("inputlength"); //原稿文字数
            const time = document.getElementById("inputtime"); //読み上げ時間
            const sec = document.getElementById("inputsec");
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
            if (data.word_input == undefined || data.word_input == null) {
              word.innerHTML = "0";
            } else {
              word.innerHTML = data.word_input;
            }
            if (data.time_input == undefined || data.time_input == null) {
              time.innerHTML = "0";
            } else {
              time.innerHTML = data.time_input;
            }
            if (data.sec_input == undefined || data.sec_input == null) {
              sec.innerText = "0";
            } else {
              sec.innerText = data.sec_input;
            }
          } else {
            Swal.fire({
              type: "error",
              title: "ユーザーエラー",
              html: "ユーザーの UIDが一致していません。<br>ログアウトしてやり直してください。",
              showConfirmButton: true,
              confirmButtonText: "ＯＫ",
              confirmButtonColor: "#d33",
            });
          }
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Error getting document:", error);
      }
    } else {
      location.href = "login.html";
    }
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
  logout_sp.addEventListener("click", () => {
    signOut(auth)
      .then(() => {
        location.href = "login.html";
      })
      .catch((error) => {
        console.log(`ログアウト時にエラーが発生しました (${error})`);
      });
  });

  // ロゴをクリックするとメニュー画面に移動
  logoicon.addEventListener("click", () => {
    location.href = "index.html";
  });
  // exitボタンをクリックするとメニュー画面に移動
  exiticon.addEventListener("click", () => {
    location.href = "practicelist.html";
  });
  // ひとつ前に戻るボタンを押すとメニュー画面に移動
  back_button.addEventListener("click", () => {
    location.href = "practicelist.html";
  });
});
