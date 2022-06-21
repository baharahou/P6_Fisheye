"use strict";

//form submission
function ContactModal(photographerId) {
  //variables
  const modalBtn = document.querySelector(".contact");
  const submitBtn = document.getElementById("submit-btn");
  const modalBg = document.querySelector(".bground-contact");
  const closeModal = document.querySelector(".close-contactForm");
  const modalHeader = document.querySelector(".form-header");
  const form = document.getElementById("contact-form");
  const firstName = document.querySelector("#prenom");
  const firstnameDiv = document.querySelector("#prenom-div");
  const lastName = document.querySelector("#nom");
  const lastnameDiv = document.querySelector("#nom-div");
  const email = document.querySelector("#email");
  const emailDiv = document.querySelector("#email-div");
  const message = document.querySelector("#message");
  const messageDiv = document.querySelector("#message-div");
  const echap = document.querySelector(".content");
  const nameFormat = /^[a-zA-ZÀ-ÖØ-öø-ÿ]+\s{0,1}[a-zA-ZÀ-ÖØ-öø-ÿ]+$/;
  const mailFormat =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //functions
  //get focus
  function addFocus() {
    form.focus();
    firstName.tabIndex = 0;
    document.querySelectorAll(".photo").forEach((elt) => {
      elt.tabIndex = 1;
    });
    document.querySelectorAll(".like").forEach((elt) => {
      elt.tabIndex = 1;
    });
  }
  function removeFocus() {
    form.blur();
    firstName.tabIndex = 1;
    document.querySelectorAll(".photo").forEach((elt) => {
      elt.tabIndex = 0;
    });
    document.querySelectorAll(".like").forEach((elt) => {
      elt.tabIndex = 0;
    });
  }
  //launch Modal form
  function launchModal() {
    addFocus();
    modalBg.style.display = "block";
    modalBtn.style.display = "none";
    let header = `${photographerId[0].name}</br> Contactez-moi`;
    modalHeader.innerHTML = header;
  }
  //close Modal form
  function crossClose() {
    removeFocus();
    modalBg.style.display = "none";
    modalBtn.style.display = "block";
  }
  // Event listeners
  modalBtn.addEventListener("click", launchModal);
  closeModal.addEventListener("click", crossClose);
  echap.addEventListener("keydown", (e) => {
    //console.log(e);
    if (e.keyCode === 27) {
      crossClose();
    }
  });
  /************************************************************** */

  function checkFirstName() {
    if (
      firstName.value.trim().length < 2 ||
      firstName.value.trim() === "" ||
      !firstName.value.match(nameFormat)
    ) {
      firstnameDiv.setAttribute(
        "data-error",
        "merci de donner un prenom valide de 2 caractères minimum"
      );
      firstnameDiv.setAttribute("data-error-visible", "true");
      firstName.style.border = "0.3rem solid #e54858";
      return false;
    } else {
      firstnameDiv.setAttribute("data-error-visible", "false");
      firstName.style.border = "solid #279e7a 0.3rem";
      return true;
    }
  }
  function checkLastName() {
    if (
      lastName.value.trim().length < 2 ||
      lastName.value.trim() === "" ||
      !lastName.value.match(nameFormat)
    ) {
      lastnameDiv.setAttribute(
        "data-error",
        "merci de donner un nom valide de 2 caractères minimum"
      );
      lastnameDiv.setAttribute("data-error-visible", "true");
      lastName.style.border = "0.3rem solid #e54858";
      return false;
    } else {
      lastnameDiv.setAttribute("data-error-visible", "false");
      lastName.style.border = "solid #279e7a 0.3rem";
      return true;
    }
  }
  function checkEmail() {
    if (
      email.value.trim().length < 2 ||
      email.value.trim() === "" ||
      !email.value.match(mailFormat)
    ) {
      emailDiv.setAttribute(
        "data-error",
        "merci de donner une adresse mail valide"
      );
      emailDiv.setAttribute("data-error-visible", "true");
      email.style.border = "0.3rem solid #e54858";
      return false;
    } else {
      emailDiv.setAttribute("data-error-visible", "false");
      email.style.border = "solid #279e7a 0.3rem";
      return true;
    }
  }
  function checkMessage() {
    if (message.value == "") {
      messageDiv.setAttribute("data-error", `merci d'entrer votre message`);
      messageDiv.setAttribute("data-error-visible", "true");
      message.style.border = "0.3rem solid #e54858";
      return false;
    } else {
      messageDiv.setAttribute("data-error-visible", "false");
      message.style.border = "solid #279e7a 0.3rem";
      return true;
    }
  }
  function formFieldsValidation(element, method, event) {
    element.addEventListener(event, method);
  }
  formFieldsValidation(firstName, checkFirstName, "focusout");
  formFieldsValidation(lastName, checkLastName, "focusout");
  formFieldsValidation(email, checkEmail, "focusout");
  formFieldsValidation(message, checkMessage, "focusout");

  /************************************************************ */
  function forAllFieldsValidation() {
    checkFirstName();
    checkLastName();
    checkEmail();
    checkMessage();
  }

  function formValidation() {
    if (
      checkFirstName() === true &&
      checkLastName() === true &&
      checkEmail() === true &&
      checkMessage() === true
    ) {
      return true;
    } else {
      console.log("données incorrect");

      return false;
    }
  }
  const validate = () => {
    form.reset();
    modalBtn.style.display = "block";
    firstName.style.border = "none";
    lastName.style.border = "none";
    email.style.border = "none";
    message.style.border = "none";
  };
  // Form validation
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (formValidation() == true) {
      modalBg.style.display = "none";
      console.log(firstName.value, lastName.value, email.value, message.value);
      alert("Merci d'avoir nous contactez !!");
      validate();
    } else {
      alert(`veuillez remplir le formulaire pour nous contacter \r\nMerci!!`);
    }
  });
}
export { ContactModal };
