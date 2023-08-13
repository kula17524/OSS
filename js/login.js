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

// エラー取得用
class WrongError extends Error {
  constructor(message) {
    super(message);
    this.name = "WrongError";
  }
}
class AlreadyError extends Error {
  constructor(message) {
    super(message);
    this.name = "AlreadyError";
  }
}
class PassError extends Error {
  constructor(message) {
    super(message);
    this.name = "PassError";
  }
}

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
  /* 新規登録 */
  new_button.addEventListener(
    "click",
    async function () {
      try {
        var mailAddressNew = document.getElementById("new-mail").value;
        var passwordNew = document.getElementById("new-pass").value;
        document.getElementById("new-error-text").innerText = "　";

        if (mailAddressNew == "" || passwordNew == "") {
          document.getElementById("new-error-text").innerText =
            "空欄の項目があります。";
          throw new WrongError("wrong-input");
        } else if (passwordNew.length < 6) {
          throw new PassError("weak-password");
        }

        const providers = await fetchSignInMethodsForEmail(
          auth,
          mailAddressNew
        );
        console.log({ mailAddressNew, passwordNew });
        if (
          providers.includes(EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD)
        ) {
          document.getElementById("new-error-text").innerText =
            "登録済みのアドレスです";
          throw new AlreadyError("email-already-in-use");
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
                //this.location.href = "index.html";
              })
              .catch((error) => {
                console.log(error);
                if (error == "weak-password" || error instanceof PassError) {
                  document.getElementById("new-error-text").innerText =
                    "パスワードは6文字以上にしてください。";
                } else if (error == "email-already-in-use") {
                  document.getElementById("new-error-text").innerText =
                    "登録済みのアドレスです。";
                } else if (error instanceof WrongError) {
                  document.getElementById("new-error-text").innerText =
                    "空欄の項目があります。";
                } else if (error == "invalid-email") {
                  document.getElementById("new-error-text").innerText =
                    "メールアドレスの形式ではありません。";
                } else {
                  document.getElementById("new-error-text").innerText =
                    "入力に誤りがあります。";
                }
              });
          }
        });
      } catch (error) {
        if (error instanceof WrongError) {
          document.getElementById("new-error-text").innerText =
            "空欄の項目があります。";
          console.log(error);
        } else if (
          error == "email-already-in-use" ||
          error instanceof AlreadyError
        ) {
          document.getElementById("new-error-text").innerText =
            "登録済みのアドレスです。";
          console.log(error);
        } else if (error == "invalid-email") {
          document.getElementById("new-error-text").innerText =
            "メールアドレスの形式ではありません。";
        } else if (error == "weak-password" || error instanceof PassError) {
          document.getElementById("new-error-text").innerText =
            "パスワードは6文字以上にしてください。";
        } else {
          document.getElementById("new-error-text").innerText =
            "入力に誤りがあります。";
        }
      }
    },
    false
  );
});
