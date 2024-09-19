// Fonction qui récupère les données du fichier JSON
export async function recupererPhotographe() {
  const reponse = await fetch("./data/photographers.json");
  const donnee = await reponse.json();
  return donnee.photographers;
}


// Fonction qui récupère les données des média du fichier JSON
export async function recupererMedia() {
  const reponse = await fetch("./data/photographers.json");
  const donnee = await reponse.json();
  return donnee.media;
}