function bodyContent() { 
    //fetching the required contents from the api fields
   fetch('https://api.artic.edu/api/v1/artworks?fields=id,title,artist_display,date_display,main_reference_number,image_id')
    .then((response) => {
        return response.json();
    })
    .then((artData) => {
        let galleryData = artData.data; //get required details from the api data{}
        if(galleryData.length === 0 || galleryData === undefined){
            throw new Error('There is an Error');
        }
        galleryData.forEach((val) => {
        let masterId = val.id; 
        let artImage = val.image_id;
        let identifier = val.title;
        let date = val.date_display;
        let artist = val.artist_display;
        let data = document.querySelector('.content');
        let trow = document.createElement('tr');
        let link = document.createElement('a');
        //Display Art Images from the source api, API will reload random images
        let img = document.createElement('img');
        img.src = `https://www.artic.edu/iiif/2/${artImage}/full/843,/0/default.jpg`;
        img.style.width = '300px';
        img.style.height = '300px';
        img.alt = `${identifier}`;
        link.href = 'artwork.html';
        link.setAttribute('onclick', `storeLocal(${masterId})`);
        let value = document.createElement('td');
        value.innerHTML = `Title: ${identifier}<br/> Artist: ${artist}<br/> Date : ${date}`;
        link.append(img,value);
        trow.appendChild(link);
        data.append(trow);
        console.log(artData,artData.status);
    });    
})
.catch((Error) =>{
    console.log(Error);
})
 
}
//Function to store ID in localstorage using onclick 
function storeLocal(masterId){
    localStorage.setItem('id', masterId);
}
//Onload diplay the mueseum art
window.onload = function() {
    bodyContent();
}

