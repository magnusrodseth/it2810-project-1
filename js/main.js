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
});
