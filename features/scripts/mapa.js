// Inicialización del mapa con Leaflet
let map = L.map('map', {
    zoomControl: false // Se desactiva el control de zoom por defecto
}).setView([41.9296, -7.4751], 12); 

// Capa base del mapa con OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Definición de iconos personalizados para los marcadores
const iconos = {
    alojamiento: L.icon({
        iconUrl: '../images/Mapa/iconoAlojamiento.png',
        iconSize: [32, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -35]
    }),
    restaurante: L.icon({
        iconUrl: '../images/Mapa/iconoRestaurante.png',
        iconSize: [32, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -35]
    }),
    actividad: L.icon({
        iconUrl: '../images/Mapa/iconoActividad.png',
        iconSize: [32, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -35]
    })
};

// Agregar control de zoom en la esquina superior derecha
L.control.zoom({ position: 'topright' }).addTo(map);

// Obtener referencia al formulario
const form = document.querySelector('form');

// Array para almacenar los marcadores
let markersArray = [];

// Función para agregar marcadores al mapa
function agregarMarcador(lat, lng, icono, nombre, descripcion, enlace) {
    let marker = L.marker([lat, lng], { icon: icono })
        .addTo(map)
        .bindPopup(`
            <b>${nombre}</b><br>
            ${descripcion}<br>
            <a href="${enlace}" target="_blank">Ver más</a>
        `);
    markersArray.push(marker);

    marker.on('mouseover', function() { this.openPopup(); });
    marker.on('click', function() { window.open(enlace, '_blank'); });
}

// Manejo del evento de envío del formulario
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario por defecto

    // Obtener las checkboxes
    const alojamiento = document.querySelector('input[name="alojamiento"]');
    const restaurantes = document.querySelector('input[name="restaurantes"]');
    const actividades = document.querySelector('input[name="actividades"]');

    // Eliminar marcadores anteriores del mapa
    markersArray.forEach(marker => map.removeLayer(marker));
    markersArray = []; // Vaciar el array

    // Cargar datos de alojamientos si la opción está seleccionada
    if (alojamiento.checked) {
        console.log('Cargando marcadores de Alojamientos');
        $.getJSON('datos/marcadoresAlojamientos.json', function(data) {
            data.marcadores.forEach(marcador => {
                agregarMarcador(marcador.lat, marcador.lng, iconos.alojamiento, marcador.nombre, marcador.descripcion, marcador.enlace);
            });
        }).fail(error => console.error('Error cargando JSON:', error));
    }

    // Cargar datos de restaurantes si la opción está seleccionada
    if (restaurantes.checked) {
        console.log('Cargando marcadores de Restaurantes');
        fetch('datos/marcadoresRestaurantes.xml')
        .then(response => response.text())
        .then(str => {
            let parser = new DOMParser();
            let xml = parser.parseFromString(str, 'application/xml');
            let marcadores = xml.getElementsByTagName('marcador');

            Array.from(marcadores).forEach(marcador => {
                let lat = parseFloat(marcador.getElementsByTagName('lat')[0].textContent);
                let lng = parseFloat(marcador.getElementsByTagName('lng')[0].textContent);
                let nombre = marcador.getElementsByTagName('nombre')[0].textContent;
                let descripcion = marcador.getElementsByTagName('descripcion')[0].textContent;
                let enlace = marcador.getElementsByTagName('link')[0].textContent;

                agregarMarcador(lat, lng, iconos.restaurante, nombre, descripcion, enlace);
            });
        }).catch(error => console.error('Error cargando XML:', error));  
    }

    // Cargar datos de actividades si la opción está seleccionada
    if (actividades.checked) {
        console.log('Cargando marcadores de Actividades');
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'datos/marcadoresActividades.json', true);
        xhr.responseType = 'json';

        xhr.onload = function() {
            if (xhr.status === 200) {
                let data = xhr.response;
                data.marcadores.forEach(marcador => {
                    agregarMarcador(marcador.lat, marcador.lng, iconos.actividad, marcador.nombre, marcador.descripcion, marcador.enlace);
                });
            } else {
                console.error('Error cargando JSON:', xhr.statusText);
            }
        };

        xhr.onerror = function() {
            console.error('Error en la solicitud XMLHttpRequest');
        };

        xhr.send();
    }
});
