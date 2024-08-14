// function photographerTemplate(data) {
//     const { name, portrait } = data;

//     const picture = `assets/photographers/${portrait}`;

//     function getUserCardDOM() {
//         const article = document.createElement( 'article' );
//         const img = document.createElement( 'img' );
//         img.setAttribute("src", picture)
//         const h2 = document.createElement( 'h2' );
//         h2.textContent = name;
//         article.appendChild(img);
//         article.appendChild(h2);
//         return (article);
//     }
//     return { name, picture, getUserCardDOM }
// }

function photographerTemplate(data) {
    const { name, city, country, tagline, price, portrait } = data;
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const link = document.createElement('a')
        const img = document.createElement( 'img' );
        const h2 = document.createElement( 'h2' );
        const cityCountry = document.createElement('h3')
        const description = document.createElement('p')
        const tjm = document.createElement('p')
        h2.textContent = name;
        cityCountry.textContent = city + ", " + country
        description.textContent = tagline
        tjm.textContent = price + "€" + "/jour"
        img.setAttribute("src", picture)
        img.setAttribute("alt", name )
        article.appendChild(link)
        link.appendChild(img);
        link.appendChild(h2);
        article.appendChild(cityCountry)
        article.appendChild(description)
        article.appendChild(tjm)
        return (article);
    }
    return { name, picture, getUserCardDOM }
}