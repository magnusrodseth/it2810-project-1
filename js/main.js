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

  $(".circle.red").click(() => {
    $(".circle.red").toggleClass("toggle-circle-color");
  });

  $(document).on("input", "#svg-range", () => {
    const value = $("#svg-range").val();
    $(".square.orange").css("transform", `scale(${value})`);
  })

});
