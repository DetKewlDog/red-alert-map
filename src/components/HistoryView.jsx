import { DataView } from 'primereact/dataview';
import { Card } from 'primereact/card';
import { ScrollPanel } from 'primereact/scrollpanel';

import useAlertHistory from '../hooks/UseAlertHistory';

const THREATS = [
  {
    he: "צבע אדום",
    en: "Red Alert",
  },
  {
    he: "אירוע חומרים מסוכנים",
    en: "Hazardous Materials Incident",
  },
  {
    he: "חשש לחדירת מחבלים",
    en: "Fear of Terrorists infiltration",
  },
  {
    he: "רעידת אדמה",
    en: "Earthquake",
  },
  {
    he: "חשש לצונאמי",
    en: "Fear of a tsunami",
  },
  {
    he: "חדירת כלי טיס עוין",
    en: "Hostile aircraft intrusion",
  },
  {
    he: "חשש לאירוע רדיולוגי",
    en: "Fear of a Radiological incident",
  },
  {
    he: "ירי בלתי קונבנציונלי",
    en: "Non-conventional missile",
  },
  {
    he: "התרעה",
    en: "Alert",
  },
  {
    he: "תרגיל פיקוד העורף",
    en: "Home Front Command Drill",
  },
];

export function HistoryCard(data) {
  if (data === undefined) return;
  const threats = data.alerts.map(alert => alert.threat);
  const threat = threats.sort((a, b) =>
      threats.filter(v => v === a).length
    - threats.filter(v => v === b).length
  ).pop();
  const times = data.alerts.map(alert => alert.time);
  const time = times.reduce((a, b) => a + b, 0) / times.length;

  return (
    <Card title={THREATS[threat].he} subTitle={new Date(time).toLocaleString()}>
      {[...new Set(data.alerts.flatMap(alert => alert.cities))].join(', ')}
    </Card>
  );
}

export function HistoryView() {
  const history = useAlertHistory();
  
  return (
    <DataView value={history} itemTemplate={HistoryCard} />
  );
}

