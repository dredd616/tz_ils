import { LatLngBoundsExpression, LatLngTuple } from 'leaflet';


export const config = {
    startPosition: [50, 50] as LatLngTuple,
    zoom: 3,
    minZoom: 3,
    maxBounds: [[85, 180],  [-85, -180]] as LatLngBoundsExpression,
}