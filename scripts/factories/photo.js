import Media from "./media.js";

// Classe Photo qui herite de la classe media
export default class Photo extends Media {
    constructor(options, firstName) {
        super(options);
        this._image = options.image;
        this._title = options.title;
        this._firstName = firstName;
        this.create();
    }

    create(){
        let mediaContent = `<img src="assets/images/${this._firstName}/${this._image}" alt="${this.title}">`;
        super.create(mediaContent)
    }
}