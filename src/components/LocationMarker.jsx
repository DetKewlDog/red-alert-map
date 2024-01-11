import { useEffect, useState } from "react";
import { Marker } from "react-leaflet";
import L from 'leaflet';

const icon = new L.Icon({
  iconUrl: '/current-loc.svg',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, 0],
});

export function LocationMarker({ getLocation }) {
  const [location, setLocation] = useState([0, 0]);
  
  useEffect(() => {
    getLocation.then(res => {
      if (res === undefined || res[0].name === 'israel') return;
      setLocation(res[0].center);
    });
  });

  return (
    <Marker position={location} icon={icon} />
  );
}