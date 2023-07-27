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

/* 保存ボタンがクリックされたときにデータをFirebaseに保存
const yesicon = document.getElementById("yesicon");
yesicon.addEventListener('click', () => {
    const idealNumber = document.querySelector('.ideal_number input').value;
    const idealTime = document.querySelector('.ideal_time input').value;
    const title = document.querySelector('.title input').value;
    const honbun = document.querySelector('.honbun textarea').value;

    // Firebase Firestoreに保存する（Firestoreをセットアップ済みと仮定しています）
    const firestore = firebase.firestore();
    firestore.collection("your_collection_name").add({
        word_ideal: idealNumber,
        time_ideal: idealTime,
        title: title,
        honbun: honbun
    })
    .then(() => {
        alert("データが正常に保存されました！");
    })
    .catch((error) => {
        alert("データの保存中にエラーが発生しました: " + error);
    });
});*/

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



/* 全ブロックからis-viewクラスを削除する処理を関数化しておく
const removeViewClass = () => {
    question01?.classList.remove('is-view')
    question02?.classList.remove('is-view')
    question03?.classList.remove('is-view')
    result?.classList.remove('is-view')
}

// ボタンのクリックイベントを関数化しておく(第一引数にボタンの変数,第二引数に先頭に表示するブロックの変数(必要な場合))
const clickButtonEvent = (trigger) => {
trigger?.addEventListener('click', () => {
    removeViewClass()
    if (view) {
    view?.classList.add('is-view')
    }
})
}


// 各フォームのラジオボタンで選択された値を取得
const resultidealnumber = ideal_number.hairLength.value
/*const resultValue02 = form2.hairStatus.value
const resultValue03 = form3.hairHabit.value*/

/*const execute = async () => {
    // 書き込み
    const write = () => {
        return new Promise((resolve, reject) => {
            db.collection('目標文字数')// コレクション名,フィールド名(field1,..)は自由に変更してください。
                .add({
                    word_ideal: resultidealnumber,
                    timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                })
                alert(resultidealnumber)
                .then(() => {
                    resolve()
                })
                .catch((error) => {
                    console.log('Error adding document: ', error)
                    alert('保存に失敗しました')
                    reject(error)
                })
        })
    }
    try {
        await write();
        console.log('データの保存が完了しました');
        // 成功した場合の追加処理などを行う場合はここに記述します
    } catch (error) {
        console.log('データの保存中にエラーが発生しました:', error);
        // エラー処理を行う場合はここに記述します
    }
};*/



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

// Firebase Firestoreに保存する
const saveDataToFirebase = () => {
    const idealNumber = document.querySelector('.mojisu').value;
    const idealTime = document.querySelector('.time').value;
    const title = document.querySelector('.genko_title').value;
    const honbun = document.getElementById("textarea").value;

    // Firebase Firestoreに保存する（Firestoreをセットアップ済みと仮定しています）
    db.collection("kula-project1").doc("data").set({
        word_ideal: idealNumber,
        time_ideal: idealTime,
        title: title,
        honbun: honbun
    })
    .then(() => {
        alert("データが正常に保存されました！");
    })
    .catch((error) => {
        alert("データの保存中にエラーが発生しました: " + error);
    });
};

/*保存ボタン*/
const savebtn = document.getElementById("saveicon");
const mask = document.getElementById("mask");
const modal = document.getElementById("modal");

savebtn.addEventListener('click', () => {
    mask.classList.remove('hidden');
    modal.classList.remove('hidden');
});

// 「はい」をクリックしたときにデータをFirebaseに保存
const yesButton = document.getElementById("yesButton");
yesButton.addEventListener('click', () => {
    saveDataToFirebase();
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