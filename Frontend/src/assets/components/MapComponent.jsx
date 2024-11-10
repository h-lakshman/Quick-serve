import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet"; // Leaflet for customizing markers

const MapComponent = ({ serviceLocation }) => {
  // Default location as Thiruvananthapuram, Kerala (latitude: 8.5241, longitude: 76.9366)
  const defaultLocation = { lat: 8.5241, lng: 76.9366 }; // Thiruvananthapuram coordinates

  return (
    <div style={{ height: "250px", width: "100%" }}>
      <MapContainer
        center={serviceLocation || defaultLocation}
        zoom={14}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker
          position={serviceLocation || defaultLocation}
          icon={new L.Icon({ iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png" })}
        >
          <Popup>
            Service Location
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
