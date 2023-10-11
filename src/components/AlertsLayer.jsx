import { Circle, LayerGroup } from 'react-leaflet';

export default function AlertsLayer({ alerts, color }) {
    return (
        <LayerGroup>
            {alerts.map((alert, index) => (
                <Circle key={index}
                    pathOptions={{ color: color }}
                    center={alert.center}
                    radius={Math.max(5000, alert.radius)} />
            ))}
        </LayerGroup>
    );
}