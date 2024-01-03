// Initialize the map and assign it to a variable for later use
// there's a few ways to declare a VARIABLE in javascript.
// you might also see people declaring variables using `const` and `let`
var map = L.map('map', {
    // Set latitude and longitude of the map center (required)
    center: [38.89, -77.03],
    // Set the initial zoom level, values 0-18, where 0 is most zoomed-out (required)
    zoom: 11
});

// Create a Tile Layer and add it to the map
var tiles = new L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: '15'
}).addTo(map);

var marker = L.marker(
    [38.89, -77.03],
    {
        draggable: true,
        title: "",
        opacity: 0.75
    }).addTo(map)


// Add a listener to the map for clicks
map.on('click', function (event) {
    const clickedLocation = event.latlng;
    updateMarker(clickedLocation);
});

function updateMarker(location) {
    marker.setLatLng([location.lat, location.lon]);
    marker.addTo(map)
        .bindPopup(`<p1>${location.display_name}</p1>`).openPopup();
}

function searchLocation(location) {
    // Use the Nominatim service to convert location name to coordinates
    const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                $(".search-container").append(`<ul class="dropdown-menu"></ul>`)
                data.forEach(element => {
                    let item = $(`
                        <li><a class="dropdown-item" href="#">${element.display_name}</a></li>
                    `).appendTo(".search-container .dropdown-menu")

                    item.on('click', function() {
                        changeLocation(element)
                    })
                });
                
            } else {
                alert('Location not found');
            }
        })
        .catch(error => console.error('Error:', error));
}

function changeLocation(location) {
    console.log(location)

    map.setView([location.lat, location.lon], 10);

    // Update the marker position
    updateMarker(location);
}