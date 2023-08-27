// ハンバーガーボタン
$(".hmb-img-sp").click(function () {
  if ($(".hmb-img-sp").hasClass("opened")) {
    $(".hmb-img-sp").removeClass("opened");
    if (window.matchMedia("(max-width: 300px)").matches) {
      $(".user_button-sp").animate(
        { marginTop: "75px" },
        {
          duration: 300,
          complete: function () {
            $(".user-sp").css({ cssText: "display: none !important;" });
          },
        }
      );
      $("#fullicon-sp").animate(
        { marginTop: "75px" },
        {
          duration: 300,
          complete: function () {
            $("#fullicon-sp").css({ cssText: "display: none !important;" });
          },
        }
      );
    } else {
      $(".user_button-sp").animate(
        { marginTop: "55px" },
        {
          duration: 300,
          complete: function () {
            $(".user-sp").css({ cssText: "display: none !important;" });
          },
        }
      );
      $("#fullicon-sp").animate(
        { marginTop: "55px" },
        {
          duration: 300,
          complete: function () {
            $("#fullicon-sp").css({ cssText: "display: none !important;" });
          },
        }
      );
    }
  } else {
    $(".hmb-img-sp").toggleClass("opened");
    $(".user-sp").css({ cssText: "display: block !important;" });
    $("#fullicon-sp").css({ cssText: "display: block !important;" });
    $(".user_button-sp").animate({ marginTop: "150px" });
    $("#fullicon-sp").animate({ marginTop: "230px" });
  }
});

// ユーザーボタン
$(".user-img").click(function () {
  $(this).toggleClass("active");
  $("#user-wrap").toggleClass("panelactive");
});
$(".user-img-sp").click(function () {
  $(this).toggleClass("active");
  $("#user-wrap-sp").toggleClass("panelactive");
});

// ユーザータブ
$("#user-wrap p").click(function () {
  $(".openbtn1").removeClass("active");
  $("#user-wrap").removeClass("panelactive");
});
$("#user-wrap-sp p").click(function () {
  $(".openbtn1").removeClass("active");
  $("#user-wrap-sp").removeClass("panelactive");
});

// メッセージのフェードイン・フェードアウト
$(function () {
  setTimeout(function () {
    $(".message-wrap").fadeIn(800);
  }, 500);
});
$("#MicOn").click(function () {
  setTimeout(function () {
    $(".message-wrap").fadeOut(800);
  }, 500);
});
