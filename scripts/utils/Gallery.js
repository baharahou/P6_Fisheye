"use strict";
import { filterBy } from "./Filter.js";
import { showLightbox } from "./Lightbox.js";

export default class Gallery {
  displayGallery(medias, photographerId) {
    //medias returns an array containing all medias objects
    //photographerId returns an array with 1 object containing the selected photographer info.
    const gallerySection = document.querySelector(".gallery");
    gallerySection.id += "photos-list";
    const select = document.getElementById("listbox"); //select html
    const photographerMedias = medias.filter(
      (media) => media.photographerId == photographerId[0].id
    );
    //creates an array that contains objects with the selected photographer medias

    //creating the photographer's gallery
    photographerMedias.map((media) => {
      //media returns each of the photographer's medias in separated objects
      //creating dynamically the selected photographer's gallery
      const photoArticle = document.createElement("article");
      const mediaDiv = document.createElement("div");
      const photoDescriptionContainer = document.createElement("div");
      //html template for the photos
      // if media contains video then add html with video element;
      let photo = "";
      let card = "";
      if ("video" in media) {
        photo = `
            <div class="gallery__photo">
              <video class="photo video " title="${
                media.title
              }" src="../assets/images/${photographerId[0].name
          .split(" ")[0]
          .replace("-", " ")}/${media.video}" type="video/mp4" alt="${
          media.title
        }. Cliquez pour agrandir. Video"  role="link" tabindex=0></video>
            </div>
          `;
      }
      //else add html with img element
      else {
        photo = `
            <div class="gallery__photo">
              <img class="photo" title="${
                media.title
              }" src="../assets/images/${photographerId[0].name
          .split(" ")[0]
          .replace("-", " ")}/${media.image}" alt="${
          media.title
        }. Cliquez pour agrandir. Photo" role="link" tabindex=0></img>
            </div>
          `;
      }
      card = `
          <div class="photo__description">
            <p class="photo__title">${media.title}</p>
            <p class="photo__date">${media.date}</p>
            <div class="likes">
              <p id="mediaLikes" class="photo__likes">${media.likes}</p>
              <button class="like" aria-label="click to like"><i class="far fa-2x fa-heart portfolio__heart"></i></button>
            </div>
          </div>`;
      photoArticle.className += "photo__card";
      photoArticle.id += media.id; //links each media id to an article
      photoDescriptionContainer.className += "photoDescription-container";
      mediaDiv.className += "media-div";
      mediaDiv.innerHTML += photo;
      photoDescriptionContainer.innerHTML += card;
      photoArticle.appendChild(mediaDiv);
      photoArticle.appendChild(photoDescriptionContainer);
      gallerySection.appendChild(photoArticle);

      //event listerner to launch lightbox
      mediaDiv.addEventListener("click", () => {
        showLightbox(media.title, media.src);
      });
      mediaDiv.addEventListener("keydown", (e) => {
        if (e.code === "Enter") {
          showLightbox(media.title, media.src);
        }
      });
    });
    // End of gallery

    //Gallery filter event listener
    select.addEventListener("change", filterBy);
  }
}
