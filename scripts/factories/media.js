export default class Media {
  constructor(options) {
    this.title = options.title;
    this.likes = options.likes;
    this.id = options.id;
  }

  create(mediaContent) {
    this.article = `
        <article>
            <a href="#" title="${this.title}, vue agrandie" data-id="${this.id}" id="${this.id}" class="" role="button" aria-haspopup="dialog" aria-controls="lightbox">
             ${mediaContent}
            </a>
            <div class="descriptionMedia">
              <p class="titleMedia">${this.title}</p>
              <div class="Likes" aria-label="likes">
                  <p>${this.likes}</p>
                  <i class="fa-solid fa-heart fa-lg"></i>
              </div>
            </div>
        </article>
        `;

  }
}
