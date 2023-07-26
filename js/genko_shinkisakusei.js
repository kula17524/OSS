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

// ロゴをクリックするとメニュー画面に移動
logoicon.addEventListener("click", () => {
    location.href = "index.html";
});
// exitボタンをクリックするとメニュー画面に移動
exiticon.addEventListener("click", () => {
    locaticon.href = "index.html";
});
// ひとつ前に戻るボタンを押すとメニュー画面に移動
back_button.addEventListener("click", () => {
    location.href = "index.html";
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

/*目標時間・目標文字数計算*/
function isNaturalNumber(value) {
    var parsedValue = parseInt(value, 10);
    return !isNaN(parsedValue) && parsedValue > 0;
}

function updateTime(value) {
    var mojisuInput = document.getElementsByClassName("mojisu")[0];
    var timeInput = document.getElementsByClassName("time")[0];

    if (isNaturalNumber(value)) {
        var mojisu = parseInt(value, 10);
        var time = (mojisu * 0.2) / 60;
        timeInput.value = time.toFixed(2);
    } else {
        timeInput.value = '';
    }
}

function updateMojisu(value) {
    var mojisuInput = document.getElementsByClassName("mojisu")[0];
    var timeInput = document.getElementsByClassName("time")[0];

    if (isNaturalNumber(value)) {
        var time = parseFloat(value);
        var mojisu = (time * 60) / 0.2;
        mojisuInput.value = Math.round(mojisu);
    } else {
        mojisuInput.value = '';
    }
}

function showLength(value) {
    var inputLength = document.getElementById("inputlength");
    var length = value.length;
    inputLength.innerText = length;
}

/*文字数カウント*/
function Length(str) {
    document.getElementById("inputlength").innerHTML = str.length;
    const n = (str.length * 0.2) / 60;
    document.getElementById("inputtime").innerHTML = n.toFixed(2);
}

/*保存ボタン*/
const savebtn = document.getElementById("saveicon");
const mask = document.getElementById("mask");
const modal = document.getElementById("modal");

savebtn.addEventListener('click', () => {
    mask.classList.remove('hidden');
    modal.classList.remove('hidden');
});

mask.addEventListener('click', () => {
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

mask_sm.addEventListener('click', () => {
    mask_sm.classList.add('hidden');
    modal_sm.classList.add('hidden');
});