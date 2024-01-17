import L from 'leaflet';
import APIAccess from '../services/APIAccess';

export class MapUtil {
  static #map = undefined;
  static get map() {
    return MapUtil.#map;
  }
  static set map(newMap) {
    if (!MapUtil.#map) {
      newMap.setView(APIAccess.getPosition('israel').center, 7)
    }
    MapUtil.#map = newMap;
  }

  static flyToPolygons(positions) {
    if (!MapUtil.map || positions.length === 0) {
      return;
    }

    MapUtil.map.flyToBounds(new L.latLngBounds(positions).pad(1));
  }
}