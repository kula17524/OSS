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

// htmlと連携
let logout = document.getElementById("logout");
let logoicon = document.getElementById("logoicon");
let exiticon = document.getElementById("exiticon");
let home = document.getElementById("home");
let back_button = document.getElementById("back_button");

// ログイン状況を確認し、未ログインならログイン画面に遷移
document.addEventListener("DOMContentLoaded", async function () {
  onAuthStateChanged(auth, async (user) => {
    /*const url = new URL(window.location.href);
    const param = url.searchParams;
    const userId = user.uid;*/

    if (user) {
        const user = auth.currentUser;
        const email = user.email;
        document.getElementById("user_mail").innerText = email;
        
        // HTMLから取得
        const textarea = document.getElementById("textarea");
        const word = document.getElementById("inputlength");
        const time = document.getElementById("inputtime");
        const word_i = document.getElementsByClassName("mojisu")[0];
        const time_i = document.getElementsByClassName("time")[0];
        const title = document.getElementsByClassName("genko_title")[0];

    
    
        //「はい」をクリックしたときにデータをFirebaseに更新して保存
        const yesButton = document.getElementById("yesButton");
        yesButton.addEventListener('click', () => {
            // Firebaseにデータを保存
            saveDataToFirebase();
            // モーダルを閉じる
            mask.classList.add('hidden');
            modal.classList.add('hidden');
        });
        // スマホ用「はい」をクリックしたときにデータをFirebaseに保存
        const yesButtonSm = document.getElementById("yesButtonSm");
        yesButtonSm.addEventListener('click', () => {
            saveDataToFirebase();
            mask_sm.classList.add('hidden');
            modal_sm.classList.add('hidden');
        });
    

        // 新しいデータを作成する
        const saveDataToFirebase = async () => {
            const user = auth.currentUser;
            const userId = user.uid;
            const idealNumber = document.querySelector('.mojisu').value;
            const idealTime = document.querySelector('.time').value;
            const title = document.querySelector('.genko_title').value;
            const honbun = document.getElementById("textarea").value;
            const editTime = serverTimestamp();
            const wordInput = document.getElementById("inputlength").innerText;
            const timeInput = document.getElementById("inputtime").innerText;
            console.log("idealNumber:"+idealNumber,"idealTime:"+idealTime,"title:"+title,"honbun:"+honbun,"editTime:"+editTime,"wordInput:"+wordInput,"timeInput:"+timeInput);
        
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
                });

                alert("データが正常に保存されました！");
            } catch(error) {
                alert("データの保存中にエラーが発生しました: " + error);
            }
        };
    } else {
        // ログインしていない場合の処理
        alert("ログインしてください。")
        location.href = "login.html";
    }
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

        // 保存ボタン（PC）
        const savebtn = document.getElementById("saveicon");
        const mask = document.getElementById("mask");
        const modal = document.getElementById("modal");

        savebtn.addEventListener('click', () => {
            mask.classList.remove('hidden');
            modal.classList.remove('hidden');
        });

        // 保存ボタン
        const savebtn_sm = document.getElementById("saveicon_2");
        const mask_sm = document.getElementById("mask_sm");
        const modal_sm = document.getElementById("modal_sm");

        savebtn_sm.addEventListener('click', () => {
            mask_sm.classList.remove('hidden');
            modal_sm.classList.remove('hidden');
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

    // 「いいえ」をクリックしたときにモーダルを閉じる
    const noButton = document.getElementById("noButton");
    noButton.addEventListener('click', () => {
        mask.classList.add('hidden');
        modal.classList.add('hidden');
    });

    // スマホ用「いいえ」をクリックしたときにモーダルを閉じる
    const noButtonSm = document.getElementById("noButtonSm");
    noButtonSm.addEventListener('click', () => {
        mask_sm.classList.add('hidden');
        modal_sm.classList.add('hidden');
    });

