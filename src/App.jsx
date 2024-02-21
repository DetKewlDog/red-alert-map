import 'leaflet/dist/leaflet.css';

import APIAccess from './services/APIAccess';
import { UILayer } from './components/UILayer';
import { useEffect, useState } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';
import { AlertView } from './components/AlertView';
import useAlertDisplay from './hooks/UseAlertDisplay';

export default function App() {
	const [alertFetcher, setAlertFetcher] = useState(() => () => APIAccess.getRedAlerts());
	const { alertedCities } = useAlertDisplay(alertFetcher);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		APIAccess.initCollections().then(() => {
			setLoaded(true);
		});
	}, []);

	useEffect(() => {
		
	}, [alertFetcher]);

	if (!loaded) {
		return (
			<div style={{
				'display': 'flex',
				'justifyContent': 'center',
				'alignContent': 'center',
				'height': '100vh',
				'backgroundColor': document.body.getAttribute('theme') === 'dark' ? 'var(--dm-bg1)' : 'var(--wm-bg1)'
			}}>
				<ProgressSpinner style={{ 'margin': 'auto' }} />
			</div>
		)
	}

	return (
		<>
			<AlertView alertFetcher={alertFetcher} alertedCities={alertedCities}  />
			<UILayer setAlertFetcher={setAlertFetcher} alertedCities={alertedCities} />
		</>
	);
};