function bandsInTown(artist) {
    bandsintown
        .getArtistEventList(artist)
        .then(function (events) {
            var band = {
                Venue: events[0].venue.name,
                Location: events[0].venue.city + ", " + events[0].venue.region,
                Time: events[0].formatted_datetime
            }

            console.log(band);

            fs.appendFile("log.txt", "\nVenue: " + band.Venue + "\nLocation: " + band.Location + "\nTime: " + band.Time, function (err) {
                if (err) {
                    return console.log(err);
                } else {
                    console.log("log.txt was updated");
                }
            });
        });
}