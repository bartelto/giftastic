

function addButton(buttonText) {
    let newButton = $("<button>");
    newButton.val(buttonText);
    newButton.text(buttonText);
    newButton.addClass("search");
    
    $("#search-buttons").append(newButton);
}



$("#add").on("click", function() {
    event.preventDefault();
    topics.push($("#new-button-text").val());
    addButton($("#new-button-text").val());
    localStorage.setItem("searchTerms", JSON.stringify(topics));
});

// Favorites button
$(document).on("click", "#favorites-button", function() {
    console.log("favorites button clicked");
    $("#results").empty();
    for (let i = 0; i < favorites.length; i++) {
        queryUrl = `http://api.giphy.com/v1/gifs/${favorites[i]}?api_key=2IlH8p21NJKNOeKm9FEJ5RCQp5jNVnc8`;
    
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then( function(response) {
            console.log(response);  
            $(".result").hide();
    
            addResult(response.data, "favorite", true);
            
            $(".result").fadeIn(1000);
        });
    }
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

            addResult(response.data[i], buttonText, favorites.includes(response.data[i].id));
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

// click event for favoriting a result
$("#main").on("click", ".fa-heart", function() {
    console.log("heart clicked");
    let gifId = $(this).parent().attr("data-id");
    console.log(gifId);
    if (favorites.includes(gifId)) { // remove it
        let index = favorites.findIndex(function(element) {return element === gifId;})
        favorites.splice(index, 1);
    } else {
        favorites.push(gifId);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));


    if ($(this).parent().hasClass("favorite")) {
        $(this).parent().removeClass("favorite");
        $(this).removeClass("fas").addClass("far");
        
    } else {
        $(this).parent().addClass("favorite");
        $(this).removeClass("far").addClass("fas");
    }
    
});

function addResult( gifData, altText, isFav) {
    let newDiv = $("<div>");
    newDiv.addClass("result");
    newDiv.attr("data-id", gifData.id);
    newDiv.hide();
    newDiv.append(`<p>Rating: ${gifData.rating.toUpperCase()}</p>`);

    let newImage = $("<img>");
    newImage.attr("src", gifData.images.original_still.url);
    newImage.attr("alt", altText);
    newImage.attr("data-still", gifData.images.original_still.url);
    newImage.attr("data-animated", gifData.images.original.url);
    newImage.attr("data-id", gifData.id);
    newImage.attr("data-state", "still");
    newImage.addClass("gifImage");
    newDiv.append(newImage);

    let heart= $("<i>");
    if (isFav) {
        newDiv.addClass("favorite");
        heart.addClass("fas fa-heart");
    }
    else       
        heart.addClass("far fa-heart");
    newDiv.append(heart);
    $("#results").prepend(newDiv);
}

let topics = [];
topics = JSON.parse(localStorage.getItem("searchTerms"));
if (!Array.isArray(topics)) {
    topics = [
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

let favorites = [];
favorites = JSON.parse(localStorage.getItem("favorites"));
if (!Array.isArray(favorites)) {
    favorites = [];
}

let favsButton = $("<button>");
favsButton.html(`<i class="fas fa-heart fa-xs"></i>`);
favsButton.attr("id", "favorites-button");
$("#search-buttons").append(favsButton);

for (let i=0; i < topics.length; i++) {
    addButton(topics[i]);
}

