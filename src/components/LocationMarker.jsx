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
  const [location, setLocation] = useState(undefined);
  
  useEffect(() => {
    const updateLocation = async () => {
      const loc = 'then' in getLocation ? await getLocation : getLocation;
      if (loc === undefined || loc.name === 'israel') return;
      setLocation(loc.center);
    }
    updateLocation();
  });

  if (location === undefined) {
    return undefined;
  }

  return (
    <Marker position={location} icon={icon} />
  );
}