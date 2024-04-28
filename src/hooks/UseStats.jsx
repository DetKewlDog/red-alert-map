import APIAccess from '../services/APIAccess';
import useAlertHistory from './UseAlertHistory';
import { useLanguage } from './UseLanguage';

export default function useStats() {
  const history = useAlertHistory();
  const lang = useLanguage();

  const timeToDate = time => {
    const date = new Date(0);
    date.setUTCSeconds(time);
    return date.toLocaleDateString('he-IL');
  }

  const dateToAlertCountObj = { };
  const cityToAlertCountObj = { };

  history.forEach(alert => {
    const time = timeToDate(alert.alerts[0].time);
    dateToAlertCountObj[time] = (dateToAlertCountObj[time] | 0) + alert.alerts.flatMap(subAlert => subAlert.cities).length;

    alert.alerts.forEach(subAlert => {
      subAlert.cities.forEach(city => {
        const name = APIAccess.getCity(city)[lang];
        cityToAlertCountObj[name] = (cityToAlertCountObj[name] | 0) + 1;
      })
    })
  });

  const dateToAlertCount = Object.entries(dateToAlertCountObj).reverse();
  const cityToAlertCount = Object.entries(cityToAlertCountObj)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([city, amount]) => {
      const nameEn = APIAccess.cities?.[city]?.name_en;
      if (nameEn) city = [city, nameEn];
      return [city, amount];
    });

  return {
    dateToAlertCount,
    cityToAlertCount
  };
}