import Video from "./video.js";
import Photo from "./photo.js";
/* Instances des classes Photo et Video qui héritent de la classe Media */
export default class MediaFactory {
    constructor(media, firstName) {
        if (media.image) {
            return new Photo(media, firstName);
        } else if (media.video) {
            return new Video(media, firstName);
        }
    }
}