import { langDict, useLanguage } from '../hooks/UseLanguage';
import useStats from '../hooks/UseStats';
import { BarChart } from './BarChart';

export function StatsView() {
  const { dateToAlertCount, cityToAlertCount } = useStats();
  const lang = useLanguage();

  return (
    <div className='stats-view'>
      <h2>
        {langDict.CHART_TITLE_DATE_TO_ALERT_COUNT[lang]}
      </h2>
      <BarChart data={dateToAlertCount} height='40vh' horizontal />

      <h2>
        {langDict.CHART_TITLE_CITY_TO_ALERT_COUNT[lang]}
      </h2>
      <BarChart data={cityToAlertCount} height='500vh' />
    </div>
  );
}