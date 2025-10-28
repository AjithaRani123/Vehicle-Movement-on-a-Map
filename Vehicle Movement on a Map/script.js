// Wait for the page to load completely
document.addEventListener('DOMContentLoaded', () => {

  // Initialize map (centered at Hyderabad)
  const map = L.map('map').setView([17.385044, 78.486671], 15);

  // Add OpenStreetMap layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Dummy route data (more points = smoother movement)
  const route = [
    [17.385044, 78.486671],
    [17.385100, 78.486750],
    [17.385150, 78.486850],
    [17.385200, 78.486950],
    [17.385250, 78.487050],
    [17.385300, 78.487150],
    [17.385350, 78.487250],
    [17.385400, 78.487350],
    [17.385450, 78.487450],
    [17.385500, 78.487550],
    [17.385550, 78.487650],
    [17.385600, 78.487750],
    [17.385650, 78.487850],
    [17.385700, 78.487950],
    [17.385750, 78.488050],
    [17.385800, 78.488150]
  ];

  // Draw the route path
  L.polyline(route, { color: 'gray', weight: 4 }).addTo(map);

  // Create the car marker
  const carIcon = L.divIcon({
    className: 'car-icon',
    html: '🚗',
    iconSize: [30, 30],
  });

  let marker = L.marker(route[0], { icon: carIcon }).addTo(map);

  let currentIndex = 0;
  let intervalId = null;

  // Function to move vehicle
  function moveVehicle() {
    if (currentIndex < route.length - 1) {
      currentIndex++;
      marker.setLatLng(route[currentIndex]);
      map.panTo(route[currentIndex], { animate: true });
    } else {
      clearInterval(intervalId);
      intervalId = null;
      alert("🚗 Vehicle reached the destination!");
    }
  }

  // Start button
  document.getElementById('startBtn').addEventListener('click', () => {
    if (!intervalId) {
      intervalId = setInterval(moveVehicle, 1000); // move every 1 second
    }
  });

  // Stop button
  document.getElementById('stopBtn').addEventListener('click', () => {
    clearInterval(intervalId);
    intervalId = null;
  });

});