import {loadPicture} from "./photoloader.js";
import {displayPicture} from "./ui";

async function getPicture(id) {
    let data = await loadPicture(id);
    console.log(data);
    displayPicture(data.photo);
}

let numero = window.location.hash.replace("#", "");
getPicture(numero);