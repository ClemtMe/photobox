import Handlebars from 'handlebars';
import {domain} from "./config";
import {first, last, next, prev} from "./gallery";
import {displayCategory, displayComments, displayPicture} from "./ui";
import {loadPicture, loadResource} from "./photoloader";

let galleryPhotos = null;
let currentIndex = 0;

export function display_galerie(gallery) {
    const templateSource = document.querySelector("#gallery_template").innerHTML
    const templateFunction = Handlebars.compile(templateSource);
    gallery.photos.forEach(photo => {
        photo.photo.url = domain+photo.photo.url.href;
    })
    galleryPhotos = gallery.photos;
    console.log(gallery);
    document.querySelector("#gallery").innerHTML = templateFunction(gallery);
    next();
    prev();
    first();
    last();
    let photos = document.querySelectorAll('.photo img');
    photos.forEach((photo, index) => {
        photo.addEventListener('click', async () => {
            let id = photo.getAttribute('data-id');
            let dataPicture = await loadPicture(id);
            displayPicture(dataPicture.photo);
            let dataCategory = await loadResource(dataPicture.links.categorie.href);
            dataCategory = dataCategory.categorie;
            let dataComments = await loadResource(dataPicture.links.comments.href);
            dataComments = dataComments.comments;
            displayCategory(dataCategory);
            displayComments(dataComments);
            displayLightbox(dataPicture, index);
        })
    })
}

function displayLightbox(photo, index) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    lightboxImage.src = photo.photo.url;
    lightbox.classList.remove("hidden");

    //fermer lightbox
    document.getElementById("close-lightbox").addEventListener("click", () => {
        document.getElementById("lightbox").classList.add("hidden");
    });

    //naviguer
    document.getElementById("prev-lightbox").addEventListener("click", () => {
        index = galleryPhotos.length ? index === 0 : index - 1;
        displayLightbox(galleryPhotos[index], index);
    });

    document.getElementById("next-lightbox").addEventListener("click", () => {
        index = 0 ? index === galleryPhotos.length : index + 1;
        displayLightbox(galleryPhotos[index], index);
    });
}


