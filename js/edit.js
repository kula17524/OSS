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
            // ログイン済みの場合の処理
            const email = user.email;
            const user_id = user.uid;
            //alert("ユーザーID: " + user_id);
            document.getElementById("user_mail").innerText = email;

            // ドキュメントIDを取得
            const urlParams = new URLSearchParams(window.location.search);
            const doc_id = urlParams.get("docid");
            alert("ドキュメントID: " + doc_id);

            // ドキュメントIDからデータを取得
            try {
            const docRef = doc(db, "kura-project1", doc_id);
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
            } 
            
            catch (error) {
                console.log("Error getting document:", error);
            }
            
        } 
        else {
            // 未ログインの場合の処理（ログイン画面に遷移）
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



