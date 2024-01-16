import L from 'leaflet';
import APIAccess from '../services/APIAccess';

export class MapUtil {
  static _map = undefined;
  static get map() {
    return MapUtil._map;
  }
  static set map(newMap) {
    if (!MapUtil._map) {
      newMap.setView(APIAccess.getPosition('israel').center, 7)
    }
    MapUtil._map = newMap;
  }

  static flyToPolygons() {
    if (!MapUtil.map) {
      return;
    }
    
    const positions = [];
    MapUtil.map.eachLayer(i => {
      if (i._latlng && i._radius) {
        positions.push(i._latlng);
        return;
      }
      if (i._latlngs) {
        i._latlngs.forEach(j => positions.push(...j));
      }
    });
    
    MapUtil.map.flyToBounds(new L.latLngBounds(positions).pad(1));
  }
}