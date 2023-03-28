const $ = require('jquery');


$(function() {
    // Load digital-clock widget and execute its script
    $.get('./widgets/rec/digital-clock.html', function(data) {
        $('#widget-1').html(data);
        $.getScript('./scripts/rec-digital-clock.js').done(function() {
        const digitalClock = require('./scripts/rec-digital-clock.js');
        digitalClock.init();
        });
    });

    // Load maps-widget and execute its script
    $.get('./widgets/sq/maps-widget.html', function(data) {
        $('#widget-2').html(data);
        $.getScript('./scripts/sq-maps-widget.js').done(function() {
        const mapsWidget = require('./scripts/sq-maps-widget.js');
        mapsWidget.init();
        });
    });
    

    // Load calendar-widget and execute its script
    $.get('./widgets/sq/calendar-widget.html', function(data) {
        $('#widget-3').html(data);
        $.getScript('./scripts/sq-calendar-widget.js').done(function() {
        const calendarWidget = require('./scripts/sq-calendar-widget.js');
        calendarWidget.init();
        });
    });

    // Load habit-tracker widget and execute its script
    $.get('./widgets/rec/habit-tracker.html', function(data) {
        $('#widget-4').html(data);
        $.getScript('./scripts/rec-habit-tracker.js');
    });

    $('.main-container').css('background-image', 'url("./assets/background-images/blue-theme.png")');
});
