import { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import PanToLocation from './components/PanToLocation';
import AlertsLayer from './components/AlertsLayer';

import APIAccess from './services/ApiAccess';

export default function App() {
	let [alerts, setAlerts] = useState([]);
	let [position, setPosition] = useState([31.3791818, 35.4409897]);

	useEffect(() => {
		const interval = setInterval(async () => {
			let cities = [];
			let newAlerts = [];

			if (cities.length === 0) setAlerts([]);

			for (let i = 0; i < cities.length; i++) {
				let alert;
				try {
					alert = await APIAccess.getCity(cities[i]);
				}
				catch {
					i--;
					await new Promise(res => setTimeout(res, 1000));
					continue;
				}
				newAlerts = [...new Set([...newAlerts, alert[0]].filter(x => x !== undefined))];
				setAlerts(newAlerts);
				if (alert[1] || i >= cities.length - 1) continue;
				await new Promise(res => setTimeout(res, 500));
			}
		}, 1000);

		return () => clearInterval(interval);
	}, []);

    return (
		<MapContainer center={position} zoom={7} style={{ height: '100vh' }}>
			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

			<PanToLocation align="topright" setPosition={setPosition} />
			<AlertsLayer alerts={alerts} color='red' />
		</MapContainer>
    );
};