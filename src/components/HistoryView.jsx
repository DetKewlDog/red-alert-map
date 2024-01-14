import { DataView } from 'primereact/dataview';
import { Card } from 'primereact/card';
import { ScrollPanel } from 'primereact/scrollpanel';

import useAlertHistory from '../hooks/UseAlertHistory';
import APIAccess from '../services/APIAccess';

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
    en: "Suspected Terrorist infiltration",
  },
  {
    he: "רעידת אדמה",
    en: "Earthquake",
  },
  {
    he: "חשש לצונאמי",
    en: "Suspected Tsunami Imminent",
  },
  {
    he: "חדירת כלי טיס עוין",
    en: "Hostile Aircraft Intrusion",
  },
  {
    he: "חשש לאירוע רדיולוגי",
    en: "Suspected Radiological Incident",
  },
  {
    he: "ירי בלתי קונבנציונלי",
    en: "Non-Conventional Missiles",
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

  const title = (
    <>
      {THREATS[threat].he}
      <br />
      {THREATS[threat].en}
    </>
  );
  const date = new Date(0);
  date.setUTCSeconds(time);

  const cityNames = [...new Set(data.alerts.flatMap(alert => alert.cities))];
  const cities = cityNames.map(city => APIAccess.getPosition(city));
  const citiesHe = cities.map(city => city.name);
  const citiesEn = cities.map(city => city.name_en);

  return (
    <Card title={title} subTitle={date.toLocaleString('he-IL')}>
      {citiesHe.join(' | ')}
      <br />
      <br />
      {citiesEn.join(' | ')}
    </Card>
  );
}

export function HistoryView() {
  const history = useAlertHistory();
  
  return (
    <DataView value={history} itemTemplate={HistoryCard} />
  );
}

