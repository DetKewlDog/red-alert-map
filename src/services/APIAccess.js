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
  static histories = {};
  static cityCache = {};
  static historyId = 0;
  static threat    = -1;

  static async initCollections() {
    if (APIAccess.cities && APIAccess.polygons) return;

    [APIAccess.cities, APIAccess.polygons] = (await Promise.all(
      ['cities', 'geometry'].map(
        collection => APIAccess[collection]
          ? new Promise(APIAccess[collection])
          : axios.get(`${BACKEND_URL}/${collection}`)
      )
    )).map(i => i.data);
  }

  static updateCurrentThreat(data) {
    APIAccess.threat = data ? parseInt(data?.cat) - 1 : -1;
    return data;
  }

  static async getRedAlerts() {
    APIAccess.initCollections();
    return await axios.get(`${BACKEND_URL}/realtime`, args)
      .then(result => result.data)
      .then(APIAccess.updateCurrentThreat)
      .then(data => data?.data?.map(i => i.split(', ')[0]))
  }

  static async getRedAlertsHistory() {
    APIAccess.initCollections();
    return await axios.get(`${BACKEND_URL}/history`, args)
      .then(result => result.data);
  }

  static async getRedAlertsHistoryById() {
    APIAccess.initCollections();
    if (APIAccess.historyId === 0) return;
    if (APIAccess.historyId in APIAccess.histories) {
      return APIAccess.histories[APIAccess.historyId];
    }
    const res = await axios.get(`${BACKEND_URL}/history/${APIAccess.historyId}`, args)
      .then(result => result.data?.alerts?.flatMap(alert => alert.cities));
    APIAccess.histories[APIAccess.historyId] = res;
    return res;
  }

  static getCity(city) {
    if (city === 'israel') {
      return { name: 'israel', center: [30.8124247, 34.8594762] };
    }

    if (city in APIAccess.cityCache) {
      return APIAccess.cityCache[city];
    }

    const data = APIAccess.cities[city];
    const id = data?.id;
    const center = data?.center;
    const coord = center && new LatLng(...center);
    const polygon = APIAccess.polygons[id] || [];

    const radius = polygon.length !== 0
      ? Math.max(...polygon.map(pos => coord?.distanceTo(new LatLng(...pos))))
      : 250;

    const fetchedCity = {
      id: id,
      he: data?.he,
      en: data?.en,
      ru: data?.ru,
      ar: data?.ar,
      es: data?.es,
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
