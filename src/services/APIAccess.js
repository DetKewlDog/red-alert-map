import axios from 'axios';
import { LatLng } from 'leaflet';

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  withCredentials: false, 
  crossdomain: true
};

class APIAccess {
  static cities = undefined;

  static async getRedAlerts() {
    return axios.get('https://www.kore.co.il/redAlert.json', headers)
      .then(result => result.data?.data?.map(i => i.split(', ')[0]))
  }

  static async getPosition(city) {
    if (APIAccess.cities === undefined) {
      APIAccess.cities = axios.get('cities.json', headers)
        .then(result => result.data)
        .catch(err => console.error('Couldn\'t access cities.json!'));
    }

    const cachedCity = localStorage.getItem(city);
    if (cachedCity !== null) {
      return [ JSON.parse(cachedCity), true ];
    }

    return axios.get(`https://geocode.maps.co/search?q=${city}&api_key=${import.meta.env.VITE_GEOCODE_API_KEY}`, headers)
      .then(result => result.json())
      .then(async data => {
        console.log(data);
        const foundCity = data.find(i => i.display_name.includes('Israel'));
        if (foundCity === undefined) {
          return await getPositionFromLocalArchive(city);
        }

        const bounding = foundCity.boundingbox;
        const [ lat1, lat2, lon1, lon2 ] = bounding.map(parseFloat);
        const bound1 = new LatLng(lat1, lon1), bound2 = new LatLng(lat2, lon2);

        const result = {
          name: city,
          name_en: (APIAccess.cities !== undefined && city in APIAccess.cities ? APIAccess.cities[city].name_en : undefined),
          center: new LatLng( parseFloat(foundCity.lat), parseFloat(foundCity.lon) ),
          radius: Math.max(bound1.distanceTo(bound2) / 2, 250),
          evac_time: (APIAccess.cities !== undefined && city in APIAccess.cities ? APIAccess.cities[city].evac_time : undefined),
        };
        localStorage.setItem(city, JSON.stringify(result));
        return [ result, false ];
      })
      .catch(err => {
        console.log(err);
        return  [ undefined, false ]
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
}

export default APIAccess;