import { useEffect } from "react";
import { useMap } from "react-leaflet";

export function PanToLocation({ getLocation }) {
	const map = useMap();

	useEffect(() => {
		getLocation()
			.then(([ res, _ ]) => 
				map.panTo(res.center, 7)
			);
	}, []);

  return null;
}