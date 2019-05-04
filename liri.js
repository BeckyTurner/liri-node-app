//read and set the environmental variables
require("dotenv").config();

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);