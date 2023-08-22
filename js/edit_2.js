// 強調するボタンをクリックしたときの処理
const emphasisButton = document.getElementById("emphasisButton");
emphasisButton.addEventListener("click", () => {
  // テキストエリアに挿入
  const textarea = document.getElementById("textarea");
  textarea.value =
    textarea.value.substr(0, textarea.selectionStart) +
    "<< 強調する >>" +
    textarea.value.substr(textarea.selectionStart);
});
//  間をおくボタンをクリックしたときの処理
const maButton = document.getElementById("maButton");
maButton.addEventListener("click", () => {
  // テキストエリアに挿入
  const textarea = document.getElementById("textarea");
  textarea.value =
    textarea.value.substr(0, textarea.selectionStart) +
    "<< 間をおく >>" +
    textarea.value.substr(textarea.selectionStart);
});
//  見わたすボタンをクリックしたときの処理
const miwaButton = document.getElementById("miwaButton");
miwaButton.addEventListener("click", () => {
  // テキストエリアに挿入
  const textarea = document.getElementById("textarea");
  textarea.value =
    textarea.value.substr(0, textarea.selectionStart) +
    "<< 見わたす >>" +
    textarea.value.substr(textarea.selectionStart);
});
//  休憩するボタンをクリックしたときの処理
const kyukeiButton = document.getElementById("kyukeiButton");
kyukeiButton.addEventListener("click", () => {
  // テキストエリアに挿入
  const textarea = document.getElementById("textarea");
  textarea.value =
    textarea.value.substr(0, textarea.selectionStart) +
    "<< 休憩する >>" +
    textarea.value.substr(textarea.selectionStart);
});

// ダウンロードボタンが押されたとき
const downloadButton_PC = document.getElementById("download_pc");
const downloadButton_SM = document.getElementById("download_sm");
downloadButton_PC.addEventListener("click", () => {
  Swal.fire({
    title: "ファイルダウンロード",
    html: "現在の原稿をテキストファイルとして保存しますか？<br>※データが保存されるわけではありません",
    type: "question",
    showCancelButton: true,
    confirmButtonColor: "#1AA7C5",
    confirmButtonText: "保存する",
    cancelButtonText: "やめる",
  }).then(async (result) => {
    if (result.value) {
      let idealWords = document.querySelector(".mojisu").value;
      if (idealWords == null || idealWords == undefined || idealWords == "") {
        idealWords = 0;
      }
      let idealTime = document.querySelector(".time").value;
      if (idealTime == null || idealTime == undefined || idealTime == "") {
        idealTime = 0;
      }
      let idealSec = document.querySelector(".time_second").value;
      if (idealSec == null || idealSec == undefined || idealSec == "") {
        idealSec = 0;
      }
      const title = document.querySelector(".genko_title").value;
      const text = document.getElementById("textarea").value;
      const inputWords = document.getElementById("inputlength").innerText;
      const inputTime = document.getElementById("inputtime").innerText;
      const inputSec = document.getElementById("inputsec").innerText;

      const combinedContent = `入力された文字数：${inputWords}文字 目標文字数：${idealWords}文字
発表時間の目安：${inputTime}分${inputSec}秒  目標発表時間：${idealTime}分${idealSec}秒

<本文>
${text}
  `;

      const fileName = title + ".txt"; // ダウンロードするファイルの名前

      const blob = new Blob([combinedContent], { type: "text/plain" }); // Blobオブジェクトを作成

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();

      URL.revokeObjectURL(link.href); // URLを解放
    }
  });
});

downloadButton_SM.addEventListener("click", () => {
  Swal.fire({
    title: "ファイルダウンロード",
    html: "現在の原稿をテキストファイルとして保存しますか？<br>※データが保存されるわけではありません",
    type: "question",
    showCancelButton: true,
    confirmButtonColor: "#1AA7C5",
    confirmButtonText: "保存する",
    cancelButtonText: "やめる",
  }).then(async (result) => {
    if (result.value) {
      let idealWords = document.querySelector(".mojisu").value;
      if (idealWords == null || idealWords == undefined || idealWords == "") {
        idealWords = 0;
      }
      let idealTime = document.querySelector(".time").value;
      if (idealTime == null || idealTime == undefined || idealTime == "") {
        idealTime = 0;
      }
      let idealSec = document.querySelector(".time_second").value;
      if (idealSec == null || idealSec == undefined || idealSec == "") {
        idealSec = 0;
      }
      const title = document.querySelector(".genko_title").value;
      const text = document.getElementById("textarea").value;
      const inputWords = document.getElementById("inputlength").innerText;
      const inputTime = document.getElementById("inputtime").innerText;
      const inputSec = document.getElementById("inputsec").innerText;

      const combinedContent = `入力された文字数：${inputWords}文字 目標文字数：${idealWords}文字
発表時間の目安：${inputTime}分${inputSec}秒  目標発表時間：${idealTime}分${idealSec}秒

<本文>
${text}
  `;

      const fileName = title + ".txt"; // ダウンロードするファイルの名前

      const blob = new Blob([combinedContent], { type: "text/plain" }); // Blobオブジェクトを作成

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();

      URL.revokeObjectURL(link.href); // URLを解放
    }
  });
});

/*目標時間・目標文字数計算*/
function isNaturalNumber(value) {
  var parsedValue = parseInt(value, 10);
  return !isNaN(parsedValue) && parsedValue > 0;
}

function updateTime(value) {
  var minInput = document.getElementsByClassName("time")[0];
  var secInput = document.getElementsByClassName("time_second")[0];

  if (isNaturalNumber(value)) {
    var mojisu = parseInt(value, 10);
    var time = (mojisu * 0.2) / 60;
    var decimal = parseFloat("0." + ("" + time).split(".")[1]);
    var sec = decimal * 60;
    minInput.value = Math.floor(time);
    secInput.value = Math.floor(sec);
  } else {
    timeInput.value = "";
  }
}

function updateMojisuWithMin(value) {
  var mojisuInput = document.getElementsByClassName("mojisu")[0];
  var secInput = document.getElementsByClassName("time_second")[0].value;
  var sec = 0;

  if (isNaturalNumber(value)) {
    var time = parseFloat(value);
    if (isNaturalNumber(secInput)) {
      sec = parseFloat(secInput);
    }
    var mojisu = (time * 60) / 0.2 + sec / 0.2;
    mojisuInput.value = Math.round(mojisu);
  } else if (isNaturalNumber(secInput)) {
    sec = parseFloat(secInput);
    var mojisu = sec / 0.2;
    mojisuInput.value = Math.round(mojisu);
  } else {
    mojisuInput.value = "";
  }
}
function updateMojisuWithSec(value) {
  var mojisuInput = document.getElementsByClassName("mojisu")[0];
  var minInput = document.getElementsByClassName("time")[0].value;
  var min = 0;

  if (isNaturalNumber(value)) {
    var time = parseFloat(value);
    if (isNaturalNumber(minInput)) {
      min = parseFloat(minInput);
    }
    var mojisu = time / 0.2 + (min * 60) / 0.2;
    mojisuInput.value = Math.round(mojisu);
  } else if (isNaturalNumber(minInput)) {
    min = parseFloat(minInput);
    var mojisu = (min * 60) / 0.2;
    mojisuInput.value = Math.round(mojisu);
  } else {
    mojisuInput.value = "";
  }
}

/*文字数カウント*/
function Length(str) {
  // 改行文字と空白文字を取り除く
  var cleanedStr = str
    .replace(/\s+/g, "")
    .replace(/\n+/g, "")
    .replace(/<<\s*強調する\s*>>/g, "")
    .replace(/<<\s*間をおく\s*>>/g, "")
    .replace(/<<\s*見わたす\s*>>/g, "")
    .replace(/<<\s*休憩する\s*>>/g, "");
  document.getElementById("inputlength").innerHTML = cleanedStr.length;
  var time = (cleanedStr.length * 0.2) / 60;
  var decimal = parseFloat("0." + ("" + time).split(".")[1]);
  var sec = decimal * 60;
  document.getElementById("inputtime").innerHTML = Math.floor(time);
  document.getElementById("inputsec").innerHTML = Math.floor(sec);
}
