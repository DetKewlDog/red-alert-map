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
    let cities = alertedCities.filter(city =>
      alerts.some(alert => city.name === alert)
    );
    // get all alerts that are not already displayed on the map
    alerts = alerts.filter(alert =>
      !alertedCities.some(city => city.name === alert)
    );

    if (alerts.length === 0) return;

    updateAlertedCities([...cities]);
    for (const alert of alerts) {
      const city = await APIAccess.getPosition(alert);

      if (city === undefined) continue;
      if (cities.some(i => i.name === city.name)) continue;

      cities = [...cities, city];
      updateAlertedCities([...cities]);
    }
    updateAlertedCities([...cities]);
  }

	useEffect(() => {
		redrawAlerts();
	}, [alerts]);

	useEffect(() => {

  }, [alertedCities]);

	function updateAlerts(arr) {
		alerts = arr;
		setAlerts(arr);
  }

  function updateAlertedCities(arr) {
		alertedCities = arr;
		setAlertedCities(arr);
	}

  return { alertedCities: alertedCities };
}