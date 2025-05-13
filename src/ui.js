import Handlebars from 'handlebars';
import {domain} from "./config";

export function displayPicture(photo) {
    const templateSource = document.querySelector("#la_photo_template").innerHTML
    const templateFunction = Handlebars.compile(templateSource);
    photo.url = domain+photo.url.href;
    document.querySelector("#la_photo").innerHTML = templateFunction(photo);
}

export function displayCategory(category) {
    const templateSource = document.querySelector("#la_categorie_template").innerHTML
    const templateFunction = Handlebars.compile(templateSource);
    document.querySelector("#la_categorie").innerHTML = templateFunction(category);
}

export function displayComments(comments) {
    const templateSource = document.querySelector("#les_commentaires_template").innerHTML
    const templateFunction = Handlebars.compile(templateSource);
    comments.forEach(comment => {
        comment.content = comment.content.replace(/&#39;/g, "'");
    })
    document.querySelector("#les_commentaires").innerHTML = templateFunction({commentaires: comments});
}