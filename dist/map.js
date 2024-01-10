// Initialize the map and assign it to a variable for later use
var map = L.map('map', {
    // Set latitude and longitude of the map center (required)
    center: [49.83, 19.05],
    // Set the initial zoom level, values 0-18, where 0 is most zoomed-out (required)
    zoom: 11,
    // Set map bounds
    maxBounds: new L.latLngBounds(
        L.latLng(51, 18), // Southwest corner (Czechowice-Dziedzice)
        L.latLng(48, 20)  // Northeast corner (Ujsoły)
    ),
    maxBoundsViscosity: 1.0
});

// Create a Tile Layer and add it to the map
var tiles = new L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: '15'
}).addTo(map);

var marker = L.marker(
    [49.83, 19.05],
    {
        draggable: true,
        title: "",
        opacity: 0.75
    }).addTo(map)

function updateMarker(location) {
    marker.setLatLng([location.lat, location.lng]);

    if (!location.display_name) return;

    marker.addTo(map)
        .bindPopup(`<p1>${location.display_name}</p1>`)
        .openPopup();

    // Add popup on marker click
    const popup = marker.getPopup()
    $(popup._wrapper).on('click', function () {
        animateInfoBoxHiding()
        showInformation(location)
    })
}

function searchLocation(location) {
    removeDropdown()

    // Use the Nominatim service to convert location name to coordinates
    const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&country=poland&city=${encodeURIComponent(location)}`;

    searchRequest = fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            searchRequest = null;

            if (data.length) {
                data = data.map(obj => {
                    // Add lng property because API returns lon
                    return { ...obj, lng: obj.lon };
                })

                addDropdown(data)
            }
            else {
                alert('Location not found.');
            }
        })
        .catch(error => console.error('Error:', error));
}

function changeLocation(location) {
    console.log(location)

    const mapBounds = map.options.maxBounds

    if (!mapBounds.contains(location)) {
        alert("Sorry, the city is outside the map's coverage area.")
        return;
    }

    map.setView([location.lat, location.lng], 10);

    // Update the marker position
    updateMarker(location);
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    const location = { lat: position.coords.latitude, lng: position.coords.longitude }
    changeLocation(location)
}