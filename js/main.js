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

  $(".polygon.magenta").mouseover(() => {
    $(".polygon.magenta").css("fill", "#38bdf8");
  });

  $(".polygon.magenta").mouseleave(() => {
    $(".polygon.magenta").css("fill", "#e879f9");
  });

  $(".circle.red").mouseover(() => {
    $(".circle.red").addClass("scale");
  });

  $(".circle.red").mouseleave(() => {
    $(".circle.red").removeClass("scale");
  });
});
