const body = document.getElementById("body");
const ouvrirModal = document.getElementById("ouvrirModal");
const modal = document.getElementById("contact_modal");
const form = document.getElementById("formulaire_contact");
const prenom = document.getElementById("prenom");
const nom = document.getElementById("nom");
const email = document.getElementById("email");
const message = document.getElementById("message");
const fermerFormContact = document.getElementById("fermer_form_contact");
const btnEnvoyer = document.querySelector(".bouton_contact");

ouvrirModal.addEventListener("click", (event) => {
  afficherModal(event);
});

fermerFormContact.addEventListener("click", (event) => {
  fermerModal(event);
});

// Bloquer le rechargement de la page si le formulaire n'est pas valide
form.addEventListener("submit", function (event) {
  let formIsValid = true;
  event.preventDefault();
  if (
    prenom.value.length < 2 ||
    nom.value.length < 2 ||
    !validEmail(email.value) ||
    message.value.length < 10
  ) {
    formIsValid = false;
  }
  if (formIsValid === true) {
    location.reload();
    fermerModal();
  }
});

// Règle de validation : si le champs prénom contient moins de 2 caractère, empecher la soumission du formulaire
prenom.addEventListener("change", (event) => {
  if (prenom.value.length < 2) {
    flashErrorMessage(
      event,
      "Veuillez entrer 2 caractères ou plus pour le champ du prénom."
    );
  }
});

// Règle de validation : si le champs nom contient moins de 2 caractère, empecher la soumission du formulaire
nom.addEventListener("change", (event) => {
  if (nom.value.length < 2) {
    flashErrorMessage(
      event,
      "Veuillez entrer 2 caractères ou plus pour le champ du prénom."
    );
  }
});

// Règle de validation : si le champs email ne respect pas la regexp, empecher la soumission du formulaire
email.addEventListener("change", (event) => {
  if (!validEmail(email.value)) {
    flashErrorMessage(event, "Veuillez entrer une adresse mail valide.");
  }
});

message.addEventListener("change", (event) => {
  if (message.value.length < 10) {
    flashErrorMessage(
      event,
      "Veuillez entrer 10 caractères ou plus pour le champ des messages."
    );
  }
});

function afficherModal() {
  let prenom = document.querySelector("h1.prenom").innerText;
  const elementFocus = document.querySelectorAll(
    "#contact_modal input, #contact_modal textarea, #contact_modal img, #contact_modal button"
  );
  modal.style.display = "block";
  const premierElement = elementFocus[0];
  const dernierElement = elementFocus[elementFocus.length - 1];
  document.getElementById("contactMe").innerHTML = "Contactez-moi " + prenom;
  document.getElementById("body").ariaHidden = "true";
  document.getElementById("contact_modal").ariaHidden = "false";
  // body.classList.add("no-scroll")
  fermerFormContact.focus();
  modal.style.display = "block";
  document
    .querySelector("#contact_modal")
    .addEventListener("keydown", (event) => {
      const actuel = event.target;
      if (
        event.key === "Escape" ||
        (event.key === "Enter" && actuel == premierElement)
      ) {
        event.preventDefault();
        fermerModal();
      } else if (actuel == dernierElement) {
        if (!event.shiftKey && event.key === "Tab") {
          event.preventDefault();
          document.getElementById(premierElement.id).focus();
        }
      } else if (actuel == premierElement) {
        if (event.shiftKey && event.key == "Tab") {
          event.preventDefault();
          document.getElementById(dernierElement.id).focus();
        }
      }
      if (event.target == fermerFormContact && event.key === " ") {
        fermerModal(event);
      }
    });
}

function fermerModal() {
  modal.style.display = "none";
  document.getElementById("body").ariaHidden = "false";
  document.getElementById("contact_modal").ariaHidden = "true";
  body.classList.remove("no-scroll");
  document.getElementById("ouvrirModal").focus();
}

// Afficher les messages d'erreur liés aux inputs
function flashErrorMessage(event, message) {
  const target = event.target;
  const parent = target.parentElement;

  parent.setAttribute("data-error", message);
  parent.setAttribute("data-error-visible", "true");
  setTimeout(removeErrorMessages, 10000);
}

// Retirer les messages d'erreur liés aux inputs
function removeErrorMessages() {
  const errorMessages = document.querySelectorAll("[data-error]");
  errorMessages.forEach((errorMessage) => {
    errorMessage.removeAttribute("data-error");
    errorMessage.removeAttribute("data-error-visible");
  });
}

// Controle la validation du prenom
const validerPrenom = function (prenom) {
  if (prenom.value.length < 2) {
    flashErrorMessage(
      { target: prenom },
      "Veuillez entrer 2 caractères ou plus pour le champ du prénom."
    );
    return false;
  } else {
    removeErrorMessages(prenom);
    return true;
  }
};

// Controle la validation du nom
const validLast = function (nom) {
  if (nom.value.length < 2) {
    flashErrorMessage(
      { target: nom },
      "Veuillez entrer 2 caractères ou plus pour le champ du nom."
    );
    return false;
  } else {
    removeErrorMessages(nom);
    return true;
  }
};
// Controle la validation de l'email
const validEmail = function (email) {
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
  );
  return emailRegExp.test(email);
};
