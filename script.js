const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray =[];

// Unsplash API
const count = 30;
const apiKey = '_svGcS_NSKyDgsjkleDP3KZaqU5MluPeR7q5w9OJa3s'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`


//Check if all images have loaded
function imageLoaded(){
    imagesLoaded++;

    if (imagesLoaded == totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// Helper function to set Attributes on DOM Elements
function setAttributes(element, attributes){
    for (const key in attributes) {
       element.setAttribute(key, attributes[key])
    }
}

//display elements for links and photos, add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    //Run function for each object in photosArray
    photosArray.forEach(photo => {
        // Create <a> to link to unsplash
       const item = document.createElement('a');
        setAttributes(item,{
            href: photo.links.html,
            target: "_blank"
        })

        //create image for photo
        const img =document.createElement('img');
        setAttributes(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })

        // Event Listener, check when each image is finished loading
        img.addEventListener('load',()=>{
            imageLoaded();
        })

        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);


    // imageContainer.appendChild(`
    //     <a href=${photo.link.html} target="_blank">
    //     <img
    //     src ="${photo.urls.regular}"
    //     alt = "${photo.alt_description}"
    //     title = "${photo.alt_description}"
    //     />
    //     </a>
    // `)
    });
}


// Get photos from unsplash API
async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        
    } catch (error) {
    console.error(error);       
    }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', ()=>{
    if(window.innerHeight + window.screenY >= document.body.offsetHeight - 1000 && ready)
    {
        ready = false;
        getPhotos();
       
    }
})

//on load
getPhotos();