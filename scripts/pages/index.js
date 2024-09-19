import { recupererPhotographe } from "../utils/entreeData.js";
import { afficherDonnees } from "../utils/interface_utilisateur.js";

// Fonction qui initialise l'affichage
async function init() {
  const photographes = await recupererPhotographe();
  afficherDonnees(photographes);
}

init();
