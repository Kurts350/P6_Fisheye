import { photographerFactory } from "../factories/photographer.js";
import MediaFactory from "../factories/mediaFactory.js";

// Fonction qui affiche chaque card photographe dans le DOM
export async function afficherDonnees(photographers) {
  const photographersSection = document.querySelector(".section_photographe");
  let userCardDOM = "";
  photographers.forEach((photographer) => {
    userCardDOM += photographerFactory(photographer);
  });
  photographersSection.innerHTML = userCardDOM;
}

// Fonction qui récupère l'url personnalisé par l'id de chaque photographe
export function recupererUrl() {
  let params = new URL(document.location).searchParams;
  let identity = parseInt(params.get("id"));
  return identity;
}

// Fonction qui affiche les données d'un photographe sur sa page
export function afficherHeaderPhotographe(data, idPhotographer) {
  const photographer = data.filter(
    (photograph) => photograph.id == idPhotographer
  );
  const { name, portrait, city, country, tagline } = photographer[0];
  const divData = document.getElementById("donnees_photographe");
  const divDescription = document.querySelector(".photographe_description");
  const divImg = document.querySelector(".photo_photographe");

  divDescription.innerHTML = `
    <h1 class="prenom">${name}</h1>
    <p class="photograph-location">${city}, ${country}</p>
    <p>${tagline}</p>
    `;
  divImg.innerHTML = `
    <img src="./assets/photographers/${portrait}" alt="">
    `;
}

export function afficherMedia(medias, firstName, sortBy) {
  const divMedias = document.getElementById("medias");
  let articlesList = "";
  let sortedMedias = null;
  let temporary = null;
  let currentParent = null;

  switch (sortBy) {
    case "Likes":
      sortedMedias = medias.sort(function (a, b) {
        if (a.likes < b.likes) {
          return 1;
        } else if (a.likes > b.likes) {
          return -1;
        } else {
          return 0;
        }
      });
      currentParent = document.getElementById("tri_popularite").parentElement.id;
      break;
    case "Date":
      sortedMedias = medias.sort(function (a, b) {
        a = new Date(a.date);
        b = new Date(b.date);
        if (a < b) {
          return 1;
        } else if (a > b) {
          return -1;
        } else {
          return 0;
        }
      });
      currentParent = document.getElementById("tri_date").parentElement.id;
      break;

    case "Title":
      sortedMedias = medias.sort(function (a, b) {
        if (a.title > b.title) {
          return 1;
        } else if (a.title < b.title) {
          return -1;
        } else {
          return 0;
        }
      });
      currentParent = document.getElementById("tri_titre").parentElement.id;
      break;

    default:
      sortedMedias = medias.sort(function (a, b) {
        if (a.likes < b.likes) {
          return 1;
        } else if (a.likes > b.likes) {
          return -1;
        } else {
          return 0;
        }
      });
      currentParent = document.getElementById("tri_date").parentElement.id;
      break;
  }

  temporary = document.getElementById("premier_tri").innerHTML;
  document.getElementById("premier_tri").innerHTML = document.getElementById(currentParent).innerHTML;
  document.getElementById(currentParent).innerHTML = temporary;

  document.querySelector("#tri_popularite").addEventListener("click", () => {
    afficherMedia(sortedMedias, firstName, "Likes");

  });
  document.querySelector("#tri_date").addEventListener("click", () => {
    afficherMedia(sortedMedias, firstName, "Date");
  });
  document.querySelector("#tri_titre").addEventListener("click", () => {
    afficherMedia(sortedMedias, firstName, "Title");
  });

  for (const mediaItem of sortedMedias) {
    let mediaCard = new MediaFactory(mediaItem, firstName);
    articlesList += mediaCard.article;
  }

  divMedias.innerHTML = articlesList;
}

export function afficherPrix(medias, price, id) {
  const mediasList = medias.filter((media) => media.photographerId == id);
  let content = document.getElementById("prix_likes");
  let likesCount = 0;
  for (const media of mediasList) {
    likesCount += media.likes;
  }

  content.innerHTML = `<div id="countLikes">
                        <p>${likesCount}</p>
                        <i class="fa-solid fa-heart"></i>
                      </div> 
                      <p>${price}€ / jour</p>`;
}

export function afficherMenuFiltre() {
  document.querySelector("#fleche_haut").classList.toggle("visible");
  document.querySelector("#fleche_haut").classList.toggle("hidden");

  document.querySelector("#fleche_bas").classList.toggle("visible");
  document.querySelector("#fleche_bas").classList.toggle("hidden");

  if (document.querySelector("#fleche_bas").classList.contains("visible")) {
    document.getElementById("fleche_bas").focus();
  } else {
    document.getElementById("fleche_haut").focus();
  }

  document.querySelector("#deuxieme_tri").classList.toggle("visible");
  document.querySelector("#deuxieme_tri").classList.toggle("hidden");
  document.querySelector("#troisieme_tri").classList.toggle("visible");
  document.querySelector("#troisieme_tri").classList.toggle("hidden");
}
