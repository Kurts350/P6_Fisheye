// Fonction qui récupère les données du fichier JSON
export async function recupererPhotographe() {
  const reponse = await fetch("./data/photographers.json");
  const data = await reponse.json();
  return data.photographers;
}


// Fonction qui récupère les données des média du fichier JSON
export async function recupererMedia() {
  const reponse = await fetch("./data/photographers.json");
  const data = await reponse.json();
  return data.media;
}