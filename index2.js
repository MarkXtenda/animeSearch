mainUrl = "https://api.jikan.moe/v4/top/anime"
animeUrl = `https://api.jikan.moe/v4/anime/`

const animeResults = document.getElementById("results")

let pageCount = 1

let search = ""
let options = [ mainUrl, animeUrl]
let currentOtption
// Print the Cards
function printResult() {
    animeList.forEach(anime => {
        let animeCard = document.createElement("div")
        animeCard.className = "animeCard"

        let animeImg = document.createElement("img")
        animeImg.src = anime.images.jpg.image_url
        animeImg.alt = "https://static01.nyt.com/images/2011/01/14/arts/14MOVING-span/MOVING-jumbo.jpg"

        animeCard.innerText = anime.title
        animeCard.appendChild(animeImg)

        animeResults.appendChild(animeCard)
    })
}

// Main fetch function
function mainScreen(mainUrl) {
    fetch(mainUrl).then(response=>response.json()).then((list)=>{
        // RESULT MUST BE AN ARRAY 
        animeList = list.data
        console.log(animeList)

        printResult()
    })
}

mainScreen(mainUrl)