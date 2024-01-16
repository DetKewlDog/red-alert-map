import { MapContainer, LayersControl, LayerGroup, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { MarkerAlert, CircleAlert, PolygonAlert } from './Alert';
import { MapLayer } from './MapLayer';
import { AlertLayer } from './AlertLayer';
import useAlertDisplay from '../hooks/UseAlertDisplay';
import { ThemeProvider } from '../util/ThemeProvider';
import { useEffect, useState } from 'react';
import { MapUtil } from '../util/MapUtil';

export function AlertView({ darkMode, alertFetcher }) {
	const { alertedCities } = useAlertDisplay(alertFetcher);
  let [waitingForPan, setWaitingForPan] = useState(false);
  const [map, setMap] = useState(null);

  useEffect(() => {
    waitingForPan = true;
    setWaitingForPan(true);
  }, [alertFetcher]);

  useEffect(() => {
    if (!waitingForPan || alertedCities.length === 0) return;
    waitingForPan = false;
    setWaitingForPan(false);
    MapUtil.flyToPolygons();
  }, [alertedCities]);

  useEffect(() => {
    if (!map) return;
    MapUtil.map = map;
  }, [map]);

	return (
    <section>
      <MapContainer center={[0, 0]} zoom={7} style={{ height: '100vh' }} ref={setMap} zoomControl={false}>
        <LayersControl position="topright">
          <ThemeProvider darkMode={darkMode} />
          {/* <PanToLocation getLocation={location} />  */}
          <MapLayer name="Default"   		   url='https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}' checked 		/>
          <MapLayer name="Open Street Map" url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' subs='abc'	/>
          <MapLayer name="Terrain"   		   url='https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}'							/>
          <MapLayer name="Satellite" 		   url='https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}' 			 		/>

          <LayersControl.Overlay name='Dark Mode' checked={darkMode}>
            <LayerGroup />
          </LayersControl.Overlay>

          <AlertLayer alerts={alertedCities} alertTemplate={CircleAlert } name='Show Circles'  />
          <AlertLayer alerts={alertedCities} alertTemplate={MarkerAlert } name='Show Markers'  checked />
          <AlertLayer alerts={alertedCities} alertTemplate={PolygonAlert} name='Show Geometry' checked />
        </LayersControl>
        <ZoomControl position='topright' />
      </MapContainer>
    </section>
	);
};