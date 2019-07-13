const apiKey = "BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9";
var topics = ["dave chappelle", "elon musk", "bruce lee"]



function searchGiphy(searchedGif) {
    for (var list = 0; list < topics.length; list++) {

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchedGif + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=9";

        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function (response) {
                var results = response.data;
                console.table(response);
                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div>");
                    var createButtons = $("<button>").text(topics[i]);
                    createButtons.attr("data-celeb", topics[i]);
                    $("#buttons").append(createButtons);
                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var celebImage = $("<img>");
                    celebImage.attr("src", results[i].images.fixed_height.url);
                    celebImage.class("gif"); // Add gif class for pause/play functionality
                    celebImage.attr("data-animate", "data-still");
                    // celebImage.attr("id", results[i].images.);

                    gifDiv.prepend(p);
                    gifDiv.prepend(celebImage);

                    $("#gifs-appear-here").prepend(gifDiv);
                }
            });

    }
}

// Handler for pause / play of gifs
$(".gif").on("click", function () {
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

// Handler for Search
$("#find-celeb").on("click", function (event) {
    event.preventDefault(); // prevent submit
    var inputCelebrity = $("#search-bar").val().trim();
    topics.push(inputCelebrity); // push celebrity to global array

    searchGiphy(inputCelebrity); // pass searched celebrity into the searchGiphy function
});