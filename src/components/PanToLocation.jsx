import { useMapEvents } from 'react-leaflet';
import '../index.css';

const ALIGN_CLASSES = {
    bottomleft: 'leaflet-bottom leaflet-left',
    bottomright: 'leaflet-bottom leaflet-right',
    topleft: 'leaflet-top leaflet-left',
    topright: 'leaflet-top leaflet-right',
};

export default function PanToLocation({ align, setPosition }) {
    const map = useMapEvents({
        locationfound(e) {
            setPosition(Object.values(e.latlng));
            map.flyTo(e.latlng, 12);
        },
    });

    const positionClass = (align && ALIGN_CLASSES[align]) || ALIGN_CLASSES.topright;
    return (
        <div className={positionClass}>
            <div className="leaflet-control leaflet-bar">
                <a className="fas fa-crosshairs" onClick={() => map.locate()}></a>
            </div>
        </div>
    );
}