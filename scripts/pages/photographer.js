//Mettre le code JavaScript lié à la page photographer.html

// Fonction qui récupère les données des photographes du fichier JSON
async function getPhotographers() {
    const reponse = await fetch("./data/photographers.json");
    const datas = await reponse.json();
    return datas.photographers;
}  

// Fonction qui récupère les données des média du fichier JSON
async function getMedia() {
    const reponse = await fetch("./data/photographers.json");
    const datas = await reponse.json();
    return datas.media;
}

// Fonction qui récupère l'url personnalisé par l'id de chaque photographe
function getUrl() {
    let params = (new URL(document.location)).searchParams
    let id = parseInt(params.get("id"))
    return id
}    
  

function displayHeaderPhotograph(datas, idPhotographer) {
    const photographer = datas.filter(photograph => photograph.id == idPhotographer)
    const {name, portrait, city, country, tagline} = photographer[0]

    const divDescription = document.querySelector(".photograph-description")
    const divImg = document.querySelector(".photograph-img")
    
    divDescription.innerHTML = `
    <h1>${name}</h1>
    <p class="photograph-location">${city}, ${country}</p>
    <p>${tagline}</p>
    `
    divImg.innerHTML = `
    <img src="./assets/photographers/${portrait}" alt="">
    `
}

async function initPhotographerPage(){
    let id = getUrl()
    const photographersData = await getPhotographers()
    const mediaData = await getMedia()
    const photographer = photographersData.filter(photograph => photograph.id == id)
    const firstName = photographer[0].name
    const price = photographer[0].price

    displayHeaderPhotograph(photographersData,id)
}

initPhotographerPage()