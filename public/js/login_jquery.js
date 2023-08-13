$(".log-change").on("click", function () {
  if ($(".card").hasClass("flip")) {
    $(".card").removeClass("flip");
  }
});
$(".new-change").on("click", function () {
  if ($(".card").hasClass("flip")) {
  } else {
    $(".card").addClass("flip");
  }
});
