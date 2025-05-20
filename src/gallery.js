import {loadPicture} from "./photoloader";
import {domain, url} from "./config";
import {display_galerie} from "./gallery_ui";

let page = "/www/canals5/phox/api/photos/";
let gallerie = null;

export async function load() {
    try {
        const data = await promesse();
        for (const photo of data.photos) {
            let photoData = await loadPicture(photo.photo.id);
            data.photos = data.photos.filter(item => item !== photo);
            data.photos.push(photoData);
        }
        gallerie = data;
        return gallerie;
    } catch (error) {
        console.error("Error loading gallery:", error);
        return [];
    }
}

function promesse(){
    return fetch(`${domain}${page}`, {credentials: 'include'}).then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    }).catch((error) => {
        console.error("Error fetching picture:", error);
    });
}

export function next(){
    const nextButton = document.querySelector("#next");
    nextButton.addEventListener("click", async () => {
        page = gallerie.links.next.href;
        const data = await load();
        display_galerie(data);
    });
}

export function prev(){
    const prevButton = document.querySelector("#prev");
    prevButton.addEventListener("click", async () => {
        page = gallerie.links.prev.href;
        const data = await load();
        display_galerie(data);
    });
}

export function first(){
    const nextButton = document.querySelector("#first");
    nextButton.addEventListener("click", async () => {
        page = gallerie.links.first.href;
        const data = await load();
        display_galerie(data);
    });
}

export function last(){
    const prevButton = document.querySelector("#last");
    prevButton.addEventListener("click", async () => {
        page = gallerie.links.last.href;
        const data = await load();
        display_galerie(data);
    });
}