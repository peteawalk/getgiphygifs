const apiKey = "BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9";
var topics = ["dave chappelle", "dwayne johnson🎥", "danny devito", "bruce lee", "taylor swift", "zion williamson", "paul rudd", "beyonce🐝", "elon musk", "wayne brady", "lewis hamilton🏎️", "lana del ray", "mariah scarey", "janet jackson", "dolly parton", "kevin hart", "aziz ansari", "ron swanson", "jeremy clarkson", "kevin durant", "patrick mahomes", "george clooney"];

$(document).ready(function () { // Write initial buttons to page
    for (var i = 0; i < topics.length; i++) {
        var createButtons = $("<button>").text(topics[i]).addClass("original-buttons");
        createButtons.attr("data-celeb", topics[i]);
        $("#buttons").append(createButtons);
    };

    // On-click for items in original array items!
    $(".original-buttons").on("click", function () {
        var getCelebValue = $(this).attr("data-celeb");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + getCelebValue + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=9";

        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function (response) {
                var results = response.data;
                for (var j = 0; j < results.length; j++) {
                    var gifDiv = $("<div>")
                    var rating = results[j].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var celebImage = $("<img>");
                    celebImage.attr("src", results[j].images.fixed_height_still.url);
                    celebImage.attr('data-still', results[j].images.fixed_height_still.url);
                    celebImage.attr('data-animate', results[j].images.fixed_height.url);
                    celebImage.attr('class', "gif"); // Add gif class for pause/play functionality
                    celebImage.attr('data-state', "still")
                    // Prepend ratings and gifs to #gifs-appear-here
                    // givRows.append(gifDiv);
                    gifDiv.prepend(p);
                    gifDiv.prepend(celebImage);
                    $("#gifs-appear-here").prepend(gifDiv);
                };
            });
    });


    // On-click for new items added to page
    $(document).on('click', '.newButtons', function () {
        var getCelebValue = $(this).attr("data-celeb");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + getCelebValue + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=9";

        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function (response) {
                var results = response.data;
                console.log(results);
                for (var j = 0; j < results.length; j++) {
                    var gifDiv = $("<div>");
                    var rating = results[j].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var celebImage = $("<img>");
                    celebImage.attr("src", results[j].images.fixed_height_still.url);
                    celebImage.attr('data-still', results[j].images.fixed_height_still.url);
                    celebImage.attr('data-animate', results[j].images.fixed_height.url);
                    celebImage.attr('class', "gif"); // Add gif class for pause/play functionality
                    celebImage.attr('data-state', "still")
                    // Prepend ratings and gifs to #gifs-appear-here
                    gifDiv.prepend(p);
                    gifDiv.prepend(celebImage);
                    $("#gifs-appear-here").prepend(gifDiv);
                };
            });
    });

    // Handler for Search
    $("#find-celeb").on("click", function (event) {

        event.preventDefault(); // prevent submit

        var inputCelebrity = $("#search-bar").val().toLowerCase().trim();
        // topics.push(inputCelebrity); // push celebrity to global array

        var createButtons = $("<button>").text(inputCelebrity);
        createButtons.attr("data-celeb", inputCelebrity);
        createButtons.attr("class", "newButtons");
        $("#buttons").append(createButtons);
        $("#search-bar").val(""); // empty search-bar after initial search!
    });

    // Handler for pause / play of gifs
    $(document).on('click', '.gif', function () {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

});
