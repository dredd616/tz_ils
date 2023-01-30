import L from 'leaflet';

const myIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.0.3/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41]
});

L.Marker.prototype.options.icon = myIcon;