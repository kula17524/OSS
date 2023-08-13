$(".user-img").click(function () {
  //ボタンがクリックされたら
  $(this).toggleClass("active"); //ボタン自身に activeクラスを付与し
  $("#user-wrap").toggleClass("panelactive"); //ナビゲーションにpanelactiveクラスを付与
});

$("#user-wrap p").click(function () {
  //ナビゲーションのリンクがクリックされたら
  $(".openbtn1").removeClass("active"); //ボタンの activeクラスを除去し
  $("#user-wrap").removeClass("panelactive"); //ナビゲーションのpanelactiveクラスも除去
});

$(".user-img-sp").click(function () {
  //ボタンがクリックされたら
  $(this).toggleClass("active"); //ボタン自身に activeクラスを付与し
  $("#user-wrap-sp").toggleClass("panelactive"); //ナビゲーションにpanelactiveクラスを付与
});

$("#user-wrap-sp p").click(function () {
  //ナビゲーションのリンクがクリックされたら
  $(".openbtn1").removeClass("active"); //ボタンの activeクラスを除去し
  $("#user-wrap-sp").removeClass("panelactive"); //ナビゲーションのpanelactiveクラスも除去
});

// 3点リーダーが押されたらタブの表示変更
$(document).on("click", ".point_button", function () {
  $(this).next().toggleClass("hidden");
});

// タブの領域外がクリックされたらそのタブを閉じる
$(document).on("click", function (e) {
  jQuery(".point_button").each(function (i, v) {
    if (
      !$(e.target).closest(jQuery(v)).length &&
      !$(e.target).closest(jQuery(v).next()).length
    ) {
      jQuery(v).next().addClass("hidden");
    }
  });
});
