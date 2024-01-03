import axios from 'axios';
import { LatLng } from 'leaflet';

const BACKEND_URL = 'https://red-alert-server.detkewldog.repl.co/api'

const headers = {
  'Content-Type': 'application/json',
}

const args = {
  headers: headers,
  withCredentials: false, 
  crossdomain: true,
  mode: 'cors',
  timeout: 5000,
};

class APIAccess {
  static cities = undefined;

  static async getRedAlerts() {
    return await axios.get(`${BACKEND_URL}/realtime`, args)
      .then(result => result.data?.data?.map(i => i.split(', ')[0]))
  }

  static async getPosition(city) {
    if (APIAccess.cities === undefined) {
      APIAccess.cities = axios.get(`${BACKEND_URL}/cities`, args)
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
          return await getPositionFromLocalArchive(city);
        }

        const bounding = foundCity.boundingbox;
        const [ lat1, lat2, lon1, lon2 ] = bounding.map(parseFloat);
        const bound1 = new LatLng(lat1, lon1), bound2 = new LatLng(lat2, lon2);

        const polygon = await this.fetchCityGeometry(city);

        const result = {
          name: city,
          name_en: (APIAccess.cities !== undefined && city in APIAccess.cities ? APIAccess.cities[city].name_en : undefined),
          center: new LatLng( parseFloat(foundCity.lat), parseFloat(foundCity.lon) ),
          radius: Math.max(bound1.distanceTo(bound2) / 2, 250),
          evac_time: (APIAccess.cities !== undefined && city in APIAccess.cities ? APIAccess.cities[city].evac_time : undefined),
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

  static async fetchCityGeometry(city) {
    const query = `[out:json];
    (
    rel["name"="${city}"]["place"];
    area["name"="${city}"]["place"];
    way["name"="${city}"]["place"];
    node["name"="${city}"]["place"];
    );
    out geom;`
    return axios.get("https://lz4.overpass-api.de/api/interpreter", { ...args, params: { data: query } })
      .then(result => result.data)
      .then(data => {
        let result = data.elements.map(element => {
          function getGeometry(member) {
            return member?.geometry?.map(i => [i.lat, i.lon])
              .filter(i => i !== undefined)?.reverse();
          }

          if (element.type === 'relation') {
            return element.members.map(i => getGeometry(i))
              .flat(1).filter(i => i !== undefined);
          }

          return getGeometry(element);
        }).filter(i => i !== undefined);

        if (result.length > 1) {
          const lengths = result.map(i => i.length);
          const index = lengths.indexOf(Math.max(...lengths));
          result = [ result[index] ];
        }
        return result;
			});
  }
}

export default APIAccess;
