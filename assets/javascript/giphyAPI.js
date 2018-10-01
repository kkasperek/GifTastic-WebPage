// Global
// var xhr = $.get("https://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=ozYjj30TGARmf8tnRHcv4f4bLKCjhosB&limit=5");
// xhr.done(function(data) { console.log("success got data", data); });
// Api Key: ozYjj30TGARmf8tnRHcv4f4bLKCjhosB

var topics = ['hangry', 'excited', 'lazy'];   //inital array of topics

$(document).ready(function () {

    // Call Giphy API
    function getGifs(searchResult) {

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchResult + "&api_key=ozYjj30TGARmf8tnRHcv4f4bLKCjhosB&limit=3";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            //console.log(response);

            // store data in results variable and loop through
            var results = response.data;
            for (var i = 0; i < results.length; i++) {

                var resultDiv = $("<div>");                                //new div to hold results
                var p = $("<p>").text("Rating: " + results[i].rating);     //new <p> to hold rating text

                var newGif = $("<img>");                                   //create new gif img tag to hold url
                var gifUrl = results[i].images.fixed_height.url;
                newGif.attr("src", gifUrl);
                $("#giphys").append(newGif);

                resultDiv.append(newGif);               //add gif & rating to results div 
                resultDiv.append(p);

                $("#giphys").prepend(resultDiv);         //add results to giphys div 
            }

        });
    }
    // on click of the search button, call function that saves text input 
    $("#searchButton").on("click", function (event) {
        event.preventDefault();                                //prevents page from refreshing

        var searchResult = $("#searchInput").val().trim();    //grab the text entered into the form
        console.log("input: " + searchResult);

        topics.push(searchResult);
        console.log(topics);
        getGifs(searchResult);
        displayButtons();

    });


    // Display gif data 
    function displayButtons() {

        $("#addTopics").empty();
        // Loops through the array of topics
        for (var i = 0; i < topics.length; i++) {

            // Then dynamicaly generates buttons for each topic in the array
            var b = $("<button>");
            b.addClass("mood btn btn-outline-primary");     // Adds a class of mood to our button
            b.attr("data-name", topics[i]);     // Added a data-attribute
            b.text(topics[i]);                  // Provided the initial button text
            $("#addTopics").append(b);          // Added the button to the addTopics div
        }
    }



    $(document).on("click", ".mood", getGifs);
    //console.log(searchResult);


    // Calling the displayButtons function to display the intial buttons
    displayButtons();

});

// 1. grab user input as #searchInput
// 2. save value as searchResult on click 