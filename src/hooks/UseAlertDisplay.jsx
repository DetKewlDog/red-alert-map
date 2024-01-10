import { useState, useEffect } from 'react';
import APIAccess from '../services/APIAccess';

export default function useAlertDisplay(fetcher) {
  let [alertedCities, setAlertedCities] = useState([]);
	let [alerts, setAlerts] = useState([]);

	useEffect(() => {
		const interval = setInterval(fetchNewAlerts, 1000);
		return () => clearInterval(interval);
	}, []);

  function fetchNewAlerts() {
    fetcher()
      .then(results => results || [])
      .then(results => {
        if (results.length === alerts.length
          && results.every((val, index) => val === alerts[index])
          && (results.length !== 0 || alertedCities.length === 0)) return;
        updateAlerts(results);
      });
  }

  async function redrawAlerts() {
    // get all cities that were already displayed as alerted cities (no need to redraw those cities)
    let cities = alertedCities.filter(city => {
      return alerts.some(alert => city.name === alert);
    });
    // get all alerts that are not already displayed on the map
    alerts = alerts.filter(alert => {
      return !alertedCities.some(city => city.name === alert);
    });

    console.log('Alert count: ', alerts.length + cities.length);
    updateAlertedCities([...cities]);

    for (const alert of alerts) {
      const [city, usedCache] = await APIAccess.getPosition(alert);

      if (city !== undefined && !cities.some(i => i.name === city.name)) {
        cities = [...cities, city];
        updateAlertedCities([...cities]);
      }

      if (usedCache) continue;
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('Done');
  }

	useEffect(() => {
		redrawAlerts();
	}, [alerts]);

	useEffect(() => {

	}, [alertedCities]);

	function updateAlertedCities(arr) {
		alertedCities = arr;
		setAlertedCities(arr);
	}

	function updateAlerts(arr) {
		alerts = arr;
		setAlerts(arr);
	}

  return { alertedCities: alertedCities };
}