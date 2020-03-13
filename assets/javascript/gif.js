$(document).ready(function () {
    var topic = ["Llama", "Tortoise", "Goats"]
    function renderButtons() {
        $("#button-area").empty()
        for (i = 0; i < topic.length; i++) {
            $("#button-area").append(`<button class="topicBtn" value=${i}>${topic[i]}</button>`)
        }
        $(".topicBtn").on("click", function () {
            console.log(this)
            var value = $(this).val()
            var animal = topic[value]
            searchGif(animal)
        })
    }
    $("#search-button").on("click", function () {
        var inputsearch = $("#search-input").val()
        console.log(inputsearch)
        topic.push(inputsearch)
        renderButtons()
        searchGif(inputsearch)
    })
    function searchGif(search) {
        console.log(search)
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            search + "&api_key=iP07Elte12nW9QCw9h0vllRZUq7UxV1O&limit=10";
        $.ajax({
            url: queryURL,
            method: "get"
        }).then(function (response) {
            console.log(response)
            renderGifs(response.data)
        })
    }
    function renderGifs(animals) {
        $("#gif-area").empty()
        for (i = 0; i < animals.length; i++) {
            var still = animals[i].images.fixed_height_still.url
            var animated = animals[i].images.fixed_height.url
            var animalImgs = $("<img>")
            animalImgs.attr("class", "gifs");
            animalImgs.attr("src", still)
            animalImgs.attr("data-still", still)
            animalImgs.attr("data-animate", animated)
            animalImgs.attr("data-state", "still")
            $("#gif-area").append(animalImgs)
        }
    }
    $(document).on("click", ".gifs", function () {
        var state = $(this).attr("data-state")
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"))
            $(this).attr("data-state", "animate")
        } else if (state === "animate") {
            $(this).attr("src", $(this).attr("data-still"))
            $(this).attr("data-state", "still")
        }
        var src = $(this).attr("src")
        var source = $(this).attr("source")
        $(this).attr("src", source)
        $(this).attr("source", src)
    })
    renderButtons()
});