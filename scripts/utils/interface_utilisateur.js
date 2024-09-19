import { photographerFactory } from "../factories/photographe.js";
import MediaFactory from "../factories/mediaFactory.js";

// Fonction qui affiche chaque card photographe dans le DOM
export async function afficherDonnees(photographes) {
  const photographesSection = document.querySelector(".section_photographe");
  let profileCardDOM = "";
  photographes.forEach((photographe) => {
    profileCardDOM += photographerFactory(photographe);
  });
  photographesSection.innerHTML = profileCardDOM;
}

// Fonction qui récupère l'url personnalisé par l'id de chaque photographe
export function recupererUrl() {
  let params = new URL(document.location).searchParams;
  let identite = parseInt(params.get("id"));
  return identite;
}

// Fonction qui affiche les données d'un photographe sur sa page
export function afficherHeaderPhotographe(donnee, idPhotographe) {
  const photographe = donnee.filter(
    (photograph) => photograph.id == idPhotographe
  );
  const { name, portrait, city, country, tagline } = photographe[0];
  const divDescription = document.querySelector(".photographe_description");
  const divImg = document.querySelector(".photo_photographe");

  divDescription.innerHTML = `
    <h1 class="prenom">${name}</h1>
    <p class="photographe-localisation">${city}, ${country}</p>
    <p>${tagline}</p>
    `;
  divImg.innerHTML = `
    <img src="./assets/photographers/${portrait}" alt="">
    `;
}

export function afficherMedia(medias, prenom, trierPar, lightbox) {
  /* zone pour depoloyer les médias */
  const divMedias = document.getElementById("medias");
  let articlesListe = "";
  let mediasTrier = null;
  let temporaire = null;
  let parentActuel = null;

  // Tri décroissant likes du média. les opérateurs de comparaison sont inversés pour passer en tri croissant
  switch (trierPar) {
    case "Likes":
      mediasTrier = medias.sort(function (a, b) {
        if (a.likes < b.likes) {
          return 1;
        } else if (a.likes > b.likes) {
          return -1;
        } else {
          return 0;
        }
      });
      parentActuel = document.getElementById("tri_popularite").parentElement.id;
      break;

    // Tri décroissant de la date du média.
    case "Date":
      mediasTrier = medias.sort(function (a, b) {
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
      parentActuel = document.getElementById("tri_date").parentElement.id;
      break;

    // Tri décroissant du titre du média.
    case "Titre":
      mediasTrier = medias.sort(function (a, b) {
        if (a.title > b.title) {
          return 1;
        } else if (a.title < b.title) {
          return -1;
        } else {
          return 0;
        }
      });
      parentActuel = document.getElementById("tri_titre").parentElement.id;
      break;

    // Tri par defaut de manière decroissante le like du média.
    default:
      mediasTrier = medias.sort(function (a, b) {
        if (a.likes < b.likes) {
          return 1;
        } else if (a.likes > b.likes) {
          return -1;
        } else {
          return 0;
        }
      });
      parentActuel = document.getElementById("tri_popularite").parentElement.id;
      break;
  }

  // Les boutons de trie s'inversent selon le boutton cliqué
  temporaire = document.getElementById("premier_tri").innerHTML;
  document.getElementById("premier_tri").innerHTML =
    document.getElementById(parentActuel).innerHTML;
  document.getElementById(parentActuel).innerHTML = temporaire;

  document.querySelector("#tri_popularite").addEventListener("click", () => {
    afficherMedia(mediasTrier, prenom, "Jaime", lightbox);
  });
  document.querySelector("#tri_date").addEventListener("click", () => {
    afficherMedia(mediasTrier, prenom, "Date", lightbox);
  });
  document.querySelector("#tri_titre").addEventListener("click", () => {
    afficherMedia(mediasTrier, prenom, "Titre", lightbox);
  });


  // Les cartes medias parcours les medias tries
  for (const mediaObject of mediasTrier) {
    let mediaCard = new MediaFactory(mediaObject, prenom);
    articlesListe += mediaCard.article;
  }

  // Affiche le media dans son emplacement html
  divMedias.innerHTML = articlesListe;

  // Chaque lightbox pointe sur le lien de chaque média
  let listeLiensMedias = document.querySelectorAll("a.lienMedia");
  lightbox.mediasList = mediasTrier;

  // Ajouter un écouteur d'événement sur le clic du cœur de chaque carte afin d'incrémenter le nombre de likes de la carte, puis mettre à jour le total global des likes de toutes les cartes.
  let listDivLike = document.querySelectorAll("div.totalLikes");
  for (const like of listDivLike) {
    like.addEventListener("click", ajouterLike);
  }

  for (const lien of listeLiensMedias) {
    lien.addEventListener("click", (event) => {
      lightbox.launch(event.currentTarget.dataset.id);
    });
  }
}

export function afficherPrix(medias, prix, id) {
  const mediasList = medias.filter((media) => media.photographerId == id);
  let content = document.getElementById("prix_likes");
  let compteLikes = 0;
  for (const media of mediasList) {
    compteLikes += media.likes;
  }

  content.innerHTML = `<div id="compteLikes">
                        <p>${compteLikes}</p>
                        <i class="fa-solid fa-heart"></i>
                      </div> 
                      <p>${prix}€ / jour</p>`;
}

// Gere l'affichage du menu de tri
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

//  Incrementation du nombre de like
export function ajouterLike() {
  let actuel = parseInt(this.firstElementChild.innerText);
  this.firstElementChild.innerText = actuel + 1;
  let nombreLike = this.firstElementChild.innerText;
  this.firstElementChild.innerHTML = `<span class="marginLikes">${nombreLike}</span><button aria-label="likes"><i class="fa-heart fas iconHeart" aria-hidden="true"></i></button>`;
  this.removeEventListener("click", ajouterLike);
  this.addEventListener("click", retirerLike);
  let totalActuel = parseInt(
    document.getElementById("compteLikes").firstElementChild.innerText
  );
  document.getElementById("compteLikes").firstElementChild.innerText =
    totalActuel + 1;
}

// Decrementation du nombre de like
export function retirerLike() {
  let actuel = parseInt(this.firstElementChild.innerText);
  this.firstElementChild.innerText = actuel - 1;
  let nombreLike = this.firstElementChild.innerText;
  this.firstElementChild.innerHTML = `<span class="marginLikes">${nombreLike}</span><button aria-label="likes"><i class="fa-heart far iconHeart" aria-hidden="true"></i></button>`;
  this.removeEventListener("click", retirerLike);
  this.addEventListener("click", ajouterLike);
  let totalActuel = parseInt(
    document.getElementById("compteLikes").firstElementChild.innerText
  );
  document.getElementById("compteLikes").firstElementChild.innerText =
    totalActuel - 1;
}
