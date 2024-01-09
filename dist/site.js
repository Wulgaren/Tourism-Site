var timeoutId;

$('#search').on('keydown', addSearchEnter)

function addSearchEnter(event) {
    let searchInput = $("#search")

    if (event.key == "Enter") {
        searchLocation(searchInput.val())
    }
    else {
        // Clear the previous timeout, if any
        clearTimeout(timeoutId);

        // Set a new timeout for 500 milliseconds (adjust as needed)
        timeoutId = setTimeout(function () {
            searchLocation(searchInput.val())
        }, 500);
    }
}

function addDropdown(data) {
    $(".search-container").append(`<ul class="dropdown-menu show"></ul>`)

    data.forEach(element => {
        let item = $(`
            <li><a class="dropdown-item" href="#">${element.display_name}</a></li>
        `).appendTo(".search-container .dropdown-menu")

        item.on('click', function () {
            removeDropdown()
            changeLocation(element)
        })
    });
}

function removeDropdown() {
    $(".search-container .dropdown-menu").remove()
}


