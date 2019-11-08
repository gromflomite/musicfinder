// Deezer top artists -------------------------------------------------------------------------------------------
fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0/artists')
    .then(function(response) {
        return response.json();
    })
    .then(function(myJSON) {

        let imagesCarousel = document.getElementsByClassName("carImg");
        let artistNameCarousel = document.getElementsByClassName("artistNameCarousel");

        for (let index = 0; index < 3; index++) {

            artistNameCarousel[index].innerHTML = (myJSON.data[index].name);
            imagesCarousel[index].setAttribute('src', myJSON.data[index].picture_medium);

            // // Checkpoint ------------------------------
            // console.log(myJSON.data[index].name);
            // console.log(myJSON.data[index].picture_medium);
        }
    });

// Deezer top tracks -------------------------------------------------------------------------------------------
fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0/tracks')
    .then(function(response2) {
        return response2.json();
    })
    .then(function(myJSON2) {

        let trackNameCarousel = document.getElementsByClassName("trackNameCarousel");
        let trackImagesCarousel = document.getElementsByClassName("trackCarImg");

        for (let index2 = 0; index2 < 3; index2++) {

            trackNameCarousel[index2].innerHTML = (myJSON2.data[index2].title);
            trackImagesCarousel[index2].setAttribute('src', myJSON2.data[index2].artist.picture_medium);

            // // Checkpoint ------------------------------
            // console.log(myJSON2.data[index2].title);
            // console.log(myJSON2.data[index2].artist.name);
        }
    });

// last.fm Spain top artists -------------------------------------------------------------------------------------------
let lastfmTopArtists = document.getElementById("lastfmtopartists");

fetch('http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=spain&api_key=66712c4097f5473a3fa324d8d74b557c&format=json')
    .then(function(response3) {
        return response3.json();
    })
    .then(function(myJSON3) {

        lastfmTopArtists.innerHTML = (
            '<h2 id="lftopcharts">Top artists</h1> \
            <ul class="list-unstyled"> \
    <li class="media">\
      <div class="media-body"> \
        <h3 class="mt-0 mb-1"> ' + myJSON3.topartists.artist[0].name + ' </h3> \
      </div> \
    </li> \
    <li class="media my-4"> \
      <div class="media-body"> \
        <h3 class="mt-0 mb-1">' + myJSON3.topartists.artist[1].name + ' </h3> \
      </div> \
    </li> \
    <li class="media"> \
      <div class="media-body"> \
        <h3 class="mt-0 mb-1">' + myJSON3.topartists.artist[2].name + ' </h3> \
      </div> \
    </li> \
  </ul>')
    });

// last.fm Spain top tracks -------------------------------------------------------------------------------------------
let lastfmTopTracks = document.getElementById("lastfmtoptracks");

fetch('http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=spain&api_key=66712c4097f5473a3fa324d8d74b557c&format=json')
    .then(function(response4) {
        return response4.json();
    })
    .then(function(myJSON4) {
        lastfmTopTracks.innerHTML = (
            '<h2 id="lftopcharts">Top tracks</h1> \
            <ul class="list-unstyled"> \
    <li class="media">\
      <div class="media-body"> \
        <h3 class="mt-0 mb-1"> ' + myJSON4.tracks.track[0].name + ' (' + myJSON4.tracks.track[0].artist.name + ')' + '</h3> \
      </div> \
    </li> \
    <li class="media my-4"> \
      <div class="media-body"> \
        <h3 class="mt-0 mb-1">' + myJSON4.tracks.track[1].name + ' (' + myJSON4.tracks.track[1].artist.name + ')' + '</h3> \
      </div> \
    </li> \
    <li class="media"> \
      <div class="media-body"> \
        <h3 class="mt-0 mb-1">' + myJSON4.tracks.track[2].name + ' (' + myJSON4.tracks.track[2].artist.name + ')' + '</h3> \
      </div> \
    </li> \
  </ul>')
    });