/* ///////////////////////////////// */
/* ////// Header : navigation ////// */
/* ///////////////////////////////////// */


// 페이지가 로드될 때 스크립트를 실행하기 위한 DOMContentLoaded 이벤트 리스너
document.addEventListener('DOMContentLoaded', function () {
    // 메뉴 관련 DOM 요소를 선택합니다.
    const menuIcon = document.querySelector('.menu-icon');
    const menuCheckbox = document.querySelector('.menu-btn');
    const menu = document.querySelector('.ligne-metro');

    // 메뉴 아이콘을 클릭하는 이벤트 핸들러
    menuIcon.addEventListener('click', function () {
        console.log("Click detected");
        menuCheckbox.checked = !menuCheckbox.checked; // 체크박스의 상태를 토글합니다.
        menu.classList.toggle('menu-open'); // 메뉴가 열렸는지 닫혔는지 클래스를 토글합니다.
        
        // 버거 아이콘을 닫기 아이콘으로 변경합니다.
        if (menuCheckbox.checked) {
            menuIcon.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        } else {
            menuIcon.innerHTML = '<i class="fa-solid fa-bars"></i>';
        }

        console.log(menu.classList);
    });
});

// 내비게이션 링크를 클릭하여 스무스한 스크롤링 이벤트를 처리하는 부분입니다.
document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // 기본 동작을 막습니다.
        const targetSection = document.querySelector(this.getAttribute('href')); // 목표 섹션을 가져옵니다.
        targetSection.scrollIntoView({ behavior: 'smooth' }); // 스무스한 스크롤링으로 해당 섹션으로 이동합니다.
    });
});


/* ///////////////////////////////////// */
/* ////////// Part of skills /////////// */
/* ///////////////////////////////////// */

// JavaScript pour gérer les clics sur les éléments de compétence//


document.addEventListener("DOMContentLoaded", function() {
    const partSkills = document.querySelectorAll('.part-skill');

    partSkills.forEach(partSkill => {
        partSkill.addEventListener('click', function() {
            const index = Array.from(partSkill.parentNode.children).indexOf(partSkill);
            
            const popUps = document.querySelectorAll('.popUp-skill .text-skill');
            
            popUps.forEach(popUp => {
                popUp.style.display = 'none';
            });

            popUps[index].style.display = 'block';
        });
    });
});




/* ///////////////////////////////////// */
/* /////// Part of Expériences ///////// */
/* ///////////////////////////////////// */

// Création d'une nouvelle carte Leaflet : https://leafletjs.com/examples/quick-start/
let map = L.map('map', {
    center: [35.508378, 69.70685], // Coordonnées pour Lyon [lat, long]
    zoom: 1
});

// Ajout des couches de fond de carte pour Lyon
let baselayers = {
    CartoDB: L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'),
    OSM: L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png'),
    Esri: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'),
    LyonMap: L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png') // Carte de fond de Lyon
};
baselayers.CartoDB.addTo(map); // Utilisation de la carte de fond de Lyon

// Ajout de l'échelle à la carte
L.control.scale({maxWidth: 100}).addTo(map);

// Fonction pour créer des icônes personnalisées
function createCustomIcon(iconUrl) {
    return L.icon({
        iconUrl: iconUrl,
        iconSize: [52, 72], // Taille de l'icône
        iconAnchor: [16, 32], // Point d'ancrage de l'icône
        popupAnchor: [0, -32] // Position de la popup par rapport à l'icône
    });
}

function onMapClick(e) {
    alert("You clicked the map at " + e.latlng);
}

map.on('click', onMapClick);


// Création de différentes icônes
let developpeurIcon = createCustomIcon('asset/images/icon/icon_dev.png');
let restaurantIcon = createCustomIcon('asset/images/icon/icon_restaurant.png');
let ongIcon = createCustomIcon('asset/images/icon/icon_ong.png');
let managementIcon = createCustomIcon('asset/images/icon/icon_event.png');
let globalIcon = createCustomIcon('asset/images/icon/icon_global.png');
let consultingIcon = createCustomIcon('asset/images/icon/icon_consulting.png');
let associationIcon = createCustomIcon('asset/images/icon/icon_association.png');
let designIcon = createCustomIcon('asset/images/icon/icon_design.png');

// Fonction pour ajouter des marqueurs à la carte avec des popups
function addMarkerToMap(coordinates, icon, popupContent, zoomLevel, markerId) {
    let marker = L.marker(coordinates, { icon: icon }).addTo(map);
    marker.bindPopup(popupContent).openPopup();
    marker.on('click', function () {
        console.log("Marqueur cliqué");
        map.setView(coordinates, zoomLevel);
        console.log("Contenu de la popup : ", popupContent);
        updatePopUpContentForMarker(markerId);
    });
    return marker;
}

// Ajout de marqueurs avec différentes icônes et popups
let marker1 = addMarkerToMap([45.7381, 4.8331], developpeurIcon, 
    "<b>Développeur Web 2023 - ice developement<br><br>- Création de sites web<br>- WordPress, php, JavaScript, mysql, CSS</b>", 13, 'marker1');
let marker2 = addMarkerToMap([45.7645, 4.8292], restaurantIcon, 
    "<b>Management 2007-2013 - Mnanée<br><br>- Gérant de restaurant<br>- Création de supports de communication papier & site Web, photographie</b>", 13);
let marker3 = addMarkerToMap([45.7717, 4.8511], restaurantIcon,
    "<b>Management 2002-2007 - Sushido<br><br>- Manager de restaurant</b>", 13);
let marker4 = addMarkerToMap([45.752643, 4.829307], designIcon, 
    "<b>Infographie-Design 2007-2013, 2022<br><br>- Création de site web, logo, carte de menu<br>- Restaurant Minanée, sushido, Séoul to go</b>", 13);
let marker5 = addMarkerToMap([48.019324, -1.604004], consultingIcon, 
    "<b>Consultant en gestion de restaurant 2022 - Séoul to go, Rennes<br><br>- Création de site web, logo, carte de menu<br>- Conseil en gestion de restaurant</b>", 13);
let marker6 = addMarkerToMap([45.767792, 4.835991], managementIcon, 
    "<b>Organisation<br><br>- Présidente de l’association des lyonnais coréens, représentante européenne, organisatrice d’évènements, Japan Touch, fêtes consulaires, mode, culture/langue</b>", 13);
let markerAfrica = addMarkerToMap([-30.5595, 22.9375], ongIcon, 
    "<b>Humanitaire 2017<br><br>- ONG de bénévolat caritatif, Afrique du Sud<br>- Chef d'équipe, Aide sociale, Cuisinier</b>", 13);
let markerLondon = addMarkerToMap([51.5074, -0.1278], ongIcon,
    "<b>Humanitaire 2019<br><br>- ONG de bénévolat caritatif, Londres<br>- Chef d'équipe, Aide sociale, Cuisinier</b>", 13);
let markerSeoul = addMarkerToMap([37.5665, 126.9780], ongIcon,
    "<b>Ademistration - KIMM (Institut coréen de machines et de matériaux) <br><br>- Secrétaire </b>", 13);
let markerOceanie = addMarkerToMap([-23.885838, 126.5625], globalIcon, 
    "<b>Réseaux 2011- 2019 - KOWWINER<br><br>- Gérantes d’entreprises internationales</b>", 13);
let markerEurope = addMarkerToMap([48.136767, 16.435547], globalIcon, 
    "<b>Réseaux 2014 - Fédération des Coréens en Europe<br><br>- Représentant la France</b>", 13);

// Popup autonome pour afficher "Voir mes expériences"
let standalonePopup = L.popup()
    .setLatLng([57.891497, 61.171875])
    .setContent("Cliquez le pionteur")
    .openOn(map);

// Contrôle de couche pour les éléments de la carte
L.control.layers(baselayers, null, { position: 'topright', collapsed: false }).addTo(map);
L.control.layers(null, {
    "Europe": L.layerGroup([marker1, marker2, marker3, marker4, marker5, marker6, markerEurope, markerLondon]),
    "Afrique": L.layerGroup([markerAfrica]),
    "Asie": L.layerGroup([markerSeoul]),
    "Océanie": L.layerGroup([markerOceanie])
}, {
    position: 'bottomright',
    collapsed: false
}).addTo(map);


/* /////////////////////////////////// */
/* /////// Part of Motivation //////// */
/* /////////////////////////////////// */


// Handling click events to open PDF documents
const openPdfBtn1 = document.getElementById('openPdfBtn1');
const openPdfBtn2 = document.getElementById('openPdfBtn2');

openPdfBtn1.addEventListener('click', function() {
    // Define the URL of the first PDF document
    const pdfURL1 = 'asset/images/pdf/recommandation_cogether.pdf';
    // Open the first PDF document in a new tab/window
    window.open(pdfURL1, '_blank');
});

openPdfBtn2.addEventListener('click', function() {
    // Define the URL of the second PDF document
    const pdfURL2 = 'asset/images/pdf/recommandation_ jpfa.pdf';
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



















