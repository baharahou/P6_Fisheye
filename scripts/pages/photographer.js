"use strict";

import Gallery from "../utils/Gallery.js";
import { ContactModal } from "../utils/contactForm.js";
export default class PhotographersPage {
  displayPhotographers(data) {
    const id = window.location.search.split("id=")[1];
    const photographerId = data.photographers.filter(
      (photographer) => photographer.id == id
    );
    const photographerInfo = document.querySelector(
      ".photographer__id__section"
    );
    const photographeHeader = document.createElement("article");
    photographeHeader.className += "photographer__header";
    photographeHeader.ariaLabel += "Informations photographe";
    const titlePagePhotographer = document.getElementById("page-photographer");
    titlePagePhotographer.textContent = "FisheYe - " + photographerId[0].name;
    // html template for photographer info
    let info = `
            <h1 aria-label="${photographerId[0].name}" tabindex="0" role="information" class ="photographer__name">${photographerId[0].name}</h1>
            <div aria-label="photo portrait ${photographerId[0].name}"  class="photographer__id">
                <img src="../assets/photographers/${photographerId[0].portrait}" alt="photographer portrait">
            </div>
            <div class="photographer__info">
              <p class="photographer__location photographer__page-text" aria-label="Localisation géographique ${photographerId[0].city} , ${photographerId[0].country}" role="information" tabindex="0">
                ${photographerId[0].city} , ${photographerId[0].country}
              </p>
              <p class="photographer__devise photographer__page-text" aria-label="Devise photographe, ${photographerId[0].tagline}" role="information" tabindex="0">
                ${photographerId[0].tagline}
              </p>
            </div>
            <button class="btn contact">Contactez-moi</button>
            
            `;

    photographerInfo.appendChild(photographeHeader);
    photographeHeader.innerHTML = info;
    /** contact modal **/
    ContactModal(photographerId);
    new Gallery().displayGallery(data.medias, photographerId);

    /****************************get all likes****************************** */

    //queryslectors & variables
    const likesAndPriceDiv = document.querySelector(".likesAndPrice");

    let likesAndPrice = "";
    let totalLikes = 0;
    let likeContainer = document.querySelectorAll(".photo__likes");

    //functions
    function getAllLikes() {
      for (let i = 0; i < likeContainer.length; i++) {
        totalLikes += parseInt(likeContainer[i].innerHTML);
      }
    }
    function likeOrDislike() {
      const likeBtn = document.querySelectorAll(".like");
      likeBtn.forEach((item) => {
        let total = document.querySelector(".total__likes");
        let photoLikes = item.previousElementSibling;
        let icon = item.firstChild;
        item.addEventListener("click", (e) => {
          if (icon.classList.contains("portfolio__heart--liked")) {
            icon.classList.replace(
              "portfolio__heart--liked",
              "portfolio__heart"
            );
            icon.classList.replace("fas", "far");
            photoLikes.innerHTML--;
            totalLikes--;
            total.innerHTML = parseInt(totalLikes);
          } else {
            icon.classList.replace(
              "portfolio__heart",
              "portfolio__heart--liked"
            );
            icon.classList.replace("far", "fas");
            photoLikes.innerHTML++;
            totalLikes++;
            total.innerHTML = parseInt(totalLikes);
          }
        });
      });
    }
    getAllLikes();
    //add inner HTML in div
    likesAndPrice = `<p class="total__likes">${totalLikes}</p> <span><i class="fas fa-heart total__likes--heart"></i></span><p class="price">${photographerId[0].price}€/jour</p>`;
    likesAndPriceDiv.innerHTML += likesAndPrice;
    likeOrDislike();
  }
}
