//Onclick show detailed information about the selected art
function ArtBodyContent() {
    //retrieve art data using stored ID value for accurate lookups
    let Id = localStorage.getItem('id');
    fetch(`https://api.artic.edu/api/v1/artworks/${Id}`)
     .then((response) => {
         return response.json();
     })
     .then((artData) => {
        let selectedArt = artData.data;
        let dynamicTitle = document.querySelector('title');
        dynamicTitle.textContent = selectedArt.title;
        let imageID = selectedArt.image_id;
        let image = document.createElement('img');
        //For the view of full artwork quality image set to be in orginal size
        image.src = `https://www.artic.edu/iiif/2/${imageID}/full/843,/0/default.jpg`;
        let imgBody = document.querySelector('.selectedArt');
        imgBody.appendChild(image);
        let details = document.querySelector('.contents');
        details.innerHTML = `<b>Artist:</b> ${selectedArt.artist_display}<br/>
        <b>Date:</b> ${selectedArt.date_display}<br/>
        <b>Main Reference Number:</b> ${selectedArt.main_reference_number}
        <br/>
        <b>Short Description:</b> ${selectedArt.thumbnail.alt_text}<br/>
        <b>Description:</b> ${selectedArt.description}
        <br/><b>Publication History:</b> ${selectedArt.publication_history}
        <br/><b>Exhibition History:</b> ${selectedArt.exhibition_history}<br/><br/><br/>
        <footer class="blockquote-footer">${artData.info.license_text}, Done by Rajganesh 
        for learning purpose</footer>`
        
    })
   
}
window.onload = () => {
ArtBodyContent();
}
 
 