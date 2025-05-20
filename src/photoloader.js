import {domain, url} from "./config.js";

export function loadPicture(idPicture) {
    return fetch(`${url}/api/photos/${idPicture}`, {credentials: 'include'}).then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    }).catch((error) => {
        console.error("Error fetching picture:", error);
    })
}

export function loadResource(uri) {
    return fetch(`${domain}${uri}`, {credentials: 'include'}).then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    }).catch((error) => {
        console.error("Error fetching resource:", error);
    })
}
