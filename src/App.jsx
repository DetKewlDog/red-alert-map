import { MapContainer, LayersControl, LayerGroup, ImageOverlay, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import APIAccess from './services/APIAccess';
import { MarkerAlert, CircleAlert, PolygonAlert } from './components/Alert';
import { MapLayer } from './components/MapLayer';
import { AlertLayer } from './components/AlertLayer';
import useAlertDisplay from './hooks/UseAlertDisplay';
import { PanToLocation } from './util/PanToLocation';
import { UILayer } from './components/UILayer';
import { ThemeProvider } from './util/ThemeProvider';
import { useState } from 'react';
import { LocationMarker } from './components/LocationMarker';

export default function App() {
	const { alertedCities } = useAlertDisplay(() => APIAccess.getRedAlerts());
	const [location, setLocation] = useState(() => APIAccess.getPosition('israel'));

	return (
		<>
			<section>
				<MapContainer center={[0, 0]} zoom={7} style={{ height: '100vh' }} zoomControl={false}>
					<LayersControl position="topright">
						<ThemeProvider />
						<PanToLocation getLocation={location} /> 
						<MapLayer name="Default"   		   url='https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}' checked 		/>
						<MapLayer name="Open Street Map" url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' subs='abc'	/>
						<MapLayer name="Terrain"   		   url='https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}'							/>
						<MapLayer name="Satellite" 		   url='https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}' 			 		/>

						<LayersControl.Overlay name='Dark Mode' checked={window.matchMedia('(prefers-color-scheme: dark)').matches}>
							<LayerGroup />
						</LayersControl.Overlay>

						<AlertLayer name='Show Circles'        alerts={alertedCities} alertTemplate={CircleAlert } />
						<AlertLayer name='Show Markers'        alerts={alertedCities} alertTemplate={MarkerAlert } />
						<AlertLayer name='Show Geometry (WIP)' alerts={alertedCities} alertTemplate={PolygonAlert} checked />
						<LocationMarker getLocation={location} />
					</LayersControl>
					<ZoomControl position='topright' />
				</MapContainer>
			</section>
			<UILayer setLocation={setLocation} />
		</>
	);
};