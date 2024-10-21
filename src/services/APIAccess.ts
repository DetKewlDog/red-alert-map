import axios from 'axios';
import { LatLng } from 'leaflet';
import { RealtimeAlert, APIcityCollection, APIpolygonCollection, City, HistoricAlertBundle, LocalizedObject, APIareaCollection } from '../types';

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
  static cities : APIcityCollection | undefined = undefined;
  static geometry : APIpolygonCollection | undefined = undefined;
  static areas : Record<number, LocalizedObject> | undefined = undefined;
  static histories: Record<number, string[]> = {};
  static cityCache : Record<string, City> = {};
  static historyId = 0;
  static threat    = -1;

  static async initCollections() {
    if (APIAccess.cities && APIAccess.geometry && APIAccess.areas) return;

    [APIAccess.cities, APIAccess.geometry, APIAccess.areas] = (await Promise.all(
      (['cities', 'geometry', 'areas'] as const).map(
        (collection) => APIAccess[collection]
          ? new Promise({ data: APIAccess[collection]! } as any)
          : axios.get(`${BACKEND_URL}/${collection}`)
      ) as [Promise<{ data: APIcityCollection }>, Promise<{ data: APIpolygonCollection }>, Promise<{ data: APIareaCollection }>]
    )).map(({ data }) => data) as [APIcityCollection, APIpolygonCollection, APIareaCollection];
  }

  static updateCurrentThreat(data: RealtimeAlert[] | undefined) {
    APIAccess.threat = data?.length ? data.sort((a, b) => b.time - a.time)[0].threat : -1;
    return data;
  }

  static async getRedAlerts() {
    APIAccess.initCollections();
    return await axios.get(`${BACKEND_URL}/realtime`, args)
      .then(result => result.data as RealtimeAlert[])
      .then(APIAccess.updateCurrentThreat)
      .then(data => data?.flatMap(i => i.cities));
  }

  static async getRedAlertsHistory() {
    APIAccess.initCollections();
    return await axios.get(`${BACKEND_URL}/history`, args)
      .then(result => result.data as HistoricAlertBundle[]);
  }

  static async getRedAlertsHistoryById() {
    APIAccess.initCollections();
    if (APIAccess.historyId === 0) return;
    if (APIAccess.historyId in APIAccess.histories) {
      return APIAccess.histories[APIAccess.historyId];
    }
    const res = await axios.get(`${BACKEND_URL}/history/${APIAccess.historyId}`, args)
      .then(result => (result.data as HistoricAlertBundle).alerts.flatMap(alert => alert.cities));
    APIAccess.histories[APIAccess.historyId] = res;
    return res;
  }

  static getCity(city: string) {
    if (city in APIAccess.cityCache) {
      return APIAccess.cityCache[city];
    }

    APIAccess.initCollections();

    const data = APIAccess.cities?.[city];
    if (!data) return undefined;
    const id = data?.id;
    const center = data.center;
    const coord = center && new LatLng(...center);
    const polygon = APIAccess.geometry![id] || [];
    const area = APIAccess.areas![data?.area] || {};

    const radius = polygon.length !== 0
      ? Math.max(...polygon.map(pos => coord.distanceTo(new LatLng(...pos))))
      : 250;

    const fetchedCity : City = {
      id: id,
      he: data.he,
      en: data.en,
      ru: data.ru,
      ar: data.ar,
      es: data.es,
      evac_time: data.evac_time,
      center,
      radius,
      area,
      polygon
    };
    APIAccess.cityCache[city] = fetchedCity;
    return fetchedCity;
  }
}

export default APIAccess;
