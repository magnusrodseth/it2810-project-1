/**
 * Generates a random integer in a given interval, lower and upper bound included.
 *
 * Inpiration: https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
 *
 * @param {*} lower is the lower bound of the interval.
 * @param {*} upper is the upper bound of the interval.
 * @returns a random integer in the provided interval.
 */
const randomIntegerInInterval = (lower, upper) =>
  Math.floor(Math.random() * (upper - lower + 1) + lower);

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
  });

  $("#svg-piece").mouseleave(() => {
    $(".square.green").removeClass("rotate");
    $(".circle.yellow").removeClass("scale");
    $(".polygon.magenta").removeClass("flip");
    $(".circle.red").removeClass("scale");
    $(".square.orange").removeClass("skew");
  });
});
