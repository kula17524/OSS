import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  fetchSignInMethodsForEmail,
  EmailAuthProvider,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: config.APIKEY,
  authDomain: config.AUTH,
  projectId: config.PROJECTID,
  storageBucket: config.BUCKET,
  messagingSenderId: config.SENDID,
  appId: config.APPID,
};

// Initialize Firebase
initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
let login_button = document.getElementById("login-button");
let new_button = document.getElementById("new-button");
document.getElementById("login-error-text").innerText = "　";
document.getElementById("new-error-text").innerText = "　";
setPersistence(auth, browserLocalPersistence);

history.replaceState(null, null, null);
history.pushState(null, null, null);
window.addEventListener("popstate", function (e) {
  history.pushState(null, null, null);
  return;
});

window.onload = function () {
  onAuthStateChanged(auth, (user) => {
    //-----------------------------------
    // ログインチェック
    //-----------------------------------
    if (user) {
      location.href = "index.html";
    }
  });
};

window.onpageshow = function (event) {
  if (event.persisted) {
    onAuthStateChanged(auth, (user) => {
      //-----------------------------------
      // ログインチェック
      //-----------------------------------
      if (user) {
        location.href = "index.html";
      }
    });
  }
};

document.addEventListener("DOMContentLoaded", function () {
  // ログイン
  login_button.addEventListener(
    "click",
    function () {
      var mailAddress = document.getElementById("login-mail").value;
      var password = document.getElementById("login-pass").value;
      document.getElementById("login-error-text").innerText = "　";

      signInWithEmailAndPassword(auth, mailAddress, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          location.href = "index.html";
        })
        .catch((error) => {
          if (mailAddress == "" || password == "") {
            document.getElementById("login-error-text").innerText =
              "空欄の項目があります。";
          } else {
            document.getElementById("login-error-text").innerText =
              "入力に誤りがあります。";
          }
        });
    },
    false
  );
  new_button.addEventListener(
    "click",
    async function () {
      try {
        var mailAddressNew = document.getElementById("new-mail").value;
        var passwordNew = document.getElementById("new-pass").value;
        document.getElementById("new-error-text").innerText = "　";

        const providers = await fetchSignInMethodsForEmail(
          auth,
          mailAddressNew
        );
        if (
          providers.includes(EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD)
        ) {
          document.getElementById("new-error-text").innerText =
            "登録済みのアドレスです";
          throw "wrong input";
        }
        if (mailAddressNew == "" || passwordNew == "") {
          document.getElementById("new-error-text").innerText =
            "空欄の項目があります。";
          throw "wrong input";
        }
        Swal.fire({
          title: "登録確認",
          html:
            "以下のアカウントを作成してよろしいですか？<br>メールアドレス：" +
            mailAddressNew +
            "<br>パスワード：***(安全のため非表示)",
          type: "question",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#1AA7C5",
          confirmButtonText: "作成する",
          cancelButtonText: "やめる",
        }).then((result) => {
          if (result.value) {
            createUserWithEmailAndPassword(auth, mailAddressNew, passwordNew)
              .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                this.location.href = "index.html";
              })
              .catch((error) => {
                if ((error = "invalid-email")) {
                  document.getElementById("new-error-text").innerText =
                    "不正なメールアドレスです。";
                } else if (error == "email-already-in-use") {
                  document.getElementById("new-error-text").innerText =
                    "登録済みのアドレスです。";
                } else {
                  document.getElementById("new-error-text").innerText =
                    "入力に誤りがあります。";
                }
              });
          }
        });
      } catch (e) {
        console.log(e);
      }
    },
    false
  );
});
