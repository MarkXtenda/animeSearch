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
let adultContent = "&sfw"

let pageClick = document.getElementById("pages")
let btnNext = document.getElementById("next")
let btnPrev = document.getElementById("previous")

const animeResults = document.getElementById("results")

function fetchFunction(url, page = "") {
    fetch(url + page).then(response=>response.json()).then((list)=>{
        animeList = list.data
        pageCheck()
})
}
// Print the Cards
function printResult() {
    animeList.forEach(anime => {
        let animeCard = document.createElement("div")
        animeCard.className = "animeCard"

        let animeImg = document.createElement("img")
        animeImg.src = anime.images.jpg.image_url

        animeCard.innerText = anime.title_english
        animeCard.appendChild(animeImg)

        animeResults.appendChild(animeCard)
    })
}
// Number Check
function nameCheck(name) {
    if (parseInt(name)) {
       if (parseInt(name) <= 10) {
            console.log(currentUrl)
            return currentUrl = ratingUrl
       } 
       else {
            console.log(currentUrl)
            return currentUrl = yearUrl
       }
    }
    else {
        currentUrl = animeUrl
    }
}
// Page Check
function pageCheck() {
    if (animeList.length < 25) {
        btnNext.disabled = true
        printResult()
    }
    else {
        btnNext.disabled = false
        printResult()
    }
    if (pageCount.innerText == "1") {
        btnPrev.disabled = true
    }
    else {
        btnPrev.disabled = false
        printResult()
    }
}

// Empty Search bar case
function emptySearchBar(name) {
    if (name === "") {
        currentUrl = mainUrl
        fetchFunction(currentUrl)
    }
}

emptySearchBar(searchText.value)

// Search Anime
search.addEventListener("click", (event)=>{
    animeResults.innerHTML = ""
    let name = searchText.value
// Check if typed word is actually a number or text
    nameCheck(name)
// Check if typed word is empty
    emptySearchBar(name)
    pageCount.innerText = 1
    currentState = currentUrl + name
    console.log(currentState)
    fetchFunction(currentState)
    event.preventDefault()
})

// Navigate using Next and Previous buttons
pageClick.addEventListener("click", (event)=>{
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