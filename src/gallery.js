import {loadPicture} from "./photoloader";
import {url} from "./config";



export async function load(){
    try {
        const data = await promesse();
        data.photos.foreach(photo => { photo = loadPicture(photo.id); });
        let gallerie = data;
        return gallerie;
    } catch(error) {
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