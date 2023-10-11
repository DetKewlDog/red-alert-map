import axios from 'axios';
import { LatLng } from 'leaflet';

const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': "*"
};

class APIAccess {
    static async getRedAlerts() {
        return axios.get('https://www.kore.co.il/redAlert.json', headers)
            .then(result => result.data)
            .then(data => data?.data);
    }

    static async getCity(city) {
        city = city.split(' - ')[0];
        let cachedCity = localStorage.getItem(city);
        if (cachedCity !== null) return JSON.parse(cachedCity);

        return axios.get(`https://geocode.maps.co/search?q=${city}`, headers)
            .then(result => result.data)
            .then(data => {
                if (data.length == 0) return undefined;
                data = data[0];

                let bounding = data.boundingbox;
                const [lat1, lat2, lon1, lon2] = bounding.map(parseFloat);
                let bound1 = new LatLng(lat1, lon1), bound2 = new LatLng(lat2, lon2);

                let result = {
                    name: city,
                    center: new LatLng(parseFloat(data.lat), parseFloat(data.lon)),
                    radius: bound1.distanceTo(bound2) / 2
                };
                localStorage.setItem(city, JSON.stringify(result));
                return result;
            });
    }
}

export default APIAccess;