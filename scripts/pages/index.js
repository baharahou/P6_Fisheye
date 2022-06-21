import DataAPI from "../factories/fetchAPI.js";
import PhotographersPage from "./photographer.js";
// new Object
new DataAPI()
  .getData()
  .then((data) => {
    //Script section for photographerPage
    if (window.location.pathname.includes("pages/photographer.html")) {
      new PhotographersPage().displayPhotographers(data);
    }
    //Script section for homepage
    else {
      const mainAccess = document.querySelector(".mainContent__link");

      //-------adding div on scroll event
      window.addEventListener("scroll", () => {
        //console.log(window.scrollY);
        if (window.scrollY <= 60) {
          mainAccess.style.display = "unset";
        } else {
          mainAccess.style.display = "none";
        }
      });

      //Section Photograher Cards
      data.photographers.map((photographe) => {
        const photographersContainer = document.querySelector(
          ".photographers__container"
        );
        const photographerCard = document.createElement("article");
        photographerCard.className += "photographer__card";

        //html template for article
        let str = `
                <a href="./pages/photographer.html?id=${photographe.id}" class="link__photographer">
                    <div class="photographer__img">
                        <img src="../assets/photographers/account.png" alt="">
                    </div>
                    <h2 class="photographer__name">
                        ${photographe.name}
                    </h2>
                </a>
                <p class="photographer__location">
                    ${photographe.city}, ${photographe.country}
                </p>
                <p class="photographer__devise">
                    ${photographe.tagline}
                </p>
                    
                <p class="photographer__price">
                     ${photographe.price}€/jour
                </p>
               
            `;

        photographersContainer.appendChild(photographerCard);
        photographerCard.innerHTML += str;
      }); //End of section photographer card
    } //End of script section for homepage
  }) //End of new object
  .catch(() => {
    alert("Problème d'accès aux données");
  });
