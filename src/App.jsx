import { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import PanToLocation from './components/PanToLocation';
import AlertsLayer from './components/AlertsLayer';

import APIAccess from './services/ApiAccess';

export default function App() {
	let [alerts, setAlerts] = useState([]);
	let [position, setPosition] = useState([31.3791818, 35.4409897]);
	let [cities, setCities] = useState([]);

	useEffect(() => {
		const interval = setInterval(async () => setCities(await APIAccess.getRedAlerts() || cities), 1000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		async function redrawAlerts() {
			let newAlerts = [];

			if (cities.length === 0) {
				setAlerts([]);
				return;
			}

			for (const city of cities) {
				console.log(newAlerts);
				let alert = await APIAccess.getCity(city);
				if (alert === undefined || newAlerts.some(i => i.name === alert.name)) continue;
				newAlerts = [...newAlerts, alert];
				setAlerts([...newAlerts]);
			}
		}
		redrawAlerts();
	}, [cities]);

    return (
		<MapContainer center={position} zoom={7} style={{ height: '100vh' }}>
			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

			<PanToLocation align="topright" setPosition={setPosition} />
			<AlertsLayer alerts={alerts} color='red' />
		</MapContainer>
    );
};