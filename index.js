// Current Page
let pageCount = document.getElementById("current-page")
// Search field and button
let search = document.getElementById("search")
let searchText = document.getElementById("search-text")
// URLs
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


let pageClick = document.getElementById("pages")
let btnNext = document.getElementById("next")
let btnPrev = document.getElementById("previous")

const animeResults = document.getElementById("results")
let modal = document.getElementById("modal")


function fetchFunction(url, page = "") {
    pageClick.style.visibility = "hidden"
    fetch(url + page).then(response=>response.json()).then((list)=>{
        animeList = list.data
        pageCheckRender()
        pageClick.style.visibility = "visible"
})
}
// Print the Cards
function printResult() {
    if (animeList.length) {
        animeList.forEach(anime => {
            let animeCard = document.createElement("div")
            animeCard.className = "animeCard"
            animeCard.id = anime.mal_id
            let animeImg = document.createElement("img")
            animeImg.className = "animeCard"
            animeImg.id = anime.mal_id
            animeImg.src = anime.images.jpg.image_url
            let animeTitle = document.createElement("p")
            animeTitle.className = "animeCard"
            animeTitle.id = anime.mal_id
            // Check if title have an english translation, if not just past the main title
            if (anime.title_english !== null) {
                animeTitle.innerText = anime.title_english
            } else {
                animeTitle.innerText = anime.title
            }
            animeCard.appendChild(animeImg)
            animeCard.appendChild(animeTitle)
    
            animeResults.appendChild(animeCard)
        })
    } else {
        let noResults = document.createElement("h1")
        noResults.innerText = "No results"
        animeResults.appendChild(noResults)
    }
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
        btnPrev.disabled = true
        return printResult()
    }
    else {
        btnNext.disabled = false
    }
    // Checks if the page count at 1. if so it dissables 'Previous' button
    if (pageCount.innerHTML == "1") {
        btnPrev.disabled = true
        printResult()
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
    let name = searchText.value.replaceAll(" ", "_")
// Check if typed word is actually a number or text
    nameCheck(name)
// Establish Current State of url
    pageCount.innerText = 1
    currentState = currentUrl + name + adultFilter
// Check if typed word is empty
    emptySearchBar(name)
    console.log(currentState)
    if (name) { 
        console.log(name)
        fetchFunction(currentState) 
    }
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
        animeList.forEach(ModalElement => {
            if (ModalElement.mal_id === parseInt(idishka)) {
                // Attaching modal Elements
                let wrapper = document.getElementById("wrapper")
                let infoWrapper = document.getElementById("info-wrapper")
                let imageWrapper = document.getElementById("image-wrapper")
                let titleName = document.getElementById("title-name")
                let image = document.getElementById("image")
                let rating = document.getElementById("rating")

                let genres = document.getElementById("genres")
                let episodes = document.getElementById("episodes")
                let studios = document.getElementById("studios")
                let releaseDate = document.getElementById("release-date")
                let description = document.getElementById("description")

                modal.innerHTML = ""
                modal.style.visibility = "visible"

                // Adding detailed information about chosen tittle
                titleName.innerText = `Title: ${ModalElement.title}`
                // Image
                image.src = ModalElement.images.jpg.large_image_url
                // Rating of the Show
                rating.innerText = `Rating: ${ModalElement.score} ⭐`
                // Release Date
                releaseDate.innerText = `Release Date: ${ModalElement.year}`
                // Genres
                genres.innerText = `Genres: `
                let ModalElementGenres = ModalElement.genres
                for (let i = 0; i < ModalElementGenres.length; i++) {
                    genres.innerText += `${ModalElementGenres[i].name}`
                    if (i === (ModalElementGenres.length-1)) {
                        genres.innerText += `.`
                    }
                    else {
                        genres.innerText += `, `
                    }
                }
                // Total Episodes
                episodes.innerText = `Epiodes: ${ModalElement.episodes}`
                // Studios
                studios.innerText = `Studios: `
                let ModalElementsStudios = ModalElement.studios
                for (let i = 0; i < ModalElementsStudios.length; i++) {
                    studios.innerText += `${ModalElementsStudios[i].name}`
                    if (i === (ModalElementsStudios.length-1)) {
                        studios.innerText += `.`
                    }
                    else {
                        studios.innerText += `, `
                    }
                }
                description.innerHTML = `Description: <br><br>${ModalElement.synopsis}`
                imageWrapper.appendChild(image)
                infoWrapper.appendChild(titleName)
                infoWrapper.appendChild(rating)
                infoWrapper.appendChild(releaseDate)
                infoWrapper.appendChild(episodes)
                infoWrapper.appendChild(genres)
                infoWrapper.appendChild(studios)
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

