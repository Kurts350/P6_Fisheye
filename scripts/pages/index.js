// Fonction qui récupère les données du fichier JSON
async function getPhotographers() {
  const reponse = await fetch("./data/photographers.json");
  const datas = await reponse.json();
  return datas.photographers;
}

// Fonction qui affiche chaque card photographe dans le DOM
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");
  let userCardDOM = ""
  photographers.forEach((photographer) => {
    userCardDOM += photographerTemplate(photographer)
  });
  photographersSection.innerHTML = userCardDOM
}

async function init() {
  // Récupère les datas des photographes
  const photographers = await getPhotographers();
  displayData(photographers);
}

init();

