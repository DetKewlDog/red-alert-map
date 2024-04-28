import { useState, useEffect } from 'react';
import APIAccess from '../services/APIAccess';

export default function useAlertDisplay(fetcher) {
  let [alertedCities, setAlertedCities] = useState([]);


	useEffect(() => {
    setAlertedCities([]);

    if (APIAccess.historyId !== 0) {
      fetchNewAlerts();
      return;
    }

		const interval = setInterval(fetchNewAlerts, 3000);
    return () => clearInterval(interval);
	}, [fetcher]);

  function fetchNewAlerts() {
    fetcher()
      .then(results => results || [])
      .then(async results => {
        if (results.length === alertedCities.length
          && results.every((val, index) => val === alertedCities[index].name)) {
          return;
        }
        updateAlertedCities(
          results.map(alert =>
            APIAccess.getCity(alert)
          ).filter(i => !!i)
        );
      });
  }

	useEffect(() => {

  }, [alertedCities]);

  function updateAlertedCities(arr) {
		alertedCities = arr;
		setAlertedCities(arr);
	}

  return { alertedCities: alertedCities };
}