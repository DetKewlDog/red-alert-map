import { useState, useEffect } from 'react';
import { useMap, MapContainer, LayersControl, LayerGroup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import APIAccess from './services/APIAccess';
import { MarkerAlert, CircleAlert, PolygonAlert } from './components/Alert';
import { MapLayer } from './components/MapLayer';
import { AlertLayer } from './components/AlertLayer';

function PanToIsrael() {
	const map = useMap();
	useEffect(() => {
		APIAccess.getPosition('israel')
			.then(([ res, _ ]) => {
				map.panTo(res.center, 7);
			});
	}, []);
	return null;
}

export default function App() {
	let [alertedCities, setAlertedCities] = useState([]);
	let [position, setPosition] = useState([0, 0]);
	let [alerts, setAlerts] = useState([]);

	useEffect(() => {
		const interval = setInterval(() => {
			APIAccess.getRedAlerts()
				.then(results => results || [])
				.then(results => {
					if (results.length === alerts.length
						&& results.every((val, index) => val === alerts[index])
						&& (results.length !== 0 || alertedCities.length === 0)) return;
					updateAlerts(results);
				})
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		async function redrawAlerts() {
			// get all cities that were already displayed as alerted cities (no need to redraw those cities)
			let cities = alertedCities.filter(city => {
				return alerts.some(alert => city.name === alert);
			});
			// get all alerts that are not already displayed on the map
			alerts = alerts.filter(alert => {
				return !alertedCities.some(city => city.name === alert);
			});

			console.log('Alert count: ', alerts.length + cities.length);
			updateAlertedCities([...cities]);

			for (const alert of alerts) {
				const [city, usedCache] = await APIAccess.getPosition(alert);

				if (city !== undefined && !cities.some(i => i.name === city.name)) {
					cities = [...cities, city];
					updateAlertedCities([...cities]);
				}

				if (usedCache) continue;
				await new Promise(resolve => setTimeout(resolve, 1000));
			}

			console.log('Done');
		}
		redrawAlerts();
	}, [alerts]);

	useEffect(() => {

	}, [alertedCities]);

	function updateAlertedCities(arr) {
		alertedCities = arr;
		setAlertedCities(arr);
	}

	function updateAlerts(arr) {
		alerts = arr;
		setAlerts(arr);
	}

	return (
		<MapContainer center={position} zoom={7} style={{ height: '100vh' }}>
			<PanToIsrael />
			<LayersControl position="topright">
				<MapLayer name="Default"   		   url='https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}' checked 		     			 />
				<MapLayer name="Open Street Map" url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' subs='abc' 			 			 />
				<MapLayer name="Terrain"   		   url='https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}'   			   	 		 			 />
				<MapLayer name="Satellite" 		   url='https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}' 			   			 			 />

				<LayersControl.Overlay name='Dark Mode' checked={window.matchMedia('(prefers-color-scheme: dark)').matches}>
					<LayerGroup />
				</LayersControl.Overlay>

				<AlertLayer name='Show Circles'        alerts={alertedCities} alertTemplate={CircleAlert } />
				<AlertLayer name='Show Markers'        alerts={alertedCities} alertTemplate={MarkerAlert } />
				<AlertLayer name='Show Geometry (WIP)' alerts={alertedCities} alertTemplate={PolygonAlert} checked />
			</LayersControl>
		</MapContainer>
	);
};