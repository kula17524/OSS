import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  addDoc,
  serverTimestamp,
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

// 変更があったか確認するためのデータ格納用変数
let pre_title = "";
let pre_text = "";
let pre_time = "";
let pre_sec = "";
let pre_input = "";

// htmlと連携
let logout = document.getElementById("logout");
let logout_sp = document.getElementById("logout-sp");
let logoicon = document.getElementById("logoicon");
let exiticon = document.getElementById("exiticon");
let back_button = document.getElementById("back_button");

// ログイン状況を確認し、未ログインならログイン画面に遷移
document.addEventListener("DOMContentLoaded", async function () {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const currentUser = auth.currentUser;
      const email = currentUser.email;
      document.getElementById("user_mail").innerText = email;
      document.getElementById("user_mail-sp").innerText = email;

      // タイトルの状態を確認し、保存してよいか尋ねる
      const checkTitle = () => {
        const title_new = document.querySelector(".genko_title").value;
        // タイトルの確認
        if (
          title_new == "null" ||
          title_new == "undefined" ||
          title_new == "" ||
          title_new.includes(" ") ||
          title_new.includes("　")
        ) {
          Swal.fire({
            type: "warning",
            title: "タイトルが不正です",
            html: "必ずタイトルを入力し、<br>空白文字は含まないようにしてください！",
            showConfirmButton: true,
            confirmButtonText: "ＯＫ",
            confirmButtonColor: "#d33",
          });
        } else {
          // 保存確認
          Swal.fire({
            title: "保存前の確認",
            html: "原稿を保存しますか？",
            type: "question",
            showCancelButton: true,
            confirmButtonColor: "#1AA7C5",
            confirmButtonText: "はい",
            cancelButtonText: "いいえ",
          }).then(async (result) => {
            if (result.value) {
              // Firebaseにデータを保存
              saveDataToFirebase();
              Swal.fire({
                type: "success",
                title: "保存完了",
                html: "保存が完了しました",
                showConfirmButton: true,
                confirmButtonText: "ＯＫ",
                confirmButtonColor: "#1AA7C5",
              });
            }
          });
        }
      };

      // 新しいデータを作成する
      const saveDataToFirebase = async () => {
        const user = auth.currentUser;
        const userId = user.uid;
        const idealNumber = document.querySelector(".mojisu").value;
        const idealTime = document.querySelector(".time").value;
        const idealSec = document.querySelector(".time_second").value;
        const title = document.querySelector(".genko_title").value;
        const honbun = document.getElementById("textarea").value;
        const editTime = serverTimestamp();
        const wordInput = document.getElementById("inputlength").innerText;
        const timeInput = document.getElementById("inputtime").innerText;
        const secInput = document.getElementById("inputsec").innerText;

        try {
          // Firestoreに新しいデータを保存
          const newDocRef = await addDoc(collection(db, "data"), {
            userId: userId, // ユーザーIDを含める
            word_ideal: idealNumber,
            time_ideal: idealTime,
            title: title,
            text: honbun,
            edit_date: editTime,
            word_input: wordInput,
            time_input: timeInput,
            sec_input: secInput,
          });
        } catch (error) {
          console.log("データの保存中にエラーが発生しました: " + error);
        }
        pre_title = title;
        pre_time = idealTime;
        pre_input = idealNumber;
        pre_text = honbun;
        pre_sec = idealSec;
      };

      //「はい」をクリックしたときにデータをFirebaseに更新して保存
      const saveButton = document.getElementById("saveicon");
      saveButton.addEventListener("click", () => {
        checkTitle();
      });
      // スマホ用「はい」をクリックしたときにデータをFirebaseに保存
      const saveButtonSm = document.getElementById("saveicon_2");
      saveButtonSm.addEventListener("click", () => {
        checkTitle();
      });
    } else {
      // ログインしていない場合の処理
      location.href = "login.html";
    }
  });
});
// ログアウトボタンを押下
logout.addEventListener("click", () => {
  const now_word = document.querySelector(".mojisu").value;
  const now_time = document.querySelector(".time").value;
  const now_sec = document.querySelector(".time_second").value;
  const now_title = document.querySelector(".genko_title").value;
  const now_text = document.getElementById("textarea").value;
  if (
    now_text != pre_text ||
    now_time != pre_time ||
    now_title != pre_title ||
    now_word != pre_input ||
    now_sec != pre_sec
  ) {
    Swal.fire({
      title: "保存していません",
      html: "最新の変更を保存していません。<br>このままページを移動しますか？<br>※このままページ移動すると、保存前の変更は保存されません！",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#1AA7C5",
      confirmButtonText: "移動する",
      cancelButtonText: "もどる",
    }).then(async (result) => {
      if (result.value) {
        signOut(auth)
          .then(() => {
            location.href = "login.html";
          })
          .catch((error) => {
            console.log(`ログアウト時にエラーが発生しました (${error})`);
          });
      }
    });
  } else {
    signOut(auth)
      .then(() => {
        location.href = "login.html";
      })
      .catch((error) => {
        console.log(`ログアウト時にエラーが発生しました (${error})`);
      });
  }
});

logout_sp.addEventListener("click", () => {
  const now_word = document.querySelector(".mojisu").value;
  const now_time = document.querySelector(".time").value;
  const now_sec = document.querySelector(".time_second").value;
  const now_title = document.querySelector(".genko_title").value;
  const now_text = document.getElementById("textarea").value;
  if (
    now_text != pre_text ||
    now_time != pre_time ||
    now_title != pre_title ||
    now_word != pre_input ||
    now_sec != pre_sec
  ) {
    Swal.fire({
      title: "保存していません",
      html: "最新の変更を保存していません。<br>このままページを移動しますか？<br>※このままページ移動すると、保存前の変更は保存されません！",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#1AA7C5",
      confirmButtonText: "移動する",
      cancelButtonText: "もどる",
    }).then(async (result) => {
      if (result.value) {
        signOut(auth)
          .then(() => {
            location.href = "login.html";
          })
          .catch((error) => {
            console.log(`ログアウト時にエラーが発生しました (${error})`);
          });
      }
    });
  } else {
    signOut(auth)
      .then(() => {
        location.href = "login.html";
      })
      .catch((error) => {
        console.log(`ログアウト時にエラーが発生しました (${error})`);
      });
  }
});

// ページ遷移前の確認
const checkChange = (loc) => {
  const now_word = document.querySelector(".mojisu").value;
  const now_time = document.querySelector(".time").value;
  const now_sec = document.querySelector(".time_second").value;
  const now_title = document.querySelector(".genko_title").value;
  const now_text = document.getElementById("textarea").value;
  if (
    now_text != pre_text ||
    now_time != pre_time ||
    now_title != pre_title ||
    now_word != pre_input ||
    now_sec != pre_sec
  ) {
    Swal.fire({
      title: "保存していません",
      html: "最新の変更を保存していません。<br>このままページを移動しますか？<br>※このままページ移動すると、保存前の変更は保存されません！",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#1AA7C5",
      confirmButtonText: "移動する",
      cancelButtonText: "もどる",
    }).then(async (result) => {
      if (result.value) {
        location.href = loc;
      }
    });
  } else {
    location.href = loc;
  }
};

// ロゴをクリックするとメニュー画面に移動
logoicon.addEventListener("click", () => {
  const loc = "index.html";
  checkChange(loc);
});
// exitボタンをクリックするとメニュー画面に移動
exiticon.addEventListener("click", () => {
  const loc = "newlist.html";
  checkChange(loc);
});
// ひとつ前に戻るボタンを押すとメニュー画面に移動
back_button.addEventListener("click", () => {
  const loc = "newlist.html";
  checkChange(loc);
});
