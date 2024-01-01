import { Component } from "react";
import { Circle, Marker, Popup } from 'react-leaflet';
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
		const { name, name_en, evac_time } = this.props;
		return (
			<Popup>
				<b>{name_en && `${name_en} - `}{name}</b>
				<br />
				{evac_time && `Evacuation time: ${new Date(evac_time * 1000).toISOString().slice(14, 19)}`}
			</Popup>
		);
	}
}

export class MarkerAlert extends BaseAlert {
	render() {
		const { center } = this.props;
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