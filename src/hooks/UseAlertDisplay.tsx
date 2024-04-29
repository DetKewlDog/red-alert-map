import React from 'react';
import APIAccess from '../services/APIAccess';
import { AlertFetcher, City } from '../types';

export default function useAlertDisplay(fetcher : AlertFetcher) {
  let [alertedCities, setAlertedCities] = React.useState<[string, City][]>([]);


	React.useEffect(() => {
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
          && results.every((val, index) => val === alertedCities[index][0])) {
          return;
        }
        updateAlertedCities(
          results.map(alert =>
            [alert, APIAccess.getCity(alert)]
          ).filter(i => !!i[1]) as [string, City][]
        );
      });
  }

	React.useEffect(() => {

  }, [alertedCities]);

  function updateAlertedCities(arr: [string, City][]) {
		alertedCities = arr;
		setAlertedCities(arr);
	}

  return { alertedCities: alertedCities.map(([name, city]) => city) };
}