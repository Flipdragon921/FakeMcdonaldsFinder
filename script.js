document.getElementById('find-location-btn').addEventListener('click', () => {
    const statusElement = document.getElementById('status');

    if (!navigator.geolocation) {
        statusElement.textContent = 'Geolocation is not supported by your browser';
    } else {
        statusElement.textContent = 'Locating...';

        navigator.geolocation.getCurrentPosition(
            (position) => {
                statusElement.textContent = 'Location found!';
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                
                // Send location data to the backend
                fetch('/location', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ latitude, longitude }),
                })
                .then(response => response.text())
                .then(data => {
                    console.log('Backend response:', data);
                    // You can update the status or display fake results here
                    statusElement.textContent = 'Finding nearest McDonald\'s...';
                    // In a real scenario, you would now fetch nearby McDonald\'s based on the location
                    // For this example, we\'ll just show a success message after a delay
                    
                    // Create and display a fake Google Maps link
                    const mapLink = document.createElement('a');
                    mapLink.href = 'https://www.google.com/maps/search/McDonald\'s'; // Placeholder URL
                    mapLink.textContent = 'View on Google Maps';
                    mapLink.target = '_blank'; // Open in a new tab

                    // Clear previous status and append the link
                    statusElement.textContent = '';
                    statusElement.appendChild(mapLink);

                })
                .catch((error) => {
                    console.error('Error sending location to backend:', error);
                    statusElement.textContent = 'Error finding location.';
                });
            },
            (error) => {
                statusElement.textContent = 'Error: ' + error.message;
            }
        );
    }
}); 