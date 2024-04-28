import { useCallback } from 'react';
import { MapContainer, LayersControl, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { MarkerAlert, CircleAlert, PolygonAlert } from './Alert';
import { MapLayer } from './MapLayer';
import { AlertLayer } from './AlertLayer';
import { useEffect, useState } from 'react';
import { MapUtil } from '../util/MapUtil';
import { useSettings } from '../hooks/UseSettings';
import APIAccess from '../services/APIAccess';
import { langDict, useLanguage } from '../hooks/UseLanguage';
import { LocationMarker } from './LocationMarker';

export function AlertView({ alertFetcher, alertedCities }) {
  let [waitingForPan, setWaitingForPan] = useState(false);
  const [map, setMap] = useState(null);

  const [settings, setSettings] = useState({ });
  const { getSettings } = useSettings(setSettings);

  useEffect(() => {
    waitingForPan = true;
    setWaitingForPan(true);
  }, [alertFetcher]);

  useEffect(() => {
    APIAccess.historyId = APIAccess.historyId;

    if (!waitingForPan) {
      if (alertedCities.length === 0) {
        waitingForPan = true;
        setWaitingForPan(true);
      }
      return;
    }

    if (alertedCities.length === 0) {
      return;
    }

    waitingForPan = false;
    setWaitingForPan(false);

    MapUtil.flyToPolygons(alertedCities.map(i => i.polygon).flat(1));
  }, [alertedCities]);

  useEffect(() => {

  }, [settings]);

  useEffect(() => {
    setSettings(getSettings());
  }, []);

  useEffect(() => {
    if (!map) return;
    MapUtil.map = map;
  }, [map]);


  const MapLayers = useCallback(() => {
    const lang = useLanguage();
    return (
      <>
        <MapLayer
          name={langDict.MAP_LAYER_DEFAULT[lang]}
          url={`https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&hl=${lang}`}
          checked
        />
        <MapLayer
          name={langDict.MAP_LAYER_OSM[lang]}
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          subs='abc'
        />
        <MapLayer
          name={langDict.MAP_LAYER_TERRAIN[lang]}
          url={`https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}&hl=${lang}`}
        />
        <MapLayer
          name={langDict.MAP_LAYER_SATELLITE[lang]}
          url={`https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}&hl=${lang}`}
        />
      </>
    );
  }, [settings]);

	return (
    <section>
      <MapContainer center={[0, 0]} zoom={7} style={{ height: '100vh' }} ref={setMap} zoomControl={false}>
        <LayersControl position="topright">
          <MapLayers />
          {settings['circles' ] && <AlertLayer alerts={alertedCities} alertTemplate={CircleAlert } />}
          {settings['markers' ] && <AlertLayer alerts={alertedCities} alertTemplate={MarkerAlert } />}
          {settings['polygons'] && <AlertLayer alerts={alertedCities} alertTemplate={PolygonAlert} />}
        </LayersControl>
        <ZoomControl position='topright' />
        <LocationMarker />
      </MapContainer>
    </section>
	);
};