import { MapContainer, LayersControl, LayerGroup, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { MarkerAlert, CircleAlert, PolygonAlert } from './Alert';
import { MapLayer } from './MapLayer';
import { AlertLayer } from './AlertLayer';
import useAlertDisplay from '../hooks/UseAlertDisplay';
import { PanToLocation } from '../util/PanToLocation';
import { ThemeProvider } from '../util/ThemeProvider';
import { LocationMarker } from './LocationMarker';

export function AlertView({ location, darkMode, alertFetcher }) {
	const { alertedCities } = useAlertDisplay(alertFetcher);

	return (
    <section>
      <MapContainer center={[0, 0]} zoom={7} style={{ height: '100vh' }} zoomControl={false}>
        <LayersControl position="topright">
          <ThemeProvider />
          <PanToLocation getLocation={location} /> 
          <MapLayer name="Default"   		   url='https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}' checked 		/>
          <MapLayer name="Open Street Map" url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' subs='abc'	/>
          <MapLayer name="Terrain"   		   url='https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}'							/>
          <MapLayer name="Satellite" 		   url='https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}' 			 		/>

          <LayersControl.Overlay name='Dark Mode' checked={darkMode}>
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
	);
};