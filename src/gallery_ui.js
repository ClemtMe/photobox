import Handlebars from 'handlebars';
import {domain} from "./config";
import {first, last, next, prev} from "./gallery";
import {displayCategory, displayComments, displayPicture} from "./ui";
import {loadPicture, loadResource} from "./photoloader";

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
    photos.forEach(photo => {
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

        })
    })
}