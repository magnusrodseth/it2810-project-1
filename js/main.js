$(document).ready(() => {
  $("#docs-button").html("Vis dokumentasjon");
  $("#docs-container").hide();

  $("#docs-button").click(() => {
    // Toggle documentation container
    if (!$("#docs-container").is(":visible")) {
      $("#docs-container").show();
      $("#docs-button").html("Skjul dokumentasjon");
    } else {
      $("#docs-container").hide();
      $("#docs-button").html("Vis dokumentasjon");
    }
  });

  $("#svg-piece").mouseover(() => {
    $(".square.green").addClass("rotate");
    $(".circle.yellow").addClass("scale");
    $(".polygon.magenta").addClass("flip");
    $(".square.orange").addClass("skew");

    // Add some variation to the red circle's animation
    $(".circle.red").addClass("scale");
    $(".circle.red").css({
      "animation-direction": "reverse",
      "animation-duration": "4s",
    });

    $("#svg-parent").addClass("move-around");
  });

  $("#svg-piece").mouseleave(() => {
    $(".square.green").removeClass("rotate");
    $(".circle.yellow").removeClass("scale");
    $(".polygon.magenta").removeClass("flip");
    $(".circle.red").removeClass("scale");
    $(".square.orange").removeClass("skew");
    $("#svg-parent").removeClass("move-around");
  });
});
