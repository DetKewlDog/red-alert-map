import { useEffect } from "react";
import { useMap } from "react-leaflet";

export function PanToLocation({ getLocation }) {
	const map = useMap();

	useEffect(() => {
		const updateLocation = async () => {
			if (!getLocation) return;
			const loc = 'then' in getLocation ? await getLocation : getLocation;
			if (!loc) return;
			if (loc.zoom) {
				map.flyTo(loc.center, loc.zoom);
			} else {
				map.setView(loc.center, 7);
			}
		}
		updateLocation();
	}, [getLocation]);

  return null;
}