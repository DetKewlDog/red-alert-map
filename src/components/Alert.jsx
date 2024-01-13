import { Component } from "react";
import { Circle, Marker, Popup, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const icon = new L.Icon({
	iconUrl:     './marker.png',
	iconSize:    [20, 33],
	iconAnchor:  [10, 33],
	popupAnchor: [0, -33],
});


class BaseAlert extends Component {
	render() {
		let { name, name_en, evac_time } = this.props;
		const evac_date = new Date(evac_time * 1000);

		evac_time = evac_time != 0 ? `${evac_date.getMinutes()}m ${evac_date.getSeconds()}s` : "Immediate";

		return (
			<Popup>
				<b>{name_en && `${name_en} - `}{name}</b>
				<br />
				{evac_time && `Evacuation time: ${evac_time}`}
			</Popup>
		);
	}
}

export class MarkerAlert extends BaseAlert {
	render() {
		const { center } = this.props;

		if (!center) {
			return undefined;
		}

		return (
			<Marker position={center} icon={icon}>
				{super.render()}
			</Marker>
		);
	}
}

export class CircleAlert extends BaseAlert {
	render() {
		const { center, radius } = this.props;

		if (!center || !radius) {
			return undefined;
		}

		return (
			<Circle pathOptions={{ color: 'red' }}
				center={center}
				radius={radius}
			>
				{super.render()}
			</Circle>
		);
	}
}

export class PolygonAlert extends BaseAlert {
	render() {
		const { polygon } = this.props;

		if (!polygon) {
			return undefined;
		}

		return (
			<Polygon pathOptions={{ color: '#ff0000' }} 
				positions={polygon}
			>
				{super.render()}
			</Polygon>
		);
	}
}