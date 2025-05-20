import Handlebars from 'handlebars';
import {domain} from "./config";

export function display_galerie(gallery) {
    const templateSource = document.querySelector("#gallery_template").innerHTML
    const templateFunction = Handlebars.compile(templateSource);
    gallery.photos.forEach(photo => {
        photo.photo.url = domain+photo.photo.url.href;
    })
    console.log(gallery);
    document.querySelector("#gallery").innerHTML = templateFunction(gallery);
}