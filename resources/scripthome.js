// DEEZER -> Retrieving top artists -------------------------------------------------------------------------------------------
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


            // Checkpoint ------------------------------
            console.log(myJSON.data[index].name);
            console.log(myJSON.data[index].picture_medium);
        }
    });

// DEEZER -> Retrieving top tracks -------------------------------------------------------------------------------------------
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

            // Checkpoint ------------------------------
            console.log(myJSON2.data[index2].title);
            console.log(myJSON2.data[index2].artist.name);
        }
    });