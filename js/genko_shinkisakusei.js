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





// ユーザーの認証情報
let user;

// ログイン状況を確認し、未ログインならログイン画面に遷移
window.onload = function () {
    onAuthStateChanged(auth, (loggedInUser) => {
        if (loggedInUser) {
            user = loggedInUser;
            const email = loggedInUser.email;
            document.getElementById("user_mail").innerText = email;
        } else {
            location.href = "login.html";
        }
    });
    // 「はい」をクリックしたときにデータをFirebaseに保存
    const yesButton = document.getElementById("yesButton");
    yesButton.addEventListener('click', () => {
        // Firebase Firestoreに保存する
        const saveDataToFirebase = () => {
            const idealNumber = document.querySelector('.mojisu').value;
            const idealTime = document.querySelector('.time').value;
            const title = document.querySelector('.genko_title').value;
            const honbun = document.getElementById("textarea").value;
            const editTime = new Date().toLocaleString();
            const wordInput = document.getElementById("inputlength").innerText;
            const timeInput = document.getElementById("inputtime").innerText;

            // Firebase Firestoreに保存する
            addDoc(collection(db, "kula-project1"), {
                word_ideal: idealNumber,
                time_ideal: idealTime,
                title: title,
                text: honbun,
                edit_time: editTime,
                word_input: wordInput,
                time_input: timeInput,
                userId: user.uid // ユーザーのUIDを保存

            })
            
            .then((docRef) => {
                alert("データが正常に保存されました！ドキュメントID: " + docRef.id);
            })
            .catch((error) => {
                alert("データの保存中にエラーが発生しました: " + error);
            });
        };
        // Firebaseにデータを保存
        saveDataToFirebase();

        // モーダルを閉じる
        mask.classList.add('hidden');
        modal.classList.add('hidden');
    });

    // 「いいえ」をクリックしたときにモーダルを閉じる
    const noButton = document.getElementById("noButton");
    noButton.addEventListener('click', () => {
        mask.classList.add('hidden');
        modal.classList.add('hidden');
    });

    const savebtn_sm = document.getElementById("saveicon_2");
    const mask_sm = document.getElementById("mask_sm");
    const modal_sm = document.getElementById("modal_sm");

    savebtn_sm.addEventListener('click', () => {
        mask_sm.classList.remove('hidden');
        modal_sm.classList.remove('hidden');
    });

    // スマホ用「はい」をクリックしたときにデータをFirebaseに保存
    const yesButtonSm = document.getElementById("yesButtonSm");
    yesButtonSm.addEventListener('click', () => {
        saveDataToFirebase();
        mask_sm.classList.add('hidden');
        modal_sm.classList.add('hidden');
    });

    // スマホ用「いいえ」をクリックしたときにモーダルを閉じる
    const noButtonSm = document.getElementById("noButtonSm");
    noButtonSm.addEventListener('click', () => {
        mask_sm.classList.add('hidden');
        modal_sm.classList.add('hidden');
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

// Firestoreのセキュリティルールを適用する
const dbRules = {
    rules: {
        data: {
            // データの読み取りは、自身のデータであれば許可する
            // データの書き込みは、自身のデータであれば許可する
            ".read": "resource.data.userId == request.auth.uid",
            ".write": "request.auth.uid == request.resource.data.userId"
        }
    }
};

// Firestoreのセキュリティルールを設定する
fetch("https://firestore.googleapis.com/v1/projects/YOUR_PROJECT_ID/databases/(default)/documents:commit", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer YOUR_FIREBASE_ADMIN_SDK_TOKEN"
    },
    body: JSON.stringify(dbRules)
})
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log("Error setting Firestore rules: ", error));

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




