import L from 'leaflet';

export class MapUtil {
  static #map : L.Map | undefined = undefined;
  static get map() : L.Map | undefined {
    return MapUtil.#map;
  }
  static set map(newMap : L.Map) {
    if (!MapUtil.#map) {
      newMap.setView([30.8124247, 34.8594762], 7)
    }
    MapUtil.#map = newMap;
  }

  static flyToPolygons(positions : [number, number][]) {
    if (!MapUtil.map || positions.length === 0) {
      return;
    }

    MapUtil.map.flyToBounds(L.latLngBounds(positions).pad(1));
  }
}