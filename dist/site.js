document.addEventListener('DOMContentLoaded', e => {
    $('#search').on('keydown', function(event) {
        if (event.key == "Enter") {
            searchLocation($(this).val())
        }
    })
}, false);
