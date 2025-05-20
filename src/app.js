import {loadPicture, loadResource} from "./photoloader.js";
import {displayCategory, displayComments, displayPicture} from "./ui";
import {load, next, prev} from "./gallery";
import {display_galerie} from "./gallery_ui";

async function getPicture(id) {
    let data = await loadPicture(id);
    displayPicture(data.photo);
    getCategory(data);
}

async function getCategory(pictureData){
    let data = await loadResource(pictureData.links.categorie.href);
    displayCategory(data.categorie);
    getComments(pictureData);
}

async function getComments(pictureData){
    let data = await loadResource(pictureData.links.comments.href);
    displayComments(data.comments);
}

async function main() {
    let gallerie = await load();
    display_galerie(gallerie);
}

main();