function updateClock() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  var timeString = formatTime(hours) + ":" + formatTime(minutes);
  $('.time').text(timeString);
}

function formatTime(time) {
  if (time < 10) {
    return "0" + time;
  } else {
    return time;
  }
}

function init() {
  setInterval(updateClock, 1000);
}

module.exports = {
  init: init
};
