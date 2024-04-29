import { LayersControl, TileLayer } from 'react-leaflet';

interface MapLayerProps {
	name: string;
	url: string;
	subs?: string;
	checked?: boolean;
}

export function MapLayer({ name, url, subs, checked = false } : MapLayerProps) {
	return (
		<LayersControl.BaseLayer name={name} checked={checked}>
			<TileLayer url={url} subdomains={subs?.split('') || ['mt0', 'mt1', 'mt2', 'mt3']} />
		</LayersControl.BaseLayer>
	);
}