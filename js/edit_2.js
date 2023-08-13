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
    timeInput.value = "";
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
  const n = (cleanedStr.length * 0.2) / 60;
  document.getElementById("inputtime").innerHTML = n.toFixed(2);
}
