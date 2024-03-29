// Browser local storage management  ----------------------------------------------------------------------------------------------------------------
let storedSearches = JSON.parse(localStorage.getItem('Search')); // Getting the existing values in browser local storage ---------------
let previousSearches = []; // Initialize an empty array --------------
previousSearches.concat(storedSearches); // Adding the existing values to the array (using concat instead push in order to avoid null and weird entries) ---

// Deleting the localStorage data if user press button in the modal---
let deletePreviousSearches = document.getElementById('deletesearches');
deletePreviousSearches.addEventListener('click', function() {
    localStorage.clear();
});
// END browser local storage management  ----------------------------------------------------------------------------------------------------------------

// Song button functionality ------------------------------------------------------------------------------------------------------------------------
let buttonsong = document.getElementById('buttonsong');

buttonsong.addEventListener('click', function() {
    let song = document.getElementById('searchbox').value;

    // // Checkpoint ----
    // console.log(song);

    // Saving user search --------------------------------------------
    previousSearches.push(song);
    localStorage.setItem('Search', JSON.stringify(previousSearches));

    fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=' + song)
        .then(function(response) {
            return response.json();
        })
        .then(function(myJSON) {

            // // Checkpoint ----------------------
            // console.log(myJSON.data[0].preview);

            let userSong = document.getElementById("resultbox");

            userSong.innerHTML = ('<div id="songdetails"> <p>Playing artist: ' + myJSON.data[0].artist.name + '</p>' + '<p>From album: ' + myJSON.data[0].album.title + ' </p>' + '<audio controls autoplay> <source src=' + myJSON.data[0].preview + ' type="audio/mpeg"> </audio> </div>'

                +
                '<h2 class="upmoreartist"> We have found some more artists or albums related to this song </h2>' +

                '<ul class="list-unstyled"> \
            <li class="media"> \
              <img src=' + myJSON.data[1].artist.picture_small + ' class="mr-4" alt="..."> \
              <div class="media-body"> \
                <h5 class="mt-0 mb-1"> ' + myJSON.data[1].artist.name + ' </h5> \
                In the album ' + myJSON.data[1].album.title + ' \
              </div> \
            </li> \
            <li class="media my-4"> \
              <img src=' + myJSON.data[2].artist.picture_small + ' class="mr-4" alt="..."> \
              <div class="media-body"> \
                <h5 class="mt-0 mb-1">' + myJSON.data[2].artist.name + ' </h5> \
                In the album ' + myJSON.data[2].album.title + ' \
              </div> \
            </li> \
            <li class="media"> \
              <img src=' + myJSON.data[3].artist.picture_small + ' class="mr-4" alt="..."> \
              <div class="media-body"> \
                <h5 class="mt-0 mb-1">' + myJSON.data[3].artist.name + ' </h5> \
                In the album ' + myJSON.data[3].album.title + ' \
              </div> \
            </li> \
          </ul>')
        });
});
// END song button functionality --------------------------------------------------------------------------------------------------------------------

// Artist button functionality ----------------------------------------------------------------------------------------------------------------------
let buttonArtist = document.getElementById('buttonartist');

// Declaring the vars out of the fetch to use it later down the road --------------------
let artistIDDeezer;
let arrayAlbumListDeezer;

buttonArtist.addEventListener('click', function() {
    let artist = document.getElementById('searchbox').value; // To use with last.fm fetchs ---------------------------------------------------------------
    let artistWOSpaces = artist.replace(/\s+/g, '-'); // To use with Deezer fetchs (the API does not support spaces, we need to use hyphens instead) -----

    // Saving user search -------------------------------------------
    previousSearches.push(artist);
    localStorage.setItem('Search', JSON.stringify(previousSearches));

    // Cleaning the divs before creating the new elements ----------
    document.getElementById("resultbox").innerHTML = "";

    // // Checkpoint ------------------------------
    // console.log(artistWOSpaces);

    fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/' + artistWOSpaces)
        .then(function(response3) {
            return response3.json();
        })
        .then(function(myJSON3) {

            // Extracting the artist ID to retrieve the list of albums -----------------------------------------
            artistIDDeezer = myJSON3.id;
            // console.log('Dezzer ID artist: ' + artistIDDeezer); // Checkpoint -------------------------------

            let artistResults = document.getElementById("resultbox");

            // Deezer artist image -----------------------------------------------------------------------------
            let artistImage = document.createElement('img');
            artistImage.setAttribute("src", myJSON3.picture_big);
            artistResults.appendChild(artistImage).setAttribute('id', 'artistimage');

            // Fetching the data of artist from last.fm  -----------------------------------------------------------------------------------------------
            fetch('https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + artist + '&api_key=66712c4097f5473a3fa324d8d74b557c&format=json')
                .then(function(response2) {
                    return response2.json();
                })
                .then(function(myJSON2) {

                    // // Checkpoint --------------------------           
                    // console.log(myJSON2.artist.bio.summary);

                    let artistResults = document.getElementById("resultbox");

                    // last.fm artist name --------------------------------------------------------------------------------------
                    let artistName = document.createElement('p');
                    artistName.innerHTML = ('Artist: ' + myJSON2.artist.name);
                    artistResults.appendChild(artistName);

                    // last.fm artist genre -------------------------------------------------------------------------------------
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

                    // last.fm artist listeners & play counts -------------------------------------------------------------------
                    let artistListeners = document.createElement('p');
                    artistListeners.innerHTML = (myJSON2.artist.name + ' has ' + myJSON2.artist.stats.listeners + ' listeners in last.fm, that played ' + myJSON2.artist.stats.playcount + ' songs');
                    artistResults.appendChild(artistListeners);

                    // last.fm artist bio ---------------------------------------------------------------------------------------
                    let artistBio = document.createElement('p');
                    artistBio.innerHTML = (myJSON2.artist.bio.summary);
                    artistResults.appendChild(artistBio);

                    // Deezer artist albums ------------------------------------------------------------------------------------
                    // Fetching the list of albums from Deezer using the artist ID created above -------------------------------
                    fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/' + artistIDDeezer + '/albums')
                        .then(function(response6) {
                            return response6.json();
                        })
                        .then(function(myJSON6) {

                            arrayAlbumListDeezer = myJSON6.data;

                            // // Checkpoint --------------------
                            // console.log(arrayAlbumListDeezer);

                            // Create a new <p> for title above the album list----------------------------------------
                            let resultBoxAlbumsListTitle = document.createElement('p');
                            resultBoxAlbumsListTitle.innerHTML = ('Album list');
                            artistResults.appendChild(resultBoxAlbumsListTitle).setAttribute('class', 'upalbumslist');

                            for (let index2 = 0; index2 < arrayAlbumListDeezer.length; index2++) {

                                // // Checkpoint ---------------------------------
                                // console.log(arrayAlbumListDeezer[index2].title);

                                let albumListDezzer = document.createElement('p');
                                albumListDezzer.innerHTML = (arrayAlbumListDeezer[index2].title);
                                artistResults.appendChild(albumListDezzer).setAttribute('class', 'albums');
                            }
                        });
                });
        });
});
// END artist button functionality ------------------------------------------------------------------------------------------------------------------

// Album button functionality ---------------------------
let buttonAlbum = document.getElementById('buttonalbum');

buttonAlbum.addEventListener('click', function() {
    let albumName = document.getElementById('searchbox').value; // To pass the value to last.fm album search---------------------------------------------------
    let albumNameWOSpaces = albumName.replace(/\s+/g, '-'); // To use with Deezer fetchs (the API does not support spaces, we need to use hyphens instead -----

    // Saving user search -------------------------------------------
    previousSearches.push(albumName);
    localStorage.setItem('Search', JSON.stringify(previousSearches));

    // Cleaning the divs before creating the new elements ----------
    document.getElementById("resultbox").innerHTML = "";

    fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/album?q=' + albumNameWOSpaces)
        .then(function(response4) {
            return response4.json();
        })
        .then(function(myJSON4) {

            // Getting the values from Deezer's API to extract data from last.fm's API (that need album + artist) ---------------
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

                    // Deezer album cover ---------------------------------------------------------------------------------------
                    let albumImage = document.createElement('img');
                    albumImage.setAttribute("src", myJSON4.data[0].cover_big);
                    albumResults.appendChild(albumImage).setAttribute('id', 'albumcover');

                    // Deezer album name ----------------------------------------------------------------------------------------
                    let albumName = document.createElement('p');
                    albumName.innerHTML = ('Album: ' + myJSON4.data[0].title);
                    albumResults.appendChild(albumName);

                    // Deezer album artist --------------------------------------------------------------------------------------
                    let albumArtist = document.createElement('p');
                    albumArtist.innerHTML = ('Artist: ' + myJSON4.data[0].artist.name);
                    albumResults.appendChild(albumArtist);

                    // Deezer album number of tracks ----------------------------------------------------------------------------
                    let albumNOT = document.createElement('p');
                    albumNOT.innerHTML = ('Number of tracks: ' + myJSON4.data[0].nb_tracks);
                    albumResults.appendChild(albumNOT);

                    // Deezer album genre ---------------------------------------------------------------------------------------
                    let albumGenre = document.createElement('p');
                    albumGenre.innerHTML = ('Genre: ' + albumGenreDeezer);
                    albumResults.appendChild(albumGenre);

                    // Deezer album published -----------------------------------------------------------------------------------
                    let albumPublished = document.createElement('p');
                    albumPublished.innerHTML = ('Release date: ' + albumPublishedDeezer);
                    albumResults.appendChild(albumPublished);

                    // Deezer album tracklist -----------------------------------------------------------------------------------
                    let trackListDeezer = myJSON5.tracks.data; // Getting the array of tracks from Deezer ----------------

                    // Create a new <p> for title above the tracklist -----------------------------------------------------------
                    let resultBoxTracklisttTitle = document.createElement('p');
                    resultBoxTracklisttTitle.innerHTML = ('Album tracklist');
                    albumResults.appendChild(resultBoxTracklisttTitle).setAttribute('class', 'uptracklist');

                    for (let index = 0; index < trackListDeezer.length; index++) {

                        // // Checkpoint ------------------------------
                        // console.log(trackListDeezer[index].title);

                        let albumSong = document.createElement('p');
                        albumSong.innerHTML = (trackListDeezer[index].title);
                        albumResults.appendChild(albumSong).setAttribute('class', 'tracks');
                    }
                });
        });
});
// END album button functionality -----------------------------------------------------------------------------------------------

// Previous user searches modal (body already created in the HTML) --------------------------------------------------------------
let previousSearchesButton = document.getElementById('oldsearch');
let searches = document.getElementById('searches');

previousSearchesButton.addEventListener('click', function() {

    // Cleaning the modal before creating the new elements ---------------------------------------
    document.getElementById("searches").innerHTML = "";

    // Retrieving stored searches-----------------------------------
    let storedSearches = JSON.parse(localStorage.getItem('Search'));

    // Populating the modal-----------------------------------------
    for (let index3 = 0; index3 < storedSearches.length; index3++) {
        let testsearch = document.createElement('p');
        testsearch.innerHTML = (storedSearches[index3]);
        searches.appendChild(testsearch);
    }

    // Launching modal----------
    $("#searchesmodal").modal();
});
// END modal block --------------------------------------------------------------------------------------------------------------