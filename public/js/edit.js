import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  updateDoc,
  setDoc,
  getDoc,
  serverTimestamp,
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

// 変更があったか確認するためのデータ格納用変数
let pre_title = "";
let pre_text = "";
let pre_time = "";
let pre_input = "";

//htmlと連携
let logout = document.getElementById("logout");
let logoicon = document.getElementById("logoicon");
let exiticon = document.getElementById("exiticon");
let home = document.getElementById("home");
let back_button = document.getElementById("back_button");

// ログイン状況を確認し、未ログインならログイン画面に遷移
document.addEventListener("DOMContentLoaded", async function () {
  onAuthStateChanged(auth, async (user) => {
    // ☆前のページからドキュメントIDを取得
    const url = new URL(window.location.href);
    const param = url.searchParams;
    const doc_id = param.get("docid");

    if (user) {
      const userId = user.uid;
      const currentUser = auth.currentUser;
      const email = currentUser.email;
      document.getElementById("user_mail").innerText = email;

      // ドキュメントIDからデータを取得
      try {
        const docRef = doc(db, "data", doc_id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists) {
          const data = docSnap.data();
          if (data.userId === userId) {
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
              pre_title = "無題";
            } else {
              title.value = data.title;
              pre_title = data.title;
            }
            if (data.text == undefined || data.text == null) {
              textarea.innerHTML = "本文";
              pre_text = "本文";
            } else {
              textarea.innerHTML = data.text;
              pre_text = data.text;
            }
            if (data.word_ideal == undefined || data.word_ideal == null) {
              word_i.value = "0";
              pre_input = "0";
            } else {
              word_i.value = data.word_ideal;
              pre_input = data.word_ideal;
            }
            if (data.word_input == undefined || data.word_input == null) {
              word.innerText = "0";
            } else {
              word.innerText = data.word_input;
            }
            if (data.time_ideal == undefined || data.time_ideal == null) {
              time_i.value = "0";
              pre_time = "0";
            } else {
              time_i.value = data.time_ideal;
              pre_time = data.time_ideal;
            }
            if (data.time_input == undefined || data.time_input == null) {
              time.innerText = "0";
            } else {
              time.innerText = data.time_input;
            }
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
                    updateDataToFirebase();
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

            // Firebase Firestoreにデータを更新して保存する
            const updateDataToFirebase = () => {
              const idealNumber = document.querySelector(".mojisu").value;
              const idealTime = document.querySelector(".time").value;
              const title = document.querySelector(".genko_title").value;
              const honbun = document.getElementById("textarea").value;
              const editTime = serverTimestamp();
              const wordInput =
                document.getElementById("inputlength").innerText;
              const timeInput = document.getElementById("inputtime").innerText;

              // Firebase Firestoreに保存する
              updateDoc(doc(db, "data", doc_id), {
                word_ideal: idealNumber,
                time_ideal: idealTime,
                title: title,
                text: honbun,
                edit_date: editTime,
                word_input: wordInput,
                time_input: timeInput,
              }).catch((error) => {
                console.log("データの保存中にエラーが発生しました: " + error);
              });
              pre_title = title;
              pre_time = idealTime;
              pre_input = idealNumber;
              pre_text = honbun;
            };
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
      // ログインしていない場合の処理
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
logoicon.addEventListener("click", () => {
  const loc = "index.html";
  checkChange(loc);
});
// exitボタンをクリックするとメニュー画面に移動
exiticon.addEventListener("click", () => {
  const loc = "newlist.html";
  checkChange(loc);
});
// homeボタンをクリックするとメニュー画面に移動
home.addEventListener("click", () => {
  const loc = "index.html";
  checkChange(loc);
});
// ひとつ前に戻るボタンを押すとメニュー画面に移動
back_button.addEventListener("click", () => {
  const loc = "newlist.html";
  checkChange(loc);
});

// ページ遷移前の確認
const checkChange = (loc) => {
  const now_word = document.querySelector(".mojisu").value;
  const now_time = document.querySelector(".time").value;
  const now_title = document.querySelector(".genko_title").value;
  const now_text = document.getElementById("textarea").value;
  if (
    now_text != pre_text ||
    now_time != pre_time ||
    now_title != pre_title ||
    now_word != pre_input
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
