import { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import PanToLocation from './components/PanToLocation';
import AlertsLayer from './components/AlertsLayer';

import APIAccess from './services/ApiAccess';

export default function App() {
	let [alertedCities, setAlertedCities] = useState([]);
	let [position, setPosition] = useState([31.3791818, 35.4409897]);
	let [alerts, setAlerts] = useState([]);

	useEffect(() => {
		const interval = setInterval(async () => {
			let results = await APIAccess.getRedAlerts() || [];
			if (results.filter(x => !alerts.includes(x)).length === 0) return;
			updateAlerts(results);
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		async function redrawAlerts() {
			// get all cities that were already displayed as alerted cities (no need to redraw those cities)
			let cities = alertedCities.filter(city => alerts.some(alert => city.name === alert));
			// get all alerts that are not already displayed on the map
			alerts = alerts.filter(alert => !alertedCities.some(city => city.name === alert));

			console.log('Received', alerts.length, 'new alerts');
			updateAlertedCities([...cities]);

			for (const alert of alerts) {
				const [city, usedCache] = await APIAccess.getCityPosition(alert);

				if (city !== undefined && !cities.some(i => i.name === city.name)) {
					cities = [...cities, city];
					updateAlertedCities([...cities]);
				}

				if (usedCache) continue;
				await new Promise(r => setTimeout(r, 500));
			}

			console.log('Done');
		}
		redrawAlerts();
	}, [alerts]);

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
			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

			<PanToLocation align="topright" setPosition={setPosition} />
			<AlertsLayer alerts={alertedCities} color='red' />
		</MapContainer>
    );
};