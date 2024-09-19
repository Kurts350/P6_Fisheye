//Mettre le code JavaScript lié à la page photographe.html
import { recupererPhotographe } from "../utils/entreeData.js";
import { recupererMedia } from "../utils/entreeData.js";
import { recupererUrl } from "../utils/interface_utilisateur.js";
import { afficherHeaderPhotographe } from "../utils/interface_utilisateur.js";
import { afficherMedia } from "../utils/interface_utilisateur.js";
import { afficherPrix } from "../utils/interface_utilisateur.js";
import { afficherMenuFiltre } from "../utils/interface_utilisateur.js";
import { ajouterLike } from "../utils/interface_utilisateur.js";
import Lightbox from "../utils/lightbox.js";

async function initialiserPagePhotographe() {
  let identite = recupererUrl();
  const donneePhotographe = await recupererPhotographe();
  const donneeMedia = await recupererMedia();
  const photographe = donneePhotographe.filter(
    (photograph) => photograph.id == identite
  );
  const prenom = photographe[0].name.split(" ")[0];
  const prix = photographe[0].price;
  const photographeMedias = donneeMedia.filter(
    (media) => media.photographerId == identite
  );
  let lightbox = null;
  lightbox = new Lightbox(photographeMedias, prenom);

  afficherHeaderPhotographe(donneePhotographe, identite);
  afficherMedia(photographeMedias, prenom, null, lightbox);
  afficherPrix(photographeMedias, prix, identite);


  // Etend et réduit les filtres
  document
    .querySelector("#fleche_haut")
    .addEventListener("click", afficherMenuFiltre);
  document
    .querySelector("#fleche_bas")
    .addEventListener("click", afficherMenuFiltre);

  // Etend et réduit les filtres avec l'accessibilité
  document.querySelector("#fleche_bas").addEventListener("keyup", (event) => {
    if (event.keyCode == "13") {
      afficherMenuFiltre();
    }
  });
  document.querySelector("#fleche_haut").addEventListener("keyup", (event) => {
    if (event.keyCode == "13") {
      afficherMenuFiltre();
    }
  });

  // Incrementation des likes sur chaque photos, qui incremente le nombre total de likes
  let listeDivLike = document.querySelectorAll("div.totalLikes");
  for (const like of listeDivLike) {
    like.addEventListener("click", ajouterLike);
  }
}

initialiserPagePhotographe();
