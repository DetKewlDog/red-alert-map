import useStats from '../hooks/UseStats';
import { BarChart } from './BarChart';

export function StatsView() {
  const { dateToAlertCount, cityToAlertCount } = useStats();

  return (
    <div className='stats-view'>
      <h2>Alerts over the week</h2>
      <BarChart data={dateToAlertCount} height='50vh' horizontal />
      
      <h2>Areas with the most alerts</h2>
      <BarChart data={cityToAlertCount} height='500vh' />
    </div>
  );
}