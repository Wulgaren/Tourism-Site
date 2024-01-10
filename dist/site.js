var searchRequest = null;
var timeoutId;

$('#search').on('keydown', addSearchEnter)

function addSearchEnter(event) {
    let searchInput = $("#search")

    // Check if input is a letter
    const isLetter = event.keyCode >= 65 && event.keyCode <= 90 || event.keyCode >= 97 && event.keyCode <= 122
    // Check if input is a backspace or space or enter (with added check before resending request)
    const isBackspaceOrSpaceOrEnter = event.keyCode == 32 || event.keyCode == 8 || event.keyCode == 13 && searchInput.is(":focus") && !searchRequest

    if (isLetter || isBackspaceOrSpaceOrEnter) {
        // Clear the previous timeout, if any
        clearTimeout(timeoutId);

        // Set a new timeout for 500 milliseconds (adjust as needed)
        timeoutId = setTimeout(function () {
            searchLocation(searchInput.val())
        }, 500);
    }
}

function addDropdown(data) {
    // Remove search dropdown
    removeDropdown()

    // Add search dropdown container
    $(".search-container").append(`<ul class="dropdown-menu show"></ul>`)

    // Add locations to dropdown
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
    // Remove search dropdown
    $(".search-container .dropdown-menu").remove()
}

function showInformation(location) {
    console.log(location)

    $("#main").append(`
        <div class="info-box">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi magna magna, rutrum eget malesuada vel, congue at diam. Aliquam vel magna quis ligula fringilla luctus id vitae massa. Curabitur consectetur nisi a arcu fermentum feugiat. Nulla luctus in augue in posuere. Praesent vestibulum sapien ut erat suscipit, nec iaculis felis placerat. Suspendisse mi leo, mollis eu ex eget, congue rhoncus sapien. Nam congue blandit mauris a pretium. Nullam quis diam ut metus semper venenatis non ac tortor. Phasellus quis justo dignissim arcu sodales aliquam eu eget nisi. Cras blandit ullamcorper nulla vel faucibus. Sed tempor enim felis, vel porta est suscipit ut.

            Nunc at scelerisque nulla. Nunc ac elit sed erat pulvinar faucibus. Praesent ipsum velit, pulvinar quis sapien vitae, volutpat lacinia nisi. Duis lectus urna, ultricies sed aliquet non, suscipit sit amet sem. Praesent sapien ipsum, ullamcorper at mi in, tristique placerat libero. Vestibulum efficitur tincidunt sollicitudin. Mauris non tincidunt lorem. Praesent auctor, dolor sit amet lobortis rhoncus, magna mauris congue augue, in tristique ex enim eget urna. Aenean vitae tincidunt dolor, non gravida lectus. Donec dictum pulvinar massa, sit amet sollicitudin nisi malesuada vel. Etiam nunc arcu, condimentum at maximus vel, pretium quis sem. Quisque luctus enim in cursus iaculis. Sed sed dignissim leo, a fringilla odio. Mauris at sapien quis velit blandit varius porta nec quam. Nullam dapibus felis et nisl semper varius non vitae libero.
            
            Etiam nec nisl ornare, ultrices eros et, mattis nisi. Sed dolor augue, consequat ac facilisis ac, ultricies eget nibh. Suspendisse id erat a nisl aliquet bibendum in quis justo. Nulla in vulputate erat, nec bibendum nibh. Integer consequat orci et orci dignissim pellentesque in id justo. Cras rhoncus felis posuere, pulvinar tortor in, varius magna. Nam tellus risus, vestibulum sed tincidunt non, sollicitudin vel ante. Nunc id lobortis massa. Aliquam semper est in blandit scelerisque. Curabitur quis elit dolor. Sed varius lobortis efficitur.
            
            Nullam nisl odio, rutrum sit amet tincidunt sed, varius sed enim. Fusce vulputate interdum lacus in rhoncus. Nulla facilisi. Aenean eu tempor nunc, nec malesuada orci. Nam ac magna eu mauris dignissim laoreet. Ut dolor dui, imperdiet ac nisl vel, volutpat fringilla magna. In et felis purus. Nam at velit quis urna tristique scelerisque quis vitae sapien. Quisque porta velit eget dolor pulvinar, molestie aliquam nisi sollicitudin.
            
            Proin convallis volutpat venenatis. Suspendisse potenti. Proin ut maximus ex. Aliquam erat volutpat. Vivamus pellentesque aliquam arcu, a ultrices est lobortis vitae. Donec ac pulvinar lacus, vel vestibulum orci. Nullam semper consectetur ultrices. Praesent scelerisque lorem vitae ipsum porta, at auctor felis dapibus. Nulla pretium, risus ut aliquet pretium, urna elit ultrices diam, quis ultricies risus felis eu nulla.        
        </div>
    `)

    let infoBox = $('.info-box')

    infoBox.on('swiped-down', function() {
        infoBox.animate({
            bottom: -1000
        }, 600, function() {
            infoBox.remove();
        })
    })

    // Remove info-box on outside click
    setTimeout(function() {
        $("#main").one('click', function() {
            infoBox.remove();
        })
    }, 0)    
}