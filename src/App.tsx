import 'leaflet/dist/leaflet.css';

import APIAccess from './services/APIAccess';
import { UILayer } from './components/UILayer';
import { ProgressSpinner } from 'primereact/progressspinner';
import { AlertView } from './components/AlertView';
import useAlertDisplay from './hooks/UseAlertDisplay';
import { AlertFetcher } from './types';
import React from 'react';
import { Toast } from 'primereact/toast';
import { isUsingMobile } from './util/IsUsingMobile';

export default function App() {
	const [alertFetcher, setAlertFetcher] = React.useState<AlertFetcher>(
		() => () => APIAccess.getRedAlerts()
	);
	const { alertedCities } = useAlertDisplay(alertFetcher);
	const [loaded, setLoaded] = React.useState(false);
	const toast = React.useRef<Toast>(null);

	React.useEffect(() => {
		APIAccess.initCollections().then(() => {
			setLoaded(true);
			toast.current?.show({
				severity: 'success',
				summary: 'loaded',
				detail: 'loaded collections',
				life: 3000
			});
		});
	}, []);

	React.useEffect(() => {
		
	}, [alertFetcher]);

	return (
		<>
			<Toast ref={toast} position='top-center' pt={{
        root: {
          style: {
            paddingTop: isUsingMobile() ? '32px': '8px',
            paddingInline: '16px',
            pointerEvents: 'none'
          }
        }
			}} />
			{loaded ? (
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
			)}
		</>
	);
};