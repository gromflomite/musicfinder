let buttonsong = document.getElementById('buttonsong');

buttonsong.addEventListener('click', function() {
    let song = document.getElementById('searchbox').value;

    // Checkpoint ------------------------------
    console.log(song);

    fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=' + song)
        .then(function(response) {
            return response.json();
        })
        .then(function(myJSON) {

            // Checkpoint ------------------------------            
            console.log(myJSON.data[0].preview);

            let userSong = document.getElementById("resultbox");
            userSong.innerHTML = '<p>Playing artist: ' + myJSON.data[0].artist.name + '</p>' + '<audio controls autoplay> <source src=' + myJSON.data[0].preview + ' type="audio/mpeg"> </audio>';

            let otherArtist = document.getElementById("otherartists");
            let newArtist = document.createElement('p');

            otherArtist.innerHTML = '<p class="otherartiststext">We have found more artists that performs this song</p>' + '<div class="dropdown" id="moreartists"><a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Show other artists</a><div class="dropdown-menu" aria-labelledby="dropdownMenuLink"><a class="dropdown-item" href="#">' + myJSON.data[1].artist.name + '</a><a class="dropdown-item" href="#">' + myJSON.data[2].artist.name + '</a> <a class="dropdown-item" href="#">' + myJSON.data[3].artist.name + '</a> </div></div></div></div>';
        });
});