import Handlebars from 'handlebars';
import {domain} from "./config";
import {first, last, next, prev} from "./gallery";
import {displayCategory, displayComments, displayPicture} from "./ui";
import {loadPicture, loadResource} from "./photoloader";

let galleryPhotos = null;

export function display_galerie(gallery) {
    const templateSource = document.querySelector("#gallery_template").innerHTML
    const templateFunction = Handlebars.compile(templateSource);
    gallery.photos.forEach(photo => {
        photo.photo.url = domain+photo.photo.url.href;
    })
    console.log(gallery);
    document.querySelector("#gallery").innerHTML = templateFunction(gallery);
    next();
    prev();
    first();
    last();
    let photos = document.querySelectorAll('.photo img');
    galleryPhotos = photos;
    photos.forEach((photo, index) => {
        photo.addEventListener('click', async () => {
            loadEventListeners(index);
            displayLightboxAndPhoto(photo, index);
        })
    })
}

function loadEventListeners(index) {
    //fermer lightbox
    document.getElementById("close-lightbox").addEventListener("click", () => {
        document.getElementById("lightbox").classList.add("hidden");
    });

    //naviguer
    document.getElementById("prev-lightbox").addEventListener("click", () => {
        index = index === 0 ? galleryPhotos.length-1 : index - 1;
        displayLightboxAndPhoto(galleryPhotos[index]);
    });

    document.getElementById("next-lightbox").addEventListener("click", () => {
        index = index === galleryPhotos.length-1 ? 0 : index + 1;
        displayLightboxAndPhoto(galleryPhotos[index]);
    });
}

async function displayLightboxAndPhoto(photo) {
    let id = photo.getAttribute('data-id');
    let dataPicture = await loadPicture(id);
    displayPicture(dataPicture.photo);
    let dataCategory = await loadResource(dataPicture.links.categorie.href);
    dataCategory = dataCategory.categorie;
    let dataComments = await loadResource(dataPicture.links.comments.href);
    dataComments = dataComments.comments;
    displayCategory(dataCategory);
    displayComments(dataComments);

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    lightboxImage.src = dataPicture.photo.url;
    lightbox.classList.remove("hidden");
}


