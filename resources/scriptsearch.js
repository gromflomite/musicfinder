// Song button functionality -----------------------------------------------------------------------------------------------------------------
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
            userSong.innerHTML = '<p>Playing artist: ' + myJSON.data[0].artist.name + '</p>' + '<p>From album: ' + myJSON.data[0].album.title + ' </p>' + '<audio controls autoplay> <source src=' + myJSON.data[0].preview + ' type="audio/mpeg"> </audio>';

            let otherArtist = document.getElementById("otherartists");
            let newArtist = document.createElement('p');

            otherArtist.innerHTML = '<p class="otherartiststext">We have found more artists that performs this song</p>' + '<div class="dropdown" id="moreartists"><a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Show other artists</a><div class="dropdown-menu" aria-labelledby="dropdownMenuLink"><a class="dropdown-item" href="#">' + myJSON.data[1].artist.name + '</a><a class="dropdown-item" href="#">' + myJSON.data[2].artist.name + '</a> <a class="dropdown-item" href="#">' + myJSON.data[3].artist.name + '</a> </div></div></div></div>';
        });
});
// END song button functionality -----------------------------------------------------------------------------------------------------------------



// Artist button functionality -----------------------------------------------------------------------------------------------------------------
let buttonArtist = document.getElementById('buttonartist');

buttonArtist.addEventListener('click', function() {
    let artist = document.getElementById('searchbox').value; // To use with last.fm fetchs -----------------------------------
    let artistWOSpaces = artist.replace(/\s+/g, '-'); // To use with Deezer fetchs -----------------------------------

    // Cleaning the divs before creating the new elements ---------------------------------------
    document.getElementById("resultbox").innerHTML = "";
    document.getElementById("otherartists").innerHTML = "";

    // Checkpoint ------------------------------
    console.log(artistWOSpaces);

    fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/' + artistWOSpaces)
        .then(function(response3) {
            return response3.json();
        })
        .then(function(myJSON3) {

            let artistResults = document.getElementById("resultbox");

            // Deezer artist image -----------------------------------------------------------------------------------
            let artistImage = document.createElement('img');
            artistImage.setAttribute("src", myJSON3.picture_big);
            artistResults.appendChild(artistImage);

            fetch('https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + artist + '&api_key=66712c4097f5473a3fa324d8d74b557c&format=json')
                .then(function(response2) {
                    return response2.json();
                })
                .then(function(myJSON2) {

                    // Checkpoint ------------------------------            
                    console.log(myJSON2.artist.bio.summary);

                    let artistResults = document.getElementById("resultbox");

                    // last.fm artist name -----------------------------------------------------------------------------------
                    let artistName = document.createElement('p');
                    artistName.innerHTML = ('Artist: ' + myJSON2.artist.name);
                    artistResults.appendChild(artistName);

                    // last.fm artist genre -----------------------------------------------------------------------------------
                    let artistGenre = document.createElement('p');
                    artistGenre.innerHTML = ('Genre: ' + myJSON2.artist.tags.tag[0].name + ' - ' + myJSON2.artist.tags.tag[1].name);
                    artistResults.appendChild(artistGenre);

                    // last.fm artist similar -----------------------------------------------------------------------------------
                    let artistSimilar = document.createElement('p');
                    artistSimilar.innerHTML = ('Similar artists: ' + myJSON2.artist.similar.artist[0].name + ' - ' + myJSON2.artist.similar.artist[1].name);
                    artistResults.appendChild(artistSimilar);

                    // last.fm artist on tour -----------------------------------------------------------------------------------
                    let ontour = myJSON2.artist.ontour;
                    // last.fm API returns 1 if artist is on tour and 0 if not -------
                    if (ontour == 0) {
                        let artistTour = document.createElement('p');
                        artistTour.innerHTML = (myJSON2.artist.name + ' is not on tour');
                        artistResults.appendChild(artistTour);
                    } else {
                        let artistTour = document.createElement('p');
                        artistTour.innerHTML = (myJSON2.artist.name + ' is on tour!!');
                        artistResults.appendChild(artistTour);
                    }

                    // last.fm artist listeners & play counts -----------------------------------------------------------------------------------
                    let artistListeners = document.createElement('p');
                    artistListeners.innerHTML = (myJSON2.artist.name + ' has ' + myJSON2.artist.stats.listeners + ' listeners in last.fm, that played ' + myJSON2.artist.stats.playcount + ' songs');
                    artistResults.appendChild(artistListeners);

                    // last.fm artist bio -----------------------------------------------------------------------------------
                    let artistBio = document.createElement('p');
                    artistBio.innerHTML = (myJSON2.artist.bio.summary);
                    artistResults.appendChild(artistBio);
                });
        });
});
// END artist button functionality -----------------------------------------------------------------------------------------------------------------

// Album button functionality -----------------------------------------------------------------------------------------------------------------
let buttonAlbum = document.getElementById('buttonalbum');

buttonAlbum.addEventListener('click', function() {
    let albumName = document.getElementById('searchbox').value; // To pass the value to last.fm album search--------------------
    let albumNameWOSpaces = albumName.replace(/\s+/g, '-'); // To use with Deezer fetchs -----------------------------------

    // Cleaning the divs before creating the new elements ---------------------------------------
    document.getElementById("resultbox").innerHTML = "";
    document.getElementById("otherartists").innerHTML = "";

    fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/album?q=' + albumNameWOSpaces)
        .then(function(response4) {
            return response4.json();
        })
        .then(function(myJSON4) {

            // Getting the values from Deezer's API to extract data from last.fm's API (that need album + artist) --------------------------------------------
            let albumDeezerID = myJSON4.data[0].id;
            let albumArtistDeezer = myJSON4.data[0].artist.name;

            fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/album/' + albumDeezerID)
                .then(function(response5) {
                    return response5.json();
                })
                .then(function(myJSON5) {
                    let albumGenreDeezer = myJSON5.genres.data[0].name;
                    let albumPublishedDeezer = myJSON5.release_date;

                    let albumResults = document.getElementById("resultbox");

                    // Deezer album cover -----------------------------------------------------------------------------------
                    let albumImage = document.createElement('img');
                    albumImage.setAttribute("src", myJSON4.data[0].cover_big);
                    albumResults.appendChild(albumImage);

                    // Deezer album name -----------------------------------------------------------------------------------
                    let albumName = document.createElement('p');
                    albumName.innerHTML = ('Album: ' + myJSON4.data[0].title);
                    albumResults.appendChild(albumName);

                    // Deezer album artist -----------------------------------------------------------------------------------
                    let albumArtist = document.createElement('p');
                    albumArtist.innerHTML = ('Artist: ' + myJSON4.data[0].artist.name);
                    albumResults.appendChild(albumArtist);

                    // Deezer album number of tracks -----------------------------------------------------------------------------------
                    let albumNOT = document.createElement('p');
                    albumNOT.innerHTML = ('Number of tracks: ' + myJSON4.data[0].nb_tracks);
                    albumResults.appendChild(albumNOT);

                    // Deezer album genre -----------------------------------------------------------------------------------
                    let albumGenre = document.createElement('p');
                    albumGenre.innerHTML = ('Genre: ' + albumGenreDeezer);
                    albumResults.appendChild(albumGenre);

                    // Deezer album published -----------------------------------------------------------------------------------
                    let albumPublished = document.createElement('p');
                    albumPublished.innerHTML = ('Date: ' + albumPublishedDeezer);
                    albumResults.appendChild(albumPublished);
                });
        });
});
// END album button functionality -----------------------------------------------------------------------------------------------------------------