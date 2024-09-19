import Media from "./media.js";

// Classe Video qui herite de la classe media
export default class Video extends Media {
    constructor(options, firstName) {
        super(options);
        this._video = options.video;
        this._firstName = firstName;
        this.create();
    }

    create(){
        let mediaContent = `<video src="assets/images/${this._firstName}/${this._video}" type="video/mp4 class="">`;
        super.create(mediaContent);
    }
}