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
