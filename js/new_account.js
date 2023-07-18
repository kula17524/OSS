register.addEventListener("click", function (e) {
  var mailAddress = document.getElementById("mailAddress").value;
  var password = document.getElementById("password").value;

  firebase
    .auth()
    .createUserWithEmailAndPassword(mailAddress, password)
    .catch(function (error) {
      alert("登録できません（" + error.message + "）");
    });
});
