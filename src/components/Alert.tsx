import { Component } from "react";
import { Circle, Marker, Popup, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { langDict, useLanguage } from "../hooks/UseLanguage";
import { City } from "../types";

const icon = new L.Icon({
	iconUrl:     './marker.png',
	iconSize:    [20, 33],
	iconAnchor:  [10, 33],
	popupAnchor: [0, -33],
});


export class BaseAlert extends Component<City> {
	render() {
		const lang = useLanguage();

		let { evac_time } = this.props;
		const evac_date = new Date(evac_time * 1000);

		const getEvacTimeString = () => {
			if (evac_time === 0) {
				return langDict.ALERT_POPUP_EVAC_IMMEDIATE[lang];
			}

			const min = evac_date.getMinutes();
			const sec = evac_date.getSeconds();

			const strings: string[] = [];

			min && strings.concat([
				evac_date.getMinutes().toString(),
				langDict.ALERT_POPUP_EVAC_TIME_FORMAT_MIN[lang]
			]);
			sec && strings.concat([
				evac_date.getSeconds().toString(),
				langDict.ALERT_POPUP_EVAC_TIME_FORMAT_SEC[lang]
			]);

			return strings.join(' ');
		}
		return (
			<Popup>
				<b>{this.props[lang]}</b>
				<br />
				{`${langDict.ALERT_POPUP_EVAC_TIME[lang]}: ${getEvacTimeString()}`}
			</Popup>
		);
	}
}

export class MarkerAlert extends BaseAlert {
	render() {
		const { center } = this.props;

		if (!center) {
			return <></>;
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
			return <></>;
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
			return <></>;
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