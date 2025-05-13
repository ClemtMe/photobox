import Handlebars from 'handlebars';
import {domain} from "./config";

export function displayPicture(photo) {
    const templateSource = document.querySelector("#la_photo_template").innerHTML
    const templateFunction = Handlebars.compile(templateSource);
    photo.url = domain+photo.url.href;
    document.querySelector("#la_photo").innerHTML = templateFunction(photo);
}