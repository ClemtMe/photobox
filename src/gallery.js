import {loadPicture} from "./photoloader";
import {url} from "./config";



export async function load() {
    try {
        const data = await promesse();
        for (const photo of data.photos) {
            let photoData = await loadPicture(photo.photo.id);
            data.photos = data.photos.filter(item => item !== photo);
            data.photos.push(photoData);
        }
        let gallerie = data;
        return gallerie;
    } catch (error) {
        console.error("Error loading gallery:", error);
        return [];
    }
}

function promesse(){
    return fetch(`${url}/photos/`, {credentials: 'include'}).then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    }).catch((error) => {
        console.error("Error fetching picture:", error);
    });
}