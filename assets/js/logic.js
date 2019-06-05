$(document).ready(function() {
  // Global Variables

  var topics = ["Starfish", "Orca", "Dolphin", "Sea Dragon"];

  // function for capturing the creature name from the data-attribute
  function createCreatureGifs() {
    var creatureName = $(this).attr("data-name");

    // testing if creature button clicks are working
    // alert(creatureName);
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      creatureName +
      "&api_key=HfH1URp8Af1DMfSLUx0pdRqm78b8bw7h&limit=10";

    console.log(queryURL);
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After data comes back from the request
      .then(function(response) {
        console.log(queryURL);

        console.log(response);

        // storing the data from the AJAX in a variable
        var results = response.data;

        // loop for creation of HTML elements to display GIFs
        for (var i = 0; i < results.length; i++) {
          var creatureDiv = $("<div>");
          creatureDiv.addClass("holder");
          // Showing the Rating

          // creating an image tag
          var creatureImage = $("<img>");

          // setting the source attribute from what AJAX responds with

          creatureImage.attr("src", results[i].images.fixed_height_still.url);
          creatureImage.attr(
            "data-still",
            response.data[i].images.fixed_height_still.url
          );
          creatureImage.attr(
            "data-animate",
            response.data[i].images.fixed_height.url
          );
          creatureImage.attr("data-state", "still");
          creatureImage.attr("class", "gif");

          // Appending the paragraph and image tag to the creatureDiv
          var p = $("<p>").text("Rating: " + results[i].rating);

          creatureDiv.append(p);

          creatureDiv.append(creatureImage);

          // showing the gifs on top of the screen
          $("#gifs-appear-here").prepend(creatureDiv);
        }
      });
  }

  // Function for displaying creature buttons and adding attributes
  function renderButtons() {
    $("#buttons-view").empty();

    for (var i = 0; i < topics.length; i++) {
      var newButton = $("<button>");
      newButton.addClass("creature");
      newButton.attr("data-name", topics[i]);
      newButton.text(topics[i]);

      // Added the button to the HTML
      $("#buttons-view").append(newButton);
    }
  }

  //   Function to animate GIFS

  function changeGifState() {
    var state = $(this).attr("data-state");
    var animateGif = $(this).attr("data-animate");
    var pauseGif = $(this).attr("data-still");

    if (state == "still") {
      $(this).attr("src", animateGif);
      $(this).attr("data-state", "animate");
    } else if (state == "animate") {
      $(this).attr("src", pauseGif);
      $(this).attr("data-state", "still");
    }
  }

  // function waits for the button to add creature to be clicked
  $("#add-creature").on("click", function(event) {
    event.preventDefault();

    var creature = $("#creature-input")
      .val()
      .trim();

    topics.push(creature);

    renderButtons();

    return false;
  });

  // Function for displaying the creature info
  $(document).on("click", ".creature", createCreatureGifs);
  $(document).on("click", ".gif", changeGifState);
  // Calling the renderButtons function to display the intial buttons
  renderButtons();
});
