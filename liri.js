//set environmental variables
require("dotenv").config();

//import files and api's
var request = require("request");
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

//get user input
var command = process.argv[2];
var input = process.argv[3];

UserInput(command, input);

//function commands
function UserInput(command, input) {
    switch (command) {
        case 'concert-this':
            concertThis(input);
            break;
        case 'spotify-this-song':
            spotifyThisSong(input);
            break;
        case 'movie-this':
            movieThis(input);
            break;
        case 'do-what-it-says':
            doWhatItSays();
            break;
    }
}

//function for concert-this
function concertThis(input) {
    var queryUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";
    request(queryUrl, function (error, response, body) {
        if (!input) {
            console.log("You must enter a band or artist!")
        } else {
            var concerts = JSON.parse(body);
            for (var i = 0; i < concerts.length; i++) {
                console.log("Band/Artist: " + input + "\n" + "Venue: " + concerts[0].venue.name + "\n" +
                    "Location: " + concerts[0].venue.city + "\n" + "Date: " + concerts[0].datetime + "\n");
            }
        }
    });
}

//function for spotify-this-song
function spotifyThisSong(input) {
    //if user doesn't input info
    if (!input) {
        input = "Mr. Nobody";
        console.log("You didn't input a song. That's ok, we looked up some we think you should listen to: ");
    }
    //call spotify api with user input
    spotify.search(
        {
            type: "track",
            query: input,
            limit: 3 //I put a limit because sometimes the first song that's returned isn't the one the user was looking for
        },
        //function for error
        function (error, data) {
            if (!error) {
                var songs = data.tracks.items;
                for (var i = 0; i < songs.length; i++) {
                    console.log("Song: " + songs[i].name + "\n" + "Artist: " + songs[i].artists[0].name + "\n" +
                        "Preview the Song: " + songs[i].preview_url + "\n" + "Album: " + songs[i].album.name + "\n");
                }
            } else {
                console.log("Error :" + error);
                return;
            }
        }
    );
};

//function for movie-this
function movieThis(input) {
    //if user doesn't input info
    if (!input) {
        input = "Mr. Nobody";
        console.log("You didn't input a movie. That's ok, we looked up one we think you should watch: ");
    }

    // calls omdb api with user input
    var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&r=json&tomatoes=true&apikey=trilogy";
    request(queryUrl, function (error, response, body) {
        if (!error) {
            var movie = JSON.parse(body);
            console.log("Movie Title: " + movie.Title + "\n" + "Year: " + movie.Year + "\n" +
                "IMDB Rating: " + movie.imdbRating + "\n" + "Rotten Tomatoes Rating: " + movie.tomatoRating +
                "\n" + "Country: " + movie.Country + "\n" + "Language: " + movie.Language + "\n" + "Plot: "
                + movie.Plot + "\n" + "Actors: " + movie.Actors + "\n");
        } else {
            console.log("Error: " + error);
            return;
        }
    });
};

//function for following input from random.txt file 
function doWhatItSays() {
    fs.readFile('random.txt', 'utf8', function (error, data) {
        if (!error) {
            var dataArr = data.split(',');
        UserInput(dataArr[0], dataArr[1]);
        } else {
            console.log("Error: " + error);
        }
    });
};