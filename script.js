// Communes data (extracted from the provided list)
const communes = [
    { name: "VILLENEUVE SOUS CHARIGNY", insee: 21696, bo: "SEMUR", base: "SEMUR", lat: 47.502, lon: 4.334 },
    { name: "VILLERS LA FAYE", insee: 21698, bo: "BEAUNE", base: "BEAUNE", lat: 47.103, lon: 4.863 },
    { name: "VILLERS LES POTS", insee: 21699, bo: "GENLIS", base: "DIJON", lat: 47.213, lon: 5.281 },
    // Ajoute toutes les autres communes ici avec leurs coordonnées GPS
];

// Fonction pour gérer la recherche et l'affichage des résultats
document.getElementById('commune-input').addEventListener('input', function () {
    const input = this.value.toLowerCase();
    const suggestionsDiv = document.getElementById('suggestions');
    suggestionsDiv.innerHTML = ''; // Clear previous suggestions

    if (input) {
        const filteredCommunes = communes.filter(c => c.name.toLowerCase().startsWith(input));
        filteredCommunes.forEach(commune => {
            const div = document.createElement('div');
            div.textContent = commune.name;
            div.onclick = function () {
                selectCommune(commune);
            };
            suggestionsDiv.appendChild(div);
        });
    }
});

function selectCommune(commune) {
    document.getElementById('commune-input').value = commune.name;
    document.getElementById('insee-code').textContent = commune.insee;
    document.getElementById('bo-output').textContent = commune.bo;
    document.getElementById('base-output').textContent = commune.base;

    // Clear suggestions
    document.getElementById('suggestions').innerHTML = '';

    // Update map with the location
    updateMap(commune.lat, commune.lon);
}

// Fonction pour mettre à jour la carte
function updateMap(lat, lon) {
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: { lat: lat, lng: lon },
    });

    // Add a marker at the selected commune's location
    new google.maps.Marker({
        position: { lat: lat, lng: lon },
        map: map,
    });
}
