import { useEffect } from 'react';
import { useMapEvents } from 'react-leaflet';
import '../index.css';

import APIAccess from '../services/APIAccess';

const ALIGN_CLASSES = {
    bottomleft: 'leaflet-bottom leaflet-left',
    bottomright: 'leaflet-bottom leaflet-right',
    topleft: 'leaflet-top leaflet-left',
    topright: 'leaflet-top leaflet-right',
};

export default function PanToLocation({ align = 'topright', setPosition }) {
    const map = useMapEvents({
        locationfound(e) {
            setPosition(Object.values(e.latlng));
            map.flyTo(e.latlng, 12);
        },
    });

    useEffect(() => {
        APIAccess.getPosition('israel')
            .then(([ res, _ ]) => {
                map.panTo(res.center, 7);
            });
    }, []);

    return (
        <div className={ALIGN_CLASSES[align]}>
            <div className="leaflet-control leaflet-bar">
                <a className="fas fa-crosshairs" onClick={() => map.locate()}></a>
            </div>
        </div>
    );
}