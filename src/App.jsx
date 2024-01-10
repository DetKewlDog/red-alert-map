import { MapContainer, LayersControl, LayerGroup, ImageOverlay } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import APIAccess from './services/APIAccess';
import { MarkerAlert, CircleAlert, PolygonAlert } from './components/Alert';
import { MapLayer } from './components/MapLayer';
import { AlertLayer } from './components/AlertLayer';
import useAlertDisplay from './hooks/UseAlertDisplay';
import { PanToLocation } from './hooks/PanToLocation';

export default function App() {
	const { alertedCities } = useAlertDisplay(() => APIAccess.getRedAlerts());

	return (
		<MapContainer center={[0, 0]} zoom={7} style={{ height: '100vh' }}>
			<LayersControl position="topright">
				<PanToLocation getLocation={() => APIAccess.getPosition('israel')} /> 
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
			</LayersControl>
		</MapContainer>
	);
};