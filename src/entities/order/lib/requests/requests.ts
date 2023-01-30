import axios from 'axios';
import polyline from '@mapbox/polyline'
import { OSRM_API_URL } from '../config/constants';
import { TOrder } from '../../model/order.types';
import { LatLngExpression, LatLngTuple } from 'leaflet';

export const getOrders = (): Promise<TOrder[]> => {
    return axios.get('http://localhost:4000/orders').then(res => res.data)
}
export const getRoute = async (from: LatLngTuple, to: LatLngTuple): Promise<LatLngExpression[]> => {
    const [fromLat, fromLng] = from;
    const [toLat, toLng] = to;

    const response = await axios.get(`${OSRM_API_URL}/${fromLat},${fromLng};${toLat},${toLng}?overview=full`)
    const data = response.data;
    const route = polyline.decode(data.routes[0].geometry)

    return route;
}