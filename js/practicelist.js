import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import {
  getFirestore,
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

// htmlと連携
let new_button = document.getElementById("new");
let logout = document.getElementById("logout");
let top = document.getElementById("top");
let back = document.getElementById("back");

// ログイン状況を確認し、未ログインならログイン画面に遷移
document.addEventListener("DOMContentLoaded", function () {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      app;
      const user = auth.currentUser;
      const email = user.email;
      const user_id = user.uid;
      document.getElementById("user_mail").innerText = email;
      document.getElementById("user_mail-sp").innerText = email;

      // Firebaseから原稿リストを取得
      (async () => {
        const q = query(collection(db, "data"), where("userId", "==", user_id));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // ドキュメントIDを取得
          const doc_id = doc.id;
          // 枠を作成
          const tbody = document.createElement("tbody");
          const list_wrap = document.createElement("table");
          list_wrap.className = "list-wrap";
          const title_wrap = document.createElement("tr");
          title_wrap.className = "title-wrap";
          const data_wrap = document.createElement("tr");
          data_wrap.className = "data-wrap";

          // データの表示
          // 原稿タイトル
          const title = document.createElement("td");
          title.className = "title";
          title.colSpan = "4";
          if (doc.data().title == undefined || doc.data().title == null) {
            title.innerHTML = "無題";
          } else {
            title.innerHTML = doc.data().title;
          }
          // 最終更新日
          const date = document.createElement("td");
          if (
            doc.data().edit_date == undefined ||
            doc.data().edit_date == null
          ) {
            date.innerHTML = "更新日不明";
          } else {
            const day = doc.data().edit_date.toDate();
            date.innerHTML =
              day.getFullYear() +
              "/" +
              ("00" + (day.getMonth() + 1)).slice(-2) +
              "/" +
              ("00" + day.getDate()).slice(-2) +
              "<br>" +
              ("00" + day.getHours()).slice(-2) +
              ":" +
              ("00" + day.getMinutes()).slice(-2) +
              ":" +
              ("00" + day.getSeconds()).slice(-2);
          }
          date.rowSpan = "2";
          date.className = "date";
          // 3点リーダー
          const point = document.createElement("td");
          point.rowSpan = "2";
          point.className = "point";
          const point_button = document.createElement("button");
          point_button.className = "point_button";
          const point_img = document.createElement("img");
          point_img.className = "point-img";
          point_img.setAttribute("src", "../img/blue_point.png");
          point_img.setAttribute("alt", "3点リーダー");

          // 現在の文字数
          const txt_img = document.createElement("td");
          txt_img.className = "txt-img";
          txt_img.innerHTML = "文字数";
          const txt = document.createElement("td");
          txt.className = "txt";
          if (
            doc.data().word_input == undefined ||
            doc.data().word_input == null
          ) {
            txt.innerHTML = "不明";
          } else {
            txt.innerHTML = doc.data().word_input + "字";
          }
          // 現在の発表目安時間
          const time_img = document.createElement("td");
          time_img.className = "time-img";
          const time = document.createElement("td");
          time.className = "time";
          if (
            doc.data().time_input == undefined ||
            doc.data().time_input == null
          ) {
            time.innerHTML = "不明";
          } else {
            time.innerHTML = doc.data().time_input + "分";
          }
          // 3点リーダークリック時の枠
          const reader_wrap = document.createElement("div");
          reader_wrap.classList.add("reader-wrap", "hidden");
          const reader_ul = document.createElement("ul");
          const reader_edit_wrap = document.createElement("li");
          reader_edit_wrap.className = "reader-edit-wrap";
          const reader_edit = document.createElement("a");
          reader_edit.classList.add("reader-edit", doc_id);
          reader_edit.innerHTML = "編集する";
          const reader_delete_wrap = document.createElement("li");
          reader_delete_wrap.className = "reader-delete-wrap";
          const reader_delete = document.createElement("a");
          reader_delete.className = "reader-delete";
          reader_delete.innerHTML = "削除する";

          // HTMLに反映
          document.getElementById("all-list").appendChild(tbody);
          tbody.appendChild(list_wrap);
          list_wrap.appendChild(title_wrap);
          list_wrap.appendChild(data_wrap);
          title_wrap.appendChild(title);
          title_wrap.appendChild(date);
          title_wrap.appendChild(point);
          point.appendChild(point_button);
          point_button.appendChild(point_img);
          data_wrap.appendChild(txt_img);
          data_wrap.appendChild(txt);
          data_wrap.appendChild(time_img);
          data_wrap.appendChild(time);
          // タブも追加
          point.appendChild(reader_wrap);
          reader_wrap.appendChild(reader_ul);
          reader_ul.appendChild(reader_edit_wrap);
          reader_ul.appendChild(reader_delete_wrap);
          reader_edit_wrap.appendChild(reader_edit);
          reader_delete_wrap.appendChild(reader_delete);

          /* ドキュメントIDを送りつつページ遷移 */
          var delete_button = document.getElementsByClassName("reader-delete");
          var edit_button = document.getElementsByClassName("reader-edit");
          var eds = Array.from(edit_button);
          var dels = Array.from(delete_button);

          eds.forEach(function (ed) {
            ed.addEventListener("click", function () {
              location.href =
                "practice.html?docid=" + ed.className.split(" ")[1];
            });
          });
        });
      })();

      // 原稿を選んでページ遷移
    } else {
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
top.addEventListener("click", () => {
  location.href = "index.html";
});

// ひとつ前に戻るボタンを押すとメニュー画面に移動
back.addEventListener("click", () => {
  location.href = "index.html";
});
