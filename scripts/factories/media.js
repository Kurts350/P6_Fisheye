export default class Media {
  constructor(options) {
    this._title = options.title;
    this._likes = options.likes;
    this._id = options.id;
  }
// Le média qui s'affiche dans la zone médias de chaque photographe
  create(mediaContent) {
    this.article = `<article class="articleMedia">
    <a href="#" title="${this._title}, vue agrandie" data-id="${this._id}" id="${this._id}" class="lienMedia" role="button" aria-haspopup="dialog" aria-controls="lightbox">
     ${mediaContent}
    </a>                            
    <div class="media-display">
    <h2 class="titleMedia">${this._title}</h2>
    <div class="totalLikes">
        <div class="contentLikes">
            <span class="marginLikes">${this._likes}</span>
            <button aria-label="likes">
            <i class="fa-heart far iconHeart" aria-hidden="true"></i>
            </button>
        </div>   
    </div>
    </div>

</article>`;

  }
}
