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
  static cities    = undefined;
  static polygons  = undefined;
  static cityCache = {};

  static async getRedAlerts() {
    return await axios.get(`${BACKEND_URL}/realtime`, args)
      .then(result => result.data?.data?.map(i => i.split(', ')[0]))
  }

  static async getRedAlertsHistory(id) {
    return await axios.get(`${BACKEND_URL}/history`, args)
      .then(result => result.data);
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
    if (city === 'israel') {
      return { name: 'israel', center: [30.8124247, 34.8594762] };
    }

    if (city in APIAccess.cityCache) {
      return APIAccess.cityCache[city];
    }

    if (APIAccess.cities === undefined) {
      APIAccess.cities = await axios.get(`${BACKEND_URL}/cities`, args)
        .then(result => result.data)
        .catch(err => console.error('Couldn\'t access cities!'));
    }

    if (APIAccess.polygons === undefined) {
      APIAccess.polygons = await axios.get(`${BACKEND_URL}/geometry`, args)
        .then(result => result.data)
        .catch(err => console.error('Couldn\'t access polygons!'));
    }

    const data = APIAccess.cities[city];
    const id = data?.id;
    const center = data?.center;
    const coord = center && new LatLng(...center);
    const polygon = APIAccess.polygons[id] || [];

    const radius = polygon.length !== 0
      && Math.max(...polygon.map(pos => coord?.distanceTo(new LatLng(...pos))))
      || 250;

    const fetchedCity = {
      id: id,
      name: city,
      name_en: data?.name_en,
      center: center,
      radius: radius,
      evac_time: data?.evac_time,
      polygon: polygon
    };
    APIAccess.cityCache[city] = fetchedCity;
    return fetchedCity;
  }
}

export default APIAccess;
