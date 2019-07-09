let emotions = [
    "happy",
    "sad",
    "angry",
    "excited",
    "miserable",
    "lonely",
    "suspicious",
    "bored"
];

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
});



$(".search").on("click", function() {
    console.log("clicked " + $(this).val());
    let buttonText = $(this).val();
    queryUrl = `https://api.giphy.com/v1/gifs/search?q=${$(this).val()}&api_key=2IlH8p21NJKNOeKm9FEJ5RCQp5jNVnc8`;

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then( function(response) {
        console.log(response);
    
        for (let i=0; i<10; i++) {
            let newImage = $("<img>");
            newImage.attr("src", response.data[i].images.original_still.url);
            newImage.attr("alt", buttonText);
            newImage.attr("data-still", response.data[i].images.original_still.url);
            newImage.attr("data-animated", response.data[i].images.original.url);
            newImage.attr("data-state", "still");
            newImage.addClass("gifImage");
            $("#results").prepend(newImage);
        }
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
