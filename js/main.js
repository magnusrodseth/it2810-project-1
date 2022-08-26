$(document).ready(() => {
  $("#docs-button").html("Vis dokumentasjon");
  $("#docs-container").hide();

  $("#docs-button").click(() => {
    // Toggle documentation
    if (!$("#docs-container").is(":visible")) {
      $("#docs-container").show();
      $("#docs-button").html("Skjul dokumentasjon");
    } else {
      $("#docs-container").hide();
      $("#docs-button").html("Vis dokumentasjon");
    }
  });

  $(".circle.red").mouseover(() => {
    $(".circle.red").css("fill", "rgba(56, 189, 248, 0.7)");
  });

  $(".circle.red").mouseleave(() => {
    $(".circle.red").css("fill", "rgba(248, 113, 113, 0.7)");
  });
});
