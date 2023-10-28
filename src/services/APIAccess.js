import axios from 'axios';
import { LatLng } from 'leaflet';

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*'
};

class APIAccess {
    static cities = undefined;

    static async getRedAlerts() {
        return axios.get('https://www.kore.co.il/redAlert.json', headers)
            .then(result => result.data?.data?.map(i => i.split(', ')[0]))
    }

    // TODO: add headers to bypass the "access denied" error
    static async getRedAlertsHistory() {
        return axios.get('https://www.oref.org.il//Shared/Ajax/GetAlarmsHistory.aspx?lang=en&mode=1', headers)
            .then(result => result.data.map(i => i.data))
    }

    static async getPosition(city) {
        if (APIAccess.cities === undefined) {
            APIAccess.cities = await axios.get('cities.json', headers)
                .then(result => result.data)
                .catch(err => console.error('Couldn\'t access cities.json!'));
        }

        const cachedCity = localStorage.getItem(city);
        if (cachedCity !== null) {
            return [ JSON.parse(cachedCity), true ];
        }

        return axios.get(`https://geocode.maps.co/search?q=${city}`, headers)
            .then(result => result.data)
            .then(async data => {
                const foundCity = data.find(i => i.display_name.includes('Israel'));
                if (foundCity === undefined) {
                    return await getPositionFromLocalArchive(city);
                }

                const bounding = foundCity.boundingbox;
                const [ lat1, lat2, lon1, lon2 ] = bounding.map(parseFloat);
                const bound1 = new LatLng(lat1, lon1), bound2 = new LatLng(lat2, lon2);

                const result = {
                    name: city,
                    name_en: (city in APIAccess.cities ? APIAccess.cities[city].name_en : undefined),
                    center: new LatLng( parseFloat(foundCity.lat), parseFloat(foundCity.lon) ),
                    radius: Math.max(bound1.distanceTo(bound2) / 2, 250),
                    evac_time: (city in APIAccess.cities ? APIAccess.cities[city].evac_time : undefined),
                };
                localStorage.setItem(city, JSON.stringify(result));
                return [ result, false ];
            })
            .catch(err => [ undefined, false ]);
    }

    static async getPositionFromLocalArchive(city) {
        if (!(city in APIAccess.cities)) {
            return [undefined, false];
        }
        const foundCity = APIAccess.cities[city];
        const result = {
            name: city,
            name_en: foundCity.name_en,
            center: new LatLng(...foundCity.center),
            radius: 3500,
            evac_time: foundCity.evac_time,
        };
        localStorage.setItem(city, JSON.stringify(result));
        return [ result, false ];
    }
}

export default APIAccess;