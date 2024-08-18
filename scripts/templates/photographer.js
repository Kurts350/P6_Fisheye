function photographerTemplate(data) {
  const { id, name, city, country, tagline, price, portrait } = data;
  const article = `
   <article>
   <a href="./photographer.html?id=${id}" title="${name}">
     <img src="./assets/photographers/${portrait}" alt="${name}">
   </a>
   <h2>${name}</h2>
   <p>${city}, ${country}</p>
   <p>${tagline}</p>
   <p>${price}€/jour</p>
 </article>
   `;
  return article;
}