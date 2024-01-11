import { useEffect } from "react";
import { useMap } from "react-leaflet";

export function PanToLocation({ getLocation }) {
	const map = useMap();

	useEffect(() => {
		getLocation
			.then(([ res, _ ]) => {
				if (res.zoom) {
					map.flyTo(res.center, res.zoom);
				} else {
					map.setView(res.center, 7);
				}
			});
	}, [getLocation]);

  return null;
}