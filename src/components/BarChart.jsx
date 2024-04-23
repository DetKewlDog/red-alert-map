import {
  CChartBar,
} from '@coreui/react-chartjs'

import { Chart } from 'chart.js/auto';

export function BarChart({ data, height }) {
  const theme = document.body.getAttribute('theme');
  const computedStyle = getComputedStyle(document.body);

  const color = computedStyle.getPropertyValue(
    theme === 'pink' ? '--col-pink' : '--col-btn'
  );

  Chart.defaults.borderColor = computedStyle.getPropertyValue(
    theme === 'dark' ? '--dm-bg2' : '--wm-text'
  )
  Chart.defaults.color = theme === 'dark' ? 'white' : computedStyle.getPropertyValue('--wm-text');

  return (
    <CChartBar
      style={{
        width: '100%',
        height,
        maxHeight: height,
        paddingInline: '12px',
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: '16px',
        pointerEvents: 'none'
      }}
      options={{
        scales: {
          y: {
            display: true,
            position: 'right',
            grid: {
              display: false
            }
          },
          x: {
            position: 'top',
            ticks: {
              stepSize: 2,
            }
          }
        },
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
      data={{
        labels: data.map(i => i[0]),
        datasets: [
          {
            data: data.map(i => i[1]),
            borderColor: color,
            backgroundColor: color,
          }
        ]
      }}
    />
  );
}