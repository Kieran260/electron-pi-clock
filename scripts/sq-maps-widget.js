const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_MAPS_API_KEY,
  Promise: Promise
});

function initMap() {
  // Specify the starting and ending locations
  const origin = 'L3 5UF';
  const destination = 'L3 6AU';

  // Specify the arrival time
  const arrivalTime = new Date('2023-10-10T10:00:00');

  // Send the directions request to the Google Maps Directions service
  googleMapsClient.directions({
    origin: origin,
    destination: destination,
    mode: 'walking',
    arrival_time: arrivalTime
  }, function(err, response) {
    if (err) {
      console.log('Directions request failed with error: ' + err);
      return;
    }

    const result = response.json;
    const status = result.status;

    if (status === 'OK') {
      // Extract the transit distance and duration from the result
      const distance = result.routes[0].legs[0].distance.text;
      const duration = result.routes[0].legs[0].duration.text;

      // Calculate the estimated departure time
      const estimatedDepartureTime = new Date(arrivalTime.getTime() - (result.routes[0].legs[0].duration.value * 1000));
      const estimatedDepartureTimeString = estimatedDepartureTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      // Update the duration and departure time in the HTML
      $('#duration').html('Estimated Time: <b>' + duration + '</b>');
      $('#arrival').html('Arrival Time: <b>' + arrivalTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + '</b>');
      $('#departure').html('Depart Before: <b>' + estimatedDepartureTimeString + '</b>');

    } else {
      console.log('Directions request failed with status: ' + status);
    }
  });
}

module.exports = {
  init: initMap,
};
