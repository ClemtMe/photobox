import {loadPicture, loadResource} from "./photoloader.js";
import {displayCategory, displayComments, displayPicture} from "./ui";

async function getPicture(id) {
    let data = await loadPicture(id);
    console.log(data);
    displayPicture(data.photo);
    getCategory(data);
}

async function getCategory(pictureData){
    let data = await loadResource(pictureData.links.categorie.href);
    console.log(data);
    displayCategory(data.categorie);
    getComments(pictureData);
}

async function getComments(pictureData){
    let data = await loadResource(pictureData.links.comments.href);
    console.log(data);
    displayComments(data.comments);
}

let numero = window.location.hash.replace("#", "");
getPicture(numero);