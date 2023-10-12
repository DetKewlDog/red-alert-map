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
			setAlerts(await APIAccess.getRedAlerts() || alerts);
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		async function redrawAlerts() {
			let cities = [];

			if (alerts.length === 0) {
				setAlertedCities([]);
				return;
			}

			for (const alert of alerts) {
				const city = await APIAccess.getCityPosition(alert);
				if (city === undefined || cities.some(i => i.name === city.name)) continue;
				cities.push(city);
				setAlertedCities([...cities]);
			}
		}
		redrawAlerts();
	}, [alerts]);

    return (
		<MapContainer center={position} zoom={7} style={{ height: '100vh' }}>
			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

			<PanToLocation align="topright" setPosition={setPosition} />
			<AlertsLayer alerts={alertedCities} color='red' />
		</MapContainer>
    );
};