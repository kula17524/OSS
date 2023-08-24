// htmlと連携
var control = document.getElementById("Control");
var start_button = document.getElementById("MicOn");
var microphone = document.getElementById("startBtn");
var microphone_pic = document.getElementById("blue_mike_Button");
var timerMin = document.getElementById("timer_min");
var timerSec = document.getElementById("timer_sec");
//タイマー
var timer_flag = 0; // 0:停止中 1:動作中
var time = 0;
// マイクのクリック回数
var count = 0;

// マイクの画像をクリック回数に応じて切り替え
microphone.addEventListener("click", function () {
  if (count == 0) {
    microphone_pic.src = "./img/microphone_stop.png";
    count += 1;
  } else if (count == 1) {
    microphone_pic.src = "./img/microphone_restart.png";
    count += 1;
  } else {
    microphone_pic.src = "./img/microphone_start.png";
    count = 0;
  }
});

// 録音再生
var TMamMicRec = function (control, start_button, microphone) {
  this.control = control;
  this.start_button = start_button;
  this.microphone = microphone;

  this.stream = null;
  this.mediaRecorder = null;
  this.chunks = [];
  this.type = null;

  this.microphone.setAttribute("disabled", true);
  // マイクの使用許可確認
  this.start_button.addEventListener(
    "click",
    function () {
      if (navigator.mediaDevices == undefined) {
        // ブラウザに関するエラー表示
        Swal.fire({
          type: "error",
          title: "ブラウザエラー",
          html: "未対応ブラウザ または HTTPS接続していません。<br>別のブラウザをお試しください。<br>推奨：Google Chrome",
          showConfirmButton: true,
          confirmButtonText: "ＯＫ",
          confirmButtonColor: "#d33",
        });
        return;
      }
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(
          function (stream) {
            this.microphone.removeAttribute("disabled");
            this.stream = stream;

            // 録音可能な状態にする
            this.mediaRecorder = new MediaRecorder(this.stream);
            this.mediaRecorder.addEventListener(
              "dataavailable",
              function (event) {
                this.chunks.push(event.data);
              }.bind(this)
            );
            // 録音停止で再生
            this.mediaRecorder.addEventListener(
              "stop",
              function (e) {
                // audio/webm;codecs=opus audio/ogg; codecs=opus
                this.type = this.chunks[0].type;
                let blob = new Blob(this.chunks, { type: this.type });
                this.chunks = [];

                //録音したblobをDataURIスキームに変換して<audio>タグでそのまま再生する
                let fileReaderAudio = new FileReader();
                fileReaderAudio.addEventListener(
                  "load",
                  function (event) {
                    let audio_play = document.body.querySelector("#audio_play");
                    if (audio_play == null) {
                      audio_play = document.createElement("audio");
                      audio_play.controls = true;
                      audio_play.setAttribute("id", "audio_play");
                      audio_play.setAttribute("preload", "auto");
                      this.control.appendChild(audio_play);
                    } else {
                      audio_play.pause();
                      audio_play.currentTime = 0;
                    }
                    audio_play.setAttribute("src", event.target.result);
                    audio_play.load();
                  }.bind(this)
                );
                fileReaderAudio.readAsDataURL(blob);
              }.bind(this)
            );
          }.bind(this)
        )
        .catch(
          function (e) {
            Swal.fire({
              type: "error",
              title: "再生エラー",
              html: "再生時にエラーが発生しました。",
              showConfirmButton: true,
              confirmButtonText: "ＯＫ",
              confirmButtonColor: "#d33",
            });
          }.bind(this)
        );
    }.bind(this)
  );
  // 録音開始と停止
  this.microphone.addEventListener(
    "click",
    function () {
      if (count == 1) {
        this.mediaRecorder.start();
        start();
      } else if (count == 2) {
        this.mediaRecorder.stop();
        stop();
      } else {
        audio_play.remove();
        reset();
      }
    }.bind(this)
  );
};

// 一番初めに要素を取得
window.addEventListener("DOMContentLoaded", function () {
  var mamMicRec = new TMamMicRec(control, start_button, microphone);
});

// STARTボタン
function start() {
  // 動作中にする
  timer_flag = 1;

  timer();
}

// STOPボタン
function stop() {
  // 停止中にする
  timer_flag = 0;
  // スタートボタンを押せるようにする
  microphone.disabled = false;
}

// RESETボタン
function reset() {
  // 停止中にする
  timer_flag = 0;
  // タイムを0に戻す
  time = 0;
  // タイマーラベルをリセット
  timerMin.innerHTML = "0";
  timerSec.innerHTML = "0";
  // スタートボタンを押せるようにする
  microphone.disabled = false;
}

function timer() {
  // ステータスが動作中の場合のみ実行
  if (timer_flag == 1) {
    setTimeout(function () {
      time++;

      // 分・秒・ミリ秒を計算
      var min = Math.floor(time / 100 / 60);
      var sec = Math.floor(time / 100);

      if (sec >= 60) sec = sec % 60;
      if (sec < 10) sec = sec;

      // タイマーラベルを更新
      timerMin.innerHTML = min;
      timerSec.innerHTML = sec;

      // 再びtimer()を呼び出す
      timer();
    }, 10);
  }
}
