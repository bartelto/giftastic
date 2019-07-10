let emotions = [];
emotions = JSON.parse(localStorage.getItem("searchTerms"));
if (!Array.isArray(emotions)) {
    emotions = [
        "happy",
        "sad",
        "angry",
        "excited",
        "miserable",
        "lonely",
        "suspicious",
        "bored"
    ];
}

if (emotions.length === 0) {
   
}


function addButton(buttonText) {
    let newButton = $("<button>");
    newButton.val(buttonText);
    newButton.text(buttonText);
    newButton.addClass("search");
    
    $("#search-buttons").append(newButton);
}

for (let i=0; i < emotions.length; i++) {
    console.log(emotions[i]);
    addButton(emotions[i]);
}

$("#add").on("click", function() {
    event.preventDefault();
    emotions.push($("#new-button-text").val());
    addButton($("#new-button-text").val());
    localStorage.setItem("searchTerms", JSON.stringify(emotions));
});



$(document).on("click", ".search", function() {
    console.log("clicked " + $(this).val());
    let buttonText = $(this).val();
    queryUrl = `https://api.giphy.com/v1/gifs/search?q=${$(this).val()}&api_key=2IlH8p21NJKNOeKm9FEJ5RCQp5jNVnc8`;

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then( function(response) {
        console.log(response);  
        $(".result").hide();
        for (let i=0; i<Math.min(10, response.data.length); i++) {
            let newDiv = $("<div>");
            newDiv.addClass("result");
            newDiv.hide();

            newDiv.append(`<p>Rating: ${response.data[i].rating}</p>`);

            let newImage = $("<img>");
            newImage.attr("src", response.data[i].images.original_still.url);
            newImage.attr("alt", buttonText);
            newImage.attr("data-still", response.data[i].images.original_still.url);
            newImage.attr("data-animated", response.data[i].images.original.url);
            newImage.attr("data-state", "still");
            newImage.addClass("gifImage");
            newDiv.append(newImage);

            $("#results").prepend(newDiv);
            //newDiv.fadeIn(1000);
        }
        $(".result").fadeIn(1000);
    });

});

$(document).on("click", ".gifImage", function() {
    console.log("GIF clicked");

    if ($(this).attr("data-state") === "still") {
        $(this).attr("src", $(this).attr("data-animated"));
        $(this).attr("data-state", "animated");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});


