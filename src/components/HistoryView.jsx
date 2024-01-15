import { DataView } from 'primereact/dataview';
import { Card } from 'primereact/card';

import useAlertHistory from '../hooks/UseAlertHistory';
import APIAccess from '../services/APIAccess';
import { useMemo } from 'react';

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

const calculateHistory = (history) => {
  return history.map(data => {
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

    return {
      id: data.id,
      title: title,
      threat: threat,
      date: date.toLocaleString('he-IL'),
      citiesHe: citiesHe,
      citiesEn: citiesEn,
    };
  });
}

export function HistoryView({ setAlertFetcher, hideHistory }) {
  let history = useAlertHistory();
  
  history = useMemo(() => calculateHistory(history));

  const setFetcher = (id, threat) => {
    APIAccess.historyId = id;
    APIAccess.threat = threat;
    setAlertFetcher(() => () => APIAccess.getRedAlertsHistoryById());
    hideHistory();
  }

  const HistoryCard = ({ id, title, threat, date, citiesHe, citiesEn }) => (
    <Card onClick={() => setFetcher(id, threat)} title={title} subTitle={date.toLocaleString('he-IL')}>
      {citiesHe.join(' | ')}
      <br />
      <br />
      {citiesEn.join(' | ')}
    </Card>
  );

  return (
    <DataView value={history} itemTemplate={HistoryCard} />
  );
}

