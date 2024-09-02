import Media from "./media.js";

export default class Video extends Media {
    constructor(options, firstName) {
        super(options);
        this.video = options.video;
        this.title = options.title;
        this.firstName = firstName;
        this.create();
    }

    create(){
        let mediaContent = `<video src="assets/images/${this.firstName}/${this.video}" type="video/mp4 class="">`;
        super.create(mediaContent);
    }
}