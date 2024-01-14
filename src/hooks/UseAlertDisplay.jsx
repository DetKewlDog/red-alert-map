import { useState, useEffect } from 'react';
import APIAccess from '../services/APIAccess';

export default function useAlertDisplay(fetcher) {
  let [alertedCities, setAlertedCities] = useState([]);

	useEffect(() => {
		const interval = setInterval(fetchNewAlerts, 1000);
		return () => clearInterval(interval);
	}, []);

  function fetchNewAlerts() {
    fetcher()
      .then(results => results || [])
      .then(async results => {
        if (results.length === alertedCities.length 
          && results.every((val, index) => val === alertedCities[index].name)) {
          return;
        }
        updateAlertedCities(
          await Promise.all(results.map(async alert => 
            APIAccess.getPosition(alert)
          ).filter(i => !!i))
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