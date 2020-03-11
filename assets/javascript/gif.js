var topic = ["Dog", "Cat", "Birds"]

function renderButtons(){

        $("#button-area").empty()

        for(i=0; i<topic.length; i++) {

            $("#button-area").append(`<button class="topicBtn" value=${i}>${topic[i]}</button>`)
        }

        $(".topicBtn").on("click",function(){

            console.log(this)
            var value = $(this).val()
            var animal = topic[value]

            searchGif(animal)
        

        })

}

$("#search-button").on("click",function(){
    var inputsearch = $("#search-input").val()
    console.log(inputsearch)
    topic.push(inputsearch)
    renderButtons()
    searchGif(inputsearch)
}

)


function searchGif(search){
    console.log(search)

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    search + "&api_key=ZGg4cOR9OgsirAFDYQ0srqXu3w9fdTm3&limit=10";

  
    $.ajax({
        url: queryURL,
        method:"get"
        
    }).then(function(response){
        console.log(response)
        renderGifs(response.data)
    })


}


function renderGifs(animals){

    $("#gif-area").empty()

    for (i=0; i<animals.length; i++ ){
        $("#gif-area").append(`<img class="gifs" src="${animals[i].images.downsized_still.url}"  source="${animals[i].images.downsized.url}">`)
    }

   
    
    $(".gifs").on("click",function(){
        console.log(this)

        var src = $(this).attr("src")
        var source = $(this).attr("source")
        $(this).attr("src", source)
        $(this).attr("source", src)
    })
}

renderButtons()