// Current Page
let pageCount = document.getElementById("current-page")
// Search field and button
let search = document.getElementById("search")
let searchText = document.getElementById("search-text")
// URLs

let url = {
    mainUrl: "https://api.jikan.moe/v4/top/anime?limit=25",
    animeUrl: "https://api.jikan.moe/v4/anime?q=",
    ratingUrl: "https://api.jikan.moe/v4/anime?score=",
    yearUrl: "https://api.jikan.moe/v4/anime?start_date="
}

let mainUrl = `https://api.jikan.moe/v4/top/anime?limit=25`
let animeUrl = `https://api.jikan.moe/v4/anime?q=`
let ratingUrl = `https://api.jikan.moe/v4/anime?score=`
let yearUrl = `https://api.jikan.moe/v4/anime?start_date=`
// Current URL
let currentUrl
// Current STATE
let currentState
// AdultContent
let adultFilter = "&sfw"


function fetchGenres() {
    
}


let pageClick = document.getElementById("pages")
let btnNext = document.getElementById("next")
let btnPrev = document.getElementById("previous")

const animeResults = document.getElementById("results")
let modal = document.getElementById("modal")


function fetchFunction(url, page = "") {
    fetch(url + page).then(response=>response.json()).then((list)=>{
        animeList = list.data
        pageCheckRender()
})
}
// Print the Cards
function printResult() {
    animeList.forEach(anime => {
        let animeCard = document.createElement("div")
        animeCard.className = "animeCard"
        animeCard.id = anime.mal_id
        let animeImg = document.createElement("img")
        animeImg.className = "animeCard"
        animeImg.id = anime.mal_id
        animeImg.src = anime.images.jpg.image_url
        // Check if title have an english translation, if not just past the main title
        if (anime.title_english !== null) {
            animeCard.innerText = anime.title_english
        } else {
            animeCard.innerText = anime.title
        }
        animeCard.appendChild(animeImg)

        animeResults.appendChild(animeCard)
    })
}
// Number Check
function nameCheck(name) {
    if (parseInt(name)) {
       if (parseInt(name) <= 10) {
            return currentUrl = ratingUrl
       } 
       else {
            return currentUrl = yearUrl
       }
    }
    else {
        currentUrl = animeUrl
    }
}
// Page Check
// It checks if current array of results have enough searches for 1 page (eg 25). if not it dissables the 'Next' button
function pageCheckRender() {
    if (animeList.length < 25) {
        btnNext.disabled = true
        printResult()
    }
    else {
        btnNext.disabled = false
        printResult()
    }
    // checks if the page count at 1. if so it dissables 'Previous' button
    if (pageCount.innerText == "1") {
        btnPrev.disabled = true
    }
    else {
        btnPrev.disabled = false
        printResult()
    }
}

// Empty Search bar case
// Checks if 'name' is empty string
function emptySearchBar(name) {
    if (!name) {
        currentUrl = mainUrl
        currentState = currentUrl + adultFilter
        fetchFunction(currentState)
    }
}

emptySearchBar()

// Search Anime
search.addEventListener("click", (event)=>{
    console.log("search")
    animeResults.innerHTML = ""
    let name = searchText.value
// Check if typed word is actually a number or text
    nameCheck(name)
// Establish Current State of url
    pageCount.innerText = 1
    currentState = currentUrl + name + adultFilter
// Check if typed word is empty
    emptySearchBar(name)
    console.log(currentState)
    if (name) { fetchFunction(currentState) }
    event.preventDefault()
})

// Navigate using Next and Previous buttons
pageClick.addEventListener("click", (event)=>{
    console.log("pageClick")
// Next Button pressed
    if (event.target === btnNext) {
        animeResults.innerHTML = ""
        pageCount.innerText = parseInt(pageCount.innerText) + 1
        let page = `&page=${pageCount.innerText}`
        console.log(currentState + page)
        fetchFunction(currentState + page)
    }
// Previous Button pressed
    else if (event.target === btnPrev) {
        if (parseInt(pageCount.innerText) > 1) {
            animeResults.innerHTML = ""
            pageCount.innerText = parseInt(pageCount.innerText) - 1
            let page = `&page=${pageCount.innerText}`
            
            console.log(currentState + page)
            fetchFunction(currentState + page)
        }
    }
    event.preventDefault()
})

animeResults.addEventListener("click", (event)=>{
    if (event.target.className === "animeCard" && modal.style.visibility !== "visible") {
        let idishka = event.target.id
        // Detail description of animeResults
        animeList.forEach(element => {
            if (element.mal_id === parseInt(idishka)) {
                // Attaching modal Elements
                let wrapper = document.getElementById("wrapper")
                let infoWrapper = document.getElementById("info-wrapper")
                let imageWrapper = document.getElementById("image-wrapper")
                let titleName = document.getElementById("title-name")
                let image = document.getElementById("image")
                let rating = document.getElementById("rating")
                let releaseDate = document.getElementById("release-date")
                let description = document.getElementById("description")

                modal.innerHTML = ""
                modal.style.visibility = "visible"
                // Adding detailed information about chosen tittle
                titleName.innerText = `Title: ${element.title}`
                image.src = element.images.jpg.large_image_url
                rating.innerText = `Rating ${element.score}`
                releaseDate.innerText = `Release Date: ${element.year}`
                description.innerHTML = `Description: <br><br>${element.synopsis}`
                imageWrapper.appendChild(image)
                infoWrapper.appendChild(titleName)
                infoWrapper.appendChild(rating)
                infoWrapper.appendChild(releaseDate)
                wrapper.appendChild(imageWrapper)
                wrapper.appendChild(infoWrapper)
                modal.appendChild(wrapper)
                modal.appendChild(description)
            }
        });
    }
    else {
        modal.style.visibility = "hidden"
    }
})

modal.addEventListener("click", ()=>{
    modal.style.visibility = "hidden"
})

