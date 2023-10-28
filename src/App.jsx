import { useState, useEffect } from 'react';
import { useMap, MapContainer, LayersControl, LayerGroup, TileLayer, Circle, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import APIAccess from './services/APIAccess';

const icon = new L.Icon({
    iconUrl: 'https://cdn.discordapp.com/attachments/801426473059614730/1131176188300242985/marker-icon-dest.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41],
});

function MapLayer({ name, url, subdomains, checked = false }) {
    return (
        <LayersControl.BaseLayer name={name} checked={checked}>
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url={url} subdomains={subdomains?.split('') || ['mt0', 'mt1', 'mt2', 'mt3']} />
        </LayersControl.BaseLayer>
    );
}

function PanToIsrael() {
	const map = useMap();
	useEffect(() => {
		APIAccess.getPosition('israel')
			.then(([res, _]) => {
				map.panTo(res.center, 7);
			});
	}, []);
	return null;
}

function AlertPopup({ name, name_en, time, evac_time }) {
	let [temp, setTemp] = useState(undefined);
	useEffect(() => {
		setTimeout(() => setTemp(new Date()), 1000);
	}, [temp]);

	return (
		<Popup>
			<b>{name_en !== undefined && `${name_en} - `}{name}</b>
			<br />
			{time.toLocaleTimeString()}
			<br />
			({new Date(new Date() - time).toISOString().slice(14, 19)} ago)
			<br />
			Evacuation time: {new Date(evac_time * 1000).toISOString().slice(14, 19)}
		</Popup>
	);
}

export default function App() {
	let [alertedCities, setAlertedCities] = useState([]);
	let [position, setPosition] = useState([0, 0]);
	let [alerts, setAlerts] = useState([]);
	let [alertTimes, setAlertTimes] = useState({});

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
			// update alert times to only contain the currently alerted cities
			alertTimes = Object.fromEntries(Object.entries(alertTimes).filter(([cityName, _]) => {
				return alerts.some(alert => cityName === alert);
			}));

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
			updateAlertTimes({ ...alertTimes });

			for (const alert of alerts) {
				const [city, usedCache] = await APIAccess.getPosition(alert);

				if (city !== undefined && !cities.some(i => i.name === city.name)) {
					cities = [...cities, city];
					updateAlertedCities([...cities]);
					updateAlertTimes({...alertTimes, [city.name]: new Date()})
				}

				if (usedCache) continue;
				await new Promise(resolve => setTimeout(resolve, 500));
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
	function updateAlertTimes(obj) {
		alertTimes = obj;
		setAlertTimes(obj);
	}

    return (
		<MapContainer center={position} zoom={7} style={{ height: '100vh' }}>
			<PanToIsrael />
			<LayersControl position="topright">
				<MapLayer name="Default"   		 url='https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}' checked 		   />
				<MapLayer name="Open Street Map" url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' subdomains='abc' />
				<MapLayer name="Terrain"   		 url='https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}'   			   />
				<MapLayer name="Satellite" 		 url='https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}' 			   />

				<LayersControl.Overlay name='Dark Mode'><LayerGroup /></LayersControl.Overlay>

				<LayersControl.Overlay name='Show Circles' checked><LayerGroup>
					{alertedCities.map((alert, index) => (
						<Circle key={index}
							pathOptions={{ color: 'red' }}
							center={alert.center}
							radius={alert.radius}
						>
							<AlertPopup {...alert} time={alertTimes[alert.name]} />
						</Circle>
					))}
				</LayerGroup></LayersControl.Overlay>

				<LayersControl.Overlay name='Show Markers'><LayerGroup>
					{alertedCities.map((alert, index) => (
						<Marker key={index} position={alert.center} icon={icon}>
							<AlertPopup {...alert} time={alertTimes[alert.name]} />
						</Marker>
					))}
				</LayerGroup></LayersControl.Overlay>

			</LayersControl>
		</MapContainer>
    );
};