/* /////////////////////////// */
/* /////// Navigation //////// */
/* /////////////////////////// */


// Event listener for DOMContentLoaded to load the script when the document is ready
document.addEventListener('DOMContentLoaded', function () {
    // DOM element selection for the menu
    const menuIcon = document.querySelector('.menu-icon');
    const menuCheckbox = document.querySelector('.menu-btn input[type="checkbox"]'); // Select the checkbox input
    const menu = document.querySelector('.ligne-metro');

    // Click event on the menu icon
    menuIcon.addEventListener('click', function () {
        console.log("Click detected");
        menuCheckbox.checked = !menuCheckbox.checked; // Toggle the state of the checkbox
        menu.classList.toggle('menu-open');
        console.log(menu.classList);
    });
});

// Event listener for smooth scrolling when a navigation link is clicked
document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetSection = document.querySelector(this.getAttribute('href'));
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});



/* ///////////////////////////////////// */
/* /////// Part of Expériences ///////// */
/* //////////////////////////////////// */

// Creating a new Leaflet map
let map = L.map('map', {
center: [26.65341, 62.226563], // Coordinates for Lyon [lat, long]
zoom: 2
});

// Adding background map layers for Lyon
let baselayers = {
CartoDB: L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'),
OSM: L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png'),
Esri: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'),
LyonMap: L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png') // Lyon background map
};
baselayers.CartoDB.addTo(map); // Using Lyon background map

// Adding scale to the map
L.control.scale({maxWidth: 100}).addTo(map);

// Function to create custom icons
function createCustomIcon(iconUrl) {
return L.icon({
    iconUrl: iconUrl,
    iconSize: [52, 72], // Icon size
    iconAnchor: [16, 32], // Icon anchor point
    popupAnchor: [0, -32] // Popup position relative to the icon
});
}

// Creating different icons
let developpeurIcon = createCustomIcon('styles/images/icon_dev.png');
let restaurantIcon = createCustomIcon('styles/images/icon_restaurant.png');
let ongIcon = createCustomIcon('styles/images/icon_ong.png');
let managementIcon = createCustomIcon('styles/images/icon_event.png');
let globalIcon = createCustomIcon('styles/images/icon_global.png');
let consultingIcon = createCustomIcon('styles/images/icon_consulting.png');
let associationIcon = createCustomIcon('styles/images/icon_association.png');
let designIcon = createCustomIcon('styles/images/icon_design.png');

// Function to add markers to the map with popups
function addMarkerToMap(coordinates, icon, popupContent, zoomLevel, markerId) {
let marker = L.marker(coordinates, { icon: icon }).addTo(map);
marker.bindPopup(popupContent).openPopup();
marker.on('click', function () {
    console.log("Marker clicked");
    map.setView(coordinates, zoomLevel);
    console.log("Popup Content: ", popupContent);
    updatePopUpContentForMarker(markerId);
});
return marker;
}

document.addEventListener('DOMContentLoaded', function () {
// Add a class to your <a> tags to make them easier to target
document.querySelectorAll('.popUp-map a').forEach(function (link) {
    link.addEventListener('click', function (event) {
    event.preventDefault();
    let markerId = this.getAttribute('data-marker');
    updatePopUpContentForMarker(markerId);
    // Open the popUp-map
    $('.popUp-map').show();
    });
});
});

function updatePopUpContentForMarker(markerId) {
let popUpMapDiv = document.querySelector('.popUp-map p');
let markerContent = getMarkerContent(markerId);
popUpMapDiv.innerHTML = markerContent;
}

// Adding markers with different icons and popups
let marker1 = addMarkerToMap([45.7381, 4.8331], developpeurIcon, "<b>Web Developer, Ice development, Lyon<br><br>2023:<br>- Create websites<br>- WordPress</b>", 13, 'marker1');
let marker2 = addMarkerToMap([45.7645, 4.8292], restaurantIcon, "<b>Restaurant Manager, Minanée<br><br>2007-2013:<br>- </b>", 13);
let marker3 = addMarkerToMap([45.7717, 4.8511], restaurantIcon, "<b>Restaurant Manager, Sushido<br><br>2002-2007:<br>- </b>", 13);
let marker4 = addMarkerToMap([45.752643, 4.829307], designIcon, "<b>Designe<br><br>2022:<br>- Create website, logo, menu card<br>- Consulting restaurant management</b>", 13);
let marker5 = addMarkerToMap([48.019324, -1.604004], consultingIcon, "<b>Consulting Restaurant Management, Séoul to go, Rennes<br><br>2022:<br>- Create website, logo, menu card<br>- Consulting restaurant management</b>", 13);
let marker6 = addMarkerToMap([45.767792, 4.835991], managementIcon, "<b>President of the Association of Lyon Koreans, European Representative, Event Organizer, Lyon<br><br>2013:<br>- </b>", 13);
let markerAfrica = addMarkerToMap([-30.5595, 22.9375], ongIcon, "<b>Volunteer Charity NGO, South Africa<br><br>2014-2019:<br>- Team Leader, Social Aid, Cook</b>", 13);
let markerLondon = addMarkerToMap([51.5074, -0.1278], ongIcon, "<b>Volunteer</b>", 13);
let markerSeoul = addMarkerToMap([37.5665, 126.9780], ongIcon, "<b>Secretary, KIMM (Korea Institute of Machinery & Materials)</b>", 13);
let markerMonde = addMarkerToMap([-23.885838, 126.5625], globalIcon, "<b>KOWWINER: Owner of international businesses, Kowiner</b>", 13);
let markerEurope = addMarkerToMap([48.136767, 16.435547], globalIcon, "<b>European Representative</b>", 13);

// Standalone popup to display "View my experiences"
let standalonePopup = L.popup()
.setLatLng([57.891497, 61.171875])
.setContent("View my experiences")
.openOn(map);

// Layer control for map elements
L.control.layers(baselayers, null, { position: 'topright', collapsed: false }).addTo(map);
L.control.layers(null, {
"Europe": L.layerGroup([marker1, marker2, marker3, marker4, marker5, marker6, markerEurope, markerLondon]),
"Africa": L.layerGroup([markerAfrica]),
"Asia": L.layerGroup([markerSeoul]),
"World": L.layerGroup([markerMonde])
}, {
position: 'bottomright',
collapsed: false
}).addTo(map);



// Répétez le modèle ci-dessus pour les autres marqueurs



// Function to add markers to the map with popups
// function addMarkerToMap(coordinates, icon, popupContent, zoomLevel) {
//     let marker = L.marker(coordinates, { icon: icon }).addTo(map);
//     marker.bindPopup(popupContent).openPopup();
//     marker.on('click', function() {
//         map.setView(coordinates, zoomLevel);
//         updatePopUpContent(popupContent);
//     });
//     return marker;
// }

// function getMarkerContent(markerId) {
//     switch (markerId) {
//         case 'marker1':
//             return "<b>Web Developer, Ice development, Lyon<br><br>2023:<br>- Create websites<br>- WordPress</b>";
//         case 'marker2':
//             return "<b>Web Developer, Ice development, Lyon<br><br>2023:<br>- Create websites<br>- WordPress</b>";
//         default:
//             return "Default content";
//     }
// }



// Searching for HTML elements
// let popUpMapDiv = document.querySelector('.popUp-map p');

// Function to update the popup content
// function updatePopUpContent(htmlContent) {
//     let popUpMapDiv = document.querySelector('.popUp-map p');
//     popUpMapDiv.innerHTML = htmlContent;
//     $('.popUp-map').show();
// }

// Handling a click on the map to hide the popup element
// map.on('click', function() {
//     $('.popUp-map').hide();
// });











// Handling a click on a marker to show the corresponding popup content
// marker1.on('click', function () {
//     console.log("Marker 1 clicked");
//     updatePopUpContent("<b>Web Developer, Ice development, Lyon<br><br>2023:<br>- Create websites<br>- WordPress</b>");
// });


// marker2.on('click', function() {
//     updatePopUpContent("<b>Restaurant Manager, Minanée<br><br>2007-2013:<br>- </b>");
// });
// marker3.on('click', function() {
//     updatePopUpContent("<b>Restaurant Manager, Sushido<br><br>2002-2007:<br>- </b>");
// });
// marker4.on('click', function() {
//     updatePopUpContent("<b>Design<br><br>2022:<br>- Infographiste <br>- </b>");
// });
// marker5.on('click', function() {
//     updatePopUpContent("<b>Consulting Restaurant Management, Séoul to go, Rennes<br><br>2022:<br>- Create website, logo, menu card<br>- Consulting restaurant management</b>");
// });
// marker6.on('click', function() {
//     updatePopUpContent("<b>Organization<br><br>2013:<br>- </b>");
// });
// markerAfrica.on('click', function() {
//     updatePopUpContent("<b>Volunteer Charity NGO, South Africa<br><br>2014-2019:<br>- Team Leader, Social Aid, Cook</b>");
// });
// markerLondon.on('click', function() {
//     updatePopUpContent("<b>Volunteer</b>");
// });
// markerSeoul.on('click', function() {
//     updatePopUpContent("<b>Volunteer, Séoul</b>");
// });
// markerMonde.on('click', function() {
//     updatePopUpContent("<b>2007-2013, 2022 Infographist-Design Creating paper communication materials & Website, photography restaurants Minanée & Séoul to go, Lyon & Rennes</b>");
// });
// markerEurope.on('click', function() {
//     updatePopUpContent("<b>2007-2013, 2022 Infographist-Design Creating paper communication materials & Website, photography restaurants Minanée & Séoul to go, Lyon & Rennes</b>");
// });

// Handling a click on the map to hide the popup element
// map.on('click', function() {
//     $('.popUp-map').hide();
// });



/* /////////////////////////////////// */
/* /////// Part of Motivation //////// */
/* /////////////////////////////////// */


// Handling click events to open PDF documents
const openPdfBtn1 = document.getElementById('openPdfBtn1');
const openPdfBtn2 = document.getElementById('openPdfBtn2');

openPdfBtn1.addEventListener('click', function() {
    // Define the URL of the first PDF document
    const pdfURL1 = 'styles/images/pdf/recommandation_cogether.pdf';
    // Open the first PDF document in a new tab/window
    window.open(pdfURL1, '_blank');
});

openPdfBtn2.addEventListener('click', function() {
    // Define the URL of the second PDF document
    const pdfURL2 = 'your/other/pdf/file.pdf';
    // Open the second PDF document in a new tab/window
    window.open(pdfURL2, '_blank');
});



/* /////////////////////////// */
/* ///// Button scroll up //// */
/* /////////////////////////// */


//Get the button
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}











