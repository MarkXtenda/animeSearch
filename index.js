let search = document.getElementById("search")
let form = document.getElementById("searchBar")


let pageCount = 1

const mainUrl = "https://api.jikan.moe/v4/anime"
let animeUrl = `https://api.jikan.moe/v4/anime/Naruto?page=${pageCount}`

let animeList

animeResults = document.getElementById("results")

function mainScreen(mainUrl) {
    fetch(mainUrl).then(response=>response.json()).then((list)=>{
        animeList = list.data
        console.log(animeList)
        animeList.forEach(anime => {
            let animeCard = document.createElement("div")
            animeCard.className = "animeCard"
    
            let animeImg = document.createElement("img")
            animeImg.src = anime.images.jpg.image_url
            animeImg.alt = "https://static01.nyt.com/images/2011/01/14/arts/14MOVING-span/MOVING-jumbo.jpg"

            animeCard.innerText = anime.title
            animeCard.appendChild(animeImg)
    
            animeResults.appendChild(animeCard)
        });
    })
}

function Search(url, func) {
    fetch(url).catch()
}

mainScreen(mainUrl)

form.addEventListener("keyup", ()=>{
    let animeSearch = search.value
    if (animeSearch == "") {
        mainScreen(animeUrl)
    } else {
        animeResults.innerText = ""
    
        // fetch().catch()
    
    
    
    
    
    
    }
})


    
    