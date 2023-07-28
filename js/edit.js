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
        document.getElementById("user_mail-sp").innerText = email;

        // 前のページからドキュメントIDを取得
        const urlParams = new URLSearchParams(window.location.search);
        const doc_id = urlParams.get("docid");

        // ドキュメントIDからデータを取得
        try {
          const docRef = doc(db, "kula-project1", doc_id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            document.getElementById("textarea").value = data.text || ""; // textフィールドを表示
            document.querySelector('.genko_title').value = data.title || ""; // titleフィールドを表示
            document.querySelector('.time').value = data.time_ideal || ""; // time_idealフィールドを表示
            document.querySelector('.mojisu').value = data.word_ideal || ""; // word_idealフィールドを表示
            document.getElementById("inputtime").innerText = data.time_input || ""; // time_inputフィールドを表示
            document.querySelector('.inputlength').value = data.word_input || ""; // word_inputフィールドを表示
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.log("Error getting document:", error);
        }

        // Firebaseから原稿リストを取得
        (async () => {
          const q = query(collection(db, "data"), where("userId", "==", user_id));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            // ドキュメントIDを取得
            const doc_id = doc.id;
            console.log(doc_id);
            // 枠を作成
            // ...

            /* ドキュメントIDを送りつつページ遷移 */
            var buttons = document.getElementsByClassName("point-button");
            var triggers = Array.from(buttons);

            triggers.forEach(function (target) {
              target.addEventListener("click", function () {
                location.href =
                  "genko_edit.html?docid=" + target.className.split(" ")[2];
              });
            });
          });
        })();
      };
    });
})
  
  
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

savebtn.addEventListener('click', () => {
    mask.classList.remove('hidden');
    modal.classList.remove('hidden');
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


