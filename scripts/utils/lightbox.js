export default class Lightbox {
  constructor(mediasList, firstName) {
    this._selectMedia = null;
    this._mediaList = mediasList;
    this._firstName = firstName;
    this.events();
  }
// Lance la lightbox
  launch(id) {
    this._selectMedia = this.getId(id);
    this.afficherMedia();
    document.getElementById("lightbox").focus();
  }
  // Recupere l'id du media
  getId(id) {
    return this._mediaList.find((media) => media.id == id);
  }
// Gestion de l'affichage selon les bouttons de la lightbox
  events() {
    document
      .querySelector("#lightbox .mediaPrecedent")
      .addEventListener("click", () => {
        this.precedent();
      });

    document
      .querySelector("#lightbox .mediaSuivant")
      .addEventListener("click", () => {
        this.suivant();
      });

    document
      .querySelector("#lightbox .fermerLightbox")
      .addEventListener("click", () => {
        this.fermer();
      });

    document.querySelector("#lightbox").addEventListener("click", (event) => {
      if (event.target == event.currentTarget) {
        this.fermer();
      }
    });
// Accessibilte & navigation clavier
    const elementsFocus = document.querySelectorAll(
      "#lightbox .mediaSuivant, #lightbox .mediaPrecedent, #lightbox .fermerLightbox"
    );
    const premierElement = elementsFocus[0];
    const dernierElement = elementsFocus[elementsFocus.length - 1];
    document.querySelector("#lightbox").addEventListener("keydown", (event) => {
      if (event.target == dernierElement) {
        if (!event.shiftKey && event.key == "Tab") {
          event.preventDefault();
          document.getElementById(premierElement.id).focus();
        }
      } else if (event.target == premierElement) {
        if (event.shiftKey && event.key == "Tab") {
          event.preventDefault();
          document.getElementById(dernierElement.id).focus();
        }
      }

      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          this.precedent();
          break;
        case "ArrowRight":
          event.preventDefault();
          this.suivant();
          break;
        case "Escape":
          event.preventDefault();
          this.fermer();
          break;
      }
    });
  }

  suivant() {
    if (!this._selectMedia || !this._selectMedia.id) {
      console.error("Aucun média sélectionné ou ID manquant.");
      return; // Sortir de la fonction si _selectMedia est null
    }

    let index = this._mediaList.findIndex(
      (media) => media.id == this._selectMedia.id
    );
    if (index == this._mediaList.length - 1) {
      this._selectMedia = this._mediaList[0];
    } else {
      this._selectMedia = this._mediaList[index + 1];
    }
    this.afficherMedia();
  }

  precedent() {
    if (!this._selectMedia || !this._selectMedia.id) {
      console.error("Aucun média sélectionné ou ID manquant.");
      return; // Sortir de la fonction si _selectMedia est null
    }

    let index = this._mediaList.findIndex(
      (media) => media.id == this._selectMedia.id
    );
    if (index == 0) {
      this._selectMedia = this._mediaList[this._mediaList.length - 1];
    } else {
      this._selectMedia = this._mediaList[index - 1];
    }
    this.afficherMedia();
  }

  fermer() {
    document.getElementById("contenu_principal").ariaHidden = "false";
    document.getElementById("lightbox").ariaHidden = "true";
    document.querySelector("#lightbox").classList.remove("displayMedia");
    body.classList.remove("no-scroll")
    
    if (this._selectMedia && this._selectMedia.id) {
      document.getElementById(this._selectMedia.id).focus();
    } else {
      console.error("Media sélectionné invalide ou ID manquant.");
    }
  }
  // Affiche le media dans la lightbox
  afficherMedia() {
    let media = "";
    if (this._selectMedia.image) {
      media = `<img src="assets/images/${this._firstName}/${this._selectMedia.image}" alt="${this._selectMedia.title}" class="lightboxMedia">
            <p class="mediaTitle">${this._selectMedia.title}</p>`;
    } else if (this._selectMedia.video) {
      media = `<video controls class="lightboxMedia"><source src="assets/images/${this._firstName}/${this._selectMedia.video}" type="video/mp4"></video>
            <p class="mediaTitle">${this._selectMedia.title}</p>`;
    }
    document.getElementById("divMediaLightbox").innerHTML = media;

    document.getElementById("contenu_principal").ariaHidden = "true";
    document.getElementById("lightbox").ariaHidden = "false";
    document.querySelector("#lightbox").classList.add("displayMedia");
    body.classList.add("no-scroll")

  }
}
