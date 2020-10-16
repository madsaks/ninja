console.log("Console logging started....")




/*
const form = document.getElementById("form");

fetch("https://www.swapi.tech/api/people/?name=r2")
.then(function(response) {
    return response.json()
})
.then(function(result) {
    console.log(result);
});
*/

function giphy(name){
    

    fetch(`http://api.giphy.com/v1/gifs/search?q=${name}%20starwars&api_key=J1noCVxuNpIkjrmWc9LZUCtzfUezIF8D&limit=1`
    )
    .then(function(response){
        return response.json();
    })
    .then(function (result){
        console.log(result)
        url = result.data[0].images.downsized.url;
        console.log(url);
        img = document.getElementById(name);
        img.src = url;

        return url;
    });
   

};


function submitEvent(event) {
    event.preventDefault();

    let input = document.getElementById("search");
    let resultsDiv = document.getElementById("results");
     
    
    fetch("https://www.swapi.tech/api/people/?name="+input.value)
        .then(function(response) {
            return response.json()
        })
        .then(function (result) {
            //Fetch Homeworl first
            for (let i=0; i < result.results.length; i++) {
                console.log("Inside Homeworld fetch, Using Homeworld:", result.results[i].properties.homeworld)
                fetch(result.results[i].properties.homeworld)
                    .then(function(response) {
                        return response.json()
                    })
                    .then(function(homeResult){
                        console.log("Planet API:");
                        console.log(homeResult);
                        homeworld = document.getElementById(i);
                        homeworld.innerHTML = homeResult.result.properties.name;
                        

                    })
                }
                return(result);
            })
        .then(function(result) {

            console.log("Character API:")
            console.log(result);
            for (let i=0; i < result.results.length; i++) {
                let char = result.results[i].properties;
                let characterDiv = document.createElement("div");
                let html = "<h2>"+char.name+"</h2>"
                html += "<ul>"
                html += "<li>Birth year: "+char.birth_year+"</li>"
                html += "<li>Homeworld: <div id='"+i+"'></div></li>"
                html += "<li>Height: "+char.height+"</li>"
                html += "<li>Eye colour: "+char.eye_color+"</li>"
                html += "<img id='"+char.name+"' src='"+giphy(char.name)+"'></img>"
                
                console.log("Giphy:\n"+giphy());
                
                html += "</ul>"

                // Giphy testing
                
                characterDiv.innerHTML = html;
                resultsDiv.appendChild(characterDiv);
            }
        });

};
//Add event listerner to form
form.addEventListener("submit", submitEvent);

