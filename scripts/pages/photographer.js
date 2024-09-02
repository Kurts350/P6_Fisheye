//Mettre le code JavaScript lié à la page photographer.html
import { recupererPhotographe  } from "../utils/entreeData.js";
import { recupererMedia } from "../utils/entreeData.js";
import { recupererUrl } from "../utils/interface_utilisateur.js";
import { afficherHeaderPhotographe } from "../utils/interface_utilisateur.js";
import { afficherMedia } from "../utils/interface_utilisateur.js";
import { afficherPrix } from "../utils/interface_utilisateur.js";
import { afficherMenuFiltre } from "../utils/interface_utilisateur.js";

async function initialiserPagePhotographe() {
  let identity = recupererUrl();
  const photographerData = await recupererPhotographe();
  const mediaData = await recupererMedia();
  const photographer = photographerData.filter(
    (photograph) => photograph.id == identity
  );
  const firstName = photographer[0].name.split(' ')[0];
  const price = photographer[0].price;

  const photographerMedias = mediaData.filter(media => media.photographerId == identity);
  

  afficherHeaderPhotographe(photographerData,identity);
  afficherMedia(photographerMedias,firstName, null);
  afficherPrix(photographerMedias, price, identity);


document.querySelector("#fleche_haut").addEventListener("click", afficherMenuFiltre);
document.querySelector("#fleche_bas").addEventListener("click", afficherMenuFiltre);

}



initialiserPagePhotographe();
