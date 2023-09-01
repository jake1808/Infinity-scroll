


// Unsplash API
const count = 10;
const apiKey = '_svGcS_NSKyDgsjkleDP3KZaqU5MluPeR7q5w9OJa3s'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// Get photos from unsplash API
async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        const photos = await response.json();
        console.log(photos);
    } catch (error) {
    console.error(error);       
    }
}

//on load
getPhotos();