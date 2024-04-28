import { Marker } from "react-leaflet";
import L from 'leaflet';
import { useEffect, useState } from "react";

const icon = new L.Icon({
  iconUrl: '/current-loc.svg',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, 0],
});

export function LocationMarker() {
  const [location, setLocation] = useState(undefined);

  useEffect(() => {
    const watch = navigator.geolocation.watchPosition(
      ({ coords }) => setLocation([coords.latitude, coords.longitude])
    );
    return () => navigator.geolocation.clearWatch(watch);
  }, []);

  if (!location) {
    return undefined;
  }

  return (
    <Marker position={location} icon={icon} />
  );
}