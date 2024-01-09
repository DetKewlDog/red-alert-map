import axios from 'axios';
import { LatLng } from 'leaflet';

const BACKEND_URL = 'https://red-alert-server.vercel.app'

const headers = {
  'Content-Type': 'application/json',
}

const args = {
  headers: headers,
  withCredentials: false,
  crossdomain: true,
  mode: 'cors',
};

class APIAccess {
  static cities = undefined;

  static async getRedAlerts() {
    return await axios.get(`${BACKEND_URL}/realtime`, args)
      .then(result => result.data?.data?.map(i => i.split(', ')[0]))
  }

  static async getRedAlertsHistory(id) {
    return await axios.get(`${BACKEND_URL}/history`, args)
      .then(result => result.data?.find(i => i.id === id)?.alerts);
  }

  static async getRedAlertsHistoryById(id) {
    return await axios.get(`${BACKEND_URL}/history/${id}`, args)
      .then(result =>
        result.data?.alerts?.flatMap(
          alert => alert.cities
        )
      );
  }

  static async getPosition(city) {
    if (APIAccess.cities === undefined) {
      APIAccess.cities = await axios.get(`${BACKEND_URL}/cities`, args)
        .then(result => result.data)
        .catch(err => console.error('Couldn\'t access cities.json!'));
    }

    const cachedCity = localStorage.getItem(city);
    if (cachedCity !== null) {
      return [ JSON.parse(cachedCity), true ];
    }

    return axios.get(`${BACKEND_URL}/geocode/${city}`, args)
      .then(result => result.data)
      .then(async data => {
        const foundCity = data.find(i => i.display_name.includes('Israel'));
        if (foundCity === undefined) {
          return await APIAccess.getPositionFromLocalArchive(city);
        }

        const bounding = foundCity.boundingbox;
        const [ lat1, lat2, lon1, lon2 ] = bounding.map(parseFloat);
        const bound1 = new LatLng(lat1, lon1), bound2 = new LatLng(lat2, lon2);

        const id = APIAccess.cities?.[city]?.id;
        const polygon = city === 'israel' && id !== undefined ? [] : await APIAccess.fetchCityGeometry(id);

        const result = {
          id: id,
          name: city,
          name_en: APIAccess.cities?.[city]?.name_en,
          center: new LatLng( parseFloat(foundCity.lat), parseFloat(foundCity.lon) ),
          radius: Math.max(bound1.distanceTo(bound2) / 2, 250),
          evac_time: APIAccess.cities?.[city]?.evac_time,
          polygon: polygon || []
        };
        localStorage.setItem(city, JSON.stringify(result));
        return [ result, false ];
      })
      .catch(err => {
        console.error(err);
        return [ undefined, false ]
      });
  }

  static async getPositionFromLocalArchive(city) {
    if (APIAccess.cities === undefined || !(city in APIAccess.cities)) {
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

  static async fetchCityGeometry(id) {
    return axios.get(`${BACKEND_URL}/geometry/${id}`, args)
      .then(result => result.data?.[id]);
  }
}

export default APIAccess;
