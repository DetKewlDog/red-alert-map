import axios from 'axios';
import { LatLng } from 'leaflet';

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*'
};

class APIAccess {
    static async getRedAlerts() {
        return axios.get('https://www.kore.co.il/redAlert.json', headers)
            .then(result => result.data)
            .then(data => data?.data);
    }

    // TODO: add headers to bypass the "access denied" error
    static async getRedAlertsHistory() {
        return axios.get('https://www.oref.org.il//Shared/Ajax/GetAlarmsHistory.aspx?lang=en&mode=1', headers)
            .then(result => result.data)
            .then(data => data.map(i => i.data));
    }

    static async getCityPosition(city) {
        const cachedCity = localStorage.getItem(city);
        if (cachedCity !== null) return [JSON.parse(cachedCity), true];

        return axios.get(`https://geocode.maps.co/search?q=${city}`, headers)
            .then(result => result.data)
            .then(data => {
                const foundCity = data.find(i => i.display_name.includes('Israel'));
                if (foundCity === undefined) return [undefined, false];

                let bounding = foundCity.boundingbox;
                const [lat1, lat2, lon1, lon2] = bounding.map(parseFloat);
                let bound1 = new LatLng(lat1, lon1), bound2 = new LatLng(lat2, lon2);

                let result = {
                    name: city,
                    center: new LatLng(parseFloat(foundCity.lat), parseFloat(foundCity.lon)),
                    radius: bound1.distanceTo(bound2) / 2
                };
                localStorage.setItem(city, JSON.stringify(result));
                return [result, false];
            }).catch(_ => [undefined, false]);
    }
}

export default APIAccess;