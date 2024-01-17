import { MapContainer, LayersControl, LayerGroup, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { MarkerAlert, CircleAlert, PolygonAlert } from './Alert';
import { MapLayer } from './MapLayer';
import { AlertLayer } from './AlertLayer';
import useAlertDisplay from '../hooks/UseAlertDisplay';
import { useEffect, useState } from 'react';
import { MapUtil } from '../util/MapUtil';
import { useSettings } from '../hooks/UseSettings';

export function AlertView({ alertFetcher }) {
	const { alertedCities } = useAlertDisplay(alertFetcher);
  let [waitingForPan, setWaitingForPan] = useState(false);
  const [map, setMap] = useState(null);

  const [settings, setSettings] = useState({ });
  const { getSettings } = useSettings(setSettings);

  useEffect(() => {
    waitingForPan = true;
    setWaitingForPan(true);
  }, [alertFetcher]);

  useEffect(() => {
    if (!waitingForPan || alertedCities.length === 0) return;
    waitingForPan = false;
    setWaitingForPan(false);
    MapUtil.flyToPolygons(alertedCities.map(i => i.polygon).flat(1));
  }, [alertedCities]);

  useEffect(() => {
    console.log(settings);
  }, [settings]);

  useEffect(() => {
    setSettings(getSettings());
  }, []);

  useEffect(() => {
    if (!map) return;
    MapUtil.map = map;
  }, [map]);

	return (
    <section>
      <MapContainer center={[0, 0]} zoom={7} style={{ height: '100vh' }} ref={setMap} zoomControl={false}>
        <LayersControl position="topright">
          <MapLayer name="Default"   		   url='https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}' checked 		/>
          <MapLayer name="Open Street Map" url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' subs='abc'	/>
          <MapLayer name="Terrain"   		   url='https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}'							/>
          <MapLayer name="Satellite" 		   url='https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}' 			 		/>

          {settings['circles' ] && <AlertLayer alerts={alertedCities} alertTemplate={CircleAlert } />}
          {settings['markers' ] && <AlertLayer alerts={alertedCities} alertTemplate={MarkerAlert } />}
          {settings['polygons'] && <AlertLayer alerts={alertedCities} alertTemplate={PolygonAlert} />}
        </LayersControl>
        <ZoomControl position='topright' />
      </MapContainer>
    </section>
	);
};