import 'leaflet/dist/leaflet.css';

import APIAccess from './services/APIAccess';
import { UILayer } from './components/UILayer';
import { ProgressSpinner } from 'primereact/progressspinner';
import { AlertView } from './components/AlertView';
import useAlertDisplay from './hooks/UseAlertDisplay';
import { AlertFetcher } from './types';
import React from 'react';

export default function App() {
	const [alertFetcher, setAlertFetcher] = React.useState<AlertFetcher>(
		() => () => APIAccess.getRedAlerts()
	);
	const { alertedCities } = useAlertDisplay(alertFetcher);
	const [loaded, setLoaded] = React.useState(false);

	React.useEffect(() => {
		APIAccess.initCollections().then(() => {
			setLoaded(true);
		});
	}, []);

	React.useEffect(() => {
		
	}, [alertFetcher]);

	return loaded ? (
		<>
			<AlertView alertFetcher={alertFetcher} alertedCities={alertedCities}  />
			<UILayer setAlertFetcher={setAlertFetcher} alertedCities={alertedCities} />
		</>
	) : (
		<div style={{
			display: 'flex',
			justifyContent: 'center',
			alignContent: 'center',
			height: '100vh',
			backgroundColor: document.body.getAttribute('theme') === 'dark' ? 'var(--dm-bg1)' : 'var(--wm-bg1)'
		}}>
			<ProgressSpinner style={{ 'margin': 'auto' }} />
		</div>
	);
};