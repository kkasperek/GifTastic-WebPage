// Global
var topics = ['hangry', 'excited', 'lazy', 'wild', 'outraged'];   //inital array of topics
var k = $("<div>").addClass('hello').attr('data-name', 'world');
console.log(k[0].dataset.name);

// add data-name attribute to search results
//var searchResult;

$(document).ready(function () {

    // Call Giphy API
    function getGifs() {
        // set the search term to the value input by the user
        var searchName = $(this).attr("data-name");
        if (searchName === undefined){
            searchName = searchResult;
        }
        
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchName + "&api_key=ozYjj30TGARmf8tnRHcv4f4bLKCjhosB&limit=10&offset=0";
        console.log(searchName);

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


    // on click of the search button, call function that saves text input 
    $("#searchButton").on("click", function (event) {
        event.preventDefault();                                //prevents page from refreshing

        searchResult = $("#searchInput").val().trim();    //grab the text entered into the form
        console.log("input: " + searchResult);

        topics.push(searchResult);
        console.log(topics);


        getGifs(searchResult);
        displayButtons();
    });
    
    //pause gif
    // $('.mood').mouseover(function(){
    //     let state = $(this).attr("data-state");
    //     if (state === 'still'){
    //         const url = $(this).attr("data-animate");
    //         $(this).attr("src", url);
    //         $(this).attr("data-state", 'animate');
    //         console.log(state);
       
    //       } 
    //       else if (state === 'animate') {
    //         const url = $(this).attr("data-still");
    //         $(this).attr("src", url);
    //         $(this).attr("data-state", 'still');
    //         console.log(state);
    //       }
    // });


    $(document).on("click", ".mood", getGifs);

    // Calling the displayButtons function to display the intial buttons
    displayButtons();

});

// 1. grab user input as #searchInput
// 2. save value as searchResult on click 