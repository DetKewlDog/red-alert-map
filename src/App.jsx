import { useState, useEffect } from 'react';
import { MapContainer, LayersControl, LayerGroup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import PanToLocation from './components/PanToLocation';
import AlertsLayer from './components/AlertsLayer';

import APIAccess from './services/ApiAccess';

function MapLayer({ name, url, subdomains, checked=false }) {
    return (
        <LayersControl.BaseLayer name={name} checked={checked}>
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url={url} subdomains={subdomains || ['a', 'b', 'c']} />
        </LayersControl.BaseLayer>
    );
}

export default function App() {
	let [alertedCities, setAlertedCities] = useState([]);
	let [position, setPosition] = useState([31.3791818, 35.4409897]);
	let [alerts, setAlerts] = useState([]);

	useEffect(() => {
		const interval = setInterval(async () => {
			let results = await APIAccess.getRedAlerts() || [];
			if (results.length === alerts.length
				&& results.every((val, index) => val === alerts[index])
				&& (results.length !== 0 || alertedCities.length === 0)) return;
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

			console.log('Alert count: ', alerts.length + cities.length);
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
			<LayersControl position="bottomleft">
				<MapLayer name="Default" checked
					subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
					url='https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}' />

				<MapLayer name="Leaflet"
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />

				<MapLayer name="Terrain"
					subdomains={['mt0', 'mt1','mt2','mt3']}
					url='https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}' />

				<MapLayer name="Satellite"
					subdomains={['mt0', 'mt1','mt2','mt3']}
					url='https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}' />

				<LayersControl.Overlay name='Dark Mode'>
					<LayerGroup></LayerGroup>
				</LayersControl.Overlay>
			</LayersControl>

			<PanToLocation align="topright" setPosition={setPosition} />
			<AlertsLayer alerts={alertedCities} color='red' />
		</MapContainer>
    );
};