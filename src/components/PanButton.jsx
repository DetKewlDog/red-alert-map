import { LatLng } from "leaflet";
import { Button } from "./Button";

export function PanButton({ setLocation }) {
  return (
    <Button 
      size="large" 
      icon="fas fa-crosshairs" 
      rounded 
      onClick={() => navigator.geolocation.getCurrentPosition(
        res => setLocation(async () => [{ 
            center: new LatLng(
              res.coords.latitude, 
              res.coords.longitude
            ),
            zoom: 12,
          }, null]
        )
      )}
    />
  );
}