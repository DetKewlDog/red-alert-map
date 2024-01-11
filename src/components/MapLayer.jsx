import { LayersControl, TileLayer } from 'react-leaflet';

export function MapLayer({ name, url, subs, checked = false }) {
	return (
		<LayersControl.BaseLayer name={name} checked={checked}>
			<TileLayer url={url} subdomains={subs?.split('') || ['mt0', 'mt1', 'mt2', 'mt3']} />
		</LayersControl.BaseLayer>
	);
}