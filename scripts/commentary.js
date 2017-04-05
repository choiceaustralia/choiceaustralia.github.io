var slider = document.getElementById("time-slider");

slider.oninput = function(slideAmount) {

  var selectedDiv = "dv-400";

  if (this.value > -3) {
    selectedDiv = "dv-000";
  } else {
    var rounded = Math.floor(this.value / 100) * 100;
    // force some rounding
    selectedDiv = "dv" + rounded;
  }

  var textDiv = document.getElementById(selectedDiv);
  
  document.querySelectorAll(".p-title-shown").forEach(function(item) {
    item.className = "p-title-hidden";
  });

  textDiv.className = "p-title-shown";
}
