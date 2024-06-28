import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, ImageOverlay } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function EarthC() {
    const [imageUrl, setImageUrl] = useState(null);
    const [bounds, setBounds] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('https://perenual.com/api/hardiness-map?species_id=1&key=sk-krQJ667e57665303e5248');
                const { image_url, bounds } = response.data;
                if (image_url && bounds) {
                    setImageUrl(image_url);
                    setBounds(bounds);
                } else {
                    console.error("Unexpected response data:", response.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, []);

    return (
        <div>
            <h1>Hardiness Map</h1>
            {imageUrl && bounds && (
                <MapContainer bounds={bounds} style={{ height: "500px", width: "100%" }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <ImageOverlay url={imageUrl} bounds={bounds} />
                </MapContainer>
            )}
        </div>
    );
}

export default EarthC;
