import React, { FC, useEffect, useRef, useState } from 'react';
import L, { LatLngTuple, Map } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getRoute, sagaActions } from '../entities/order/lib';
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';
import { OrderList } from '../entities/order/ui/order-list';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { config } from './constants';

export const MapWithOrders: FC = () => {
    const dispatch = useAppDispatch()
    const orders = useAppSelector(state => state.orders)
    const isLoading = useAppSelector(state => state.isLoading)
    const error = useAppSelector(state => state.error)

    const mapRef = useRef<Map | null>(null)

    const [route, setRoute] = useState<any>()

    const handleClick = async (from: LatLngTuple, to: LatLngTuple) => {
        const data = await getRoute(from, to)
        setRoute(data)
    }

    useEffect(() => {
        dispatch({type: sagaActions.FETCH_DATA_SAGA})
    }, [])

    useEffect(() => {
        mapRef.current?.flyToBounds(L.polyline(route).getBounds(), {animate: false, padding: [20, 20]})
    }, [route])

    return (
        <div className="main-page-container">
            <OrderList orders={orders} isLoading={isLoading} error={error} handleClick={handleClick}/>
            <MapContainer ref={mapRef} center={route || config.startPosition} minZoom={config.minZoom} zoom={config.zoom} maxBounds={config.maxBounds} scrollWheelZoom={true}
                          className="map-container">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {!route || (<>
                    <Polyline positions={route}/>
                    <Marker position={config.startPosition && route[0]}/>
                    <Marker position={config.startPosition && route[route.length - 1]}/>
                </>)}
            </MapContainer>
        </div>
    );
};