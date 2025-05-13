import {loadPicture} from "./photoloader.js";
import { domain } from "./config.js";

function getPicture(id) {
    let photo = loadPicture(id);
    photo.then((data) => {
        console.log(data);
        const img = document.createElement('img');
        img.src = domain+data.photo.url.href;
        img.alt = data.photo.titre;
        document.body.appendChild(img);
    })

}

let numero = window.location.hash.replace("#", "");
getPicture(numero);