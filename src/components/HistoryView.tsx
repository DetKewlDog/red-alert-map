import { DataView } from 'primereact/dataview';
import { Card } from 'primereact/card';
import { Chip } from 'primereact/chip';

import useAlertHistory from '../hooks/UseAlertHistory';
import APIAccess from '../services/APIAccess';
import { SupportedLanguage, langDict, useLanguage } from '../hooks/UseLanguage';
import { AlertFetcher, HistoricAlertBundle, History } from '../types';
import React from 'react';

const THREATS = [
  {
    he: "צבע אדום",
    en: "Red Alert",
    ru: "Цева Адом",
    ar: "اللون الأحمر",
    es: "Rojo Color",
  },
  {
    he: "אירוע חומרים מסוכנים",
    en: "Hazardous Materials Incident",
    ru: "Утечка опасных веществ",
    ar: "حادثة المواد الخطرة",
    es: "materiales peligrosos incidente",
  },
  {
    he: "חשש לחדירת מחבלים",
    en: "Suspected Terrorist infiltration",
    ru: "Подозрение на проникновение террористов",
    ar: "تسلل مخربين",
    es: "Terroristas infiltración",
  },
  {
    he: "רעידת אדמה",
    en: "Earthquake",
    ru: "Землетрясение",
    ar: "هزة أرضية",
    es: "Terremoto",
  },
  {
    he: "חשש לצונאמי",
    en: "Suspected Tsunami Imminent",
    ru: "Угроза цунами",
    ar: "تحسبا للتسونامي",
    es: "Amenaza de tsunami",
  },
  {
    he: "חדירת כלי טיס עוין",
    en: "Hostile Aircraft Intrusion",
    ru: "Проникновение беспилотного самолета",
    ar: "تسلل طائرة بدون طيار",
    es: "infiltración de aviones no tripulados",
  },
  {
    he: "חשש לאירוע רדיולוגי",
    en: "Suspected Radiological Incident",
    ru: "Радиоактивная опасность",
    ar: "حدث إشعاعي",
    es: "Radiológico Incidente",
  },
  {
    he: "ירי בלתי קונבנציונלי",
    en: "Non-Conventional Missiles",
    ru: "Неконвенциональная ракета",
    ar: "صاروخ غير تقليدي",
    es: "misil no convencional",
  },
  {
    he: "התרעה",
    en: "Alert",
    ru: "предупреждение",
    ar: "تحذير",
    es: "advertencia",
  },
  {
    he: "תרגיל פיקוד העורף",
    en: "Home Front Command Drill",
    ru: "Учения Службы Тыла",
    ar: "تمرين",
    es: "Ejercicio",
  },
];

const calculateHistory = (history : HistoricAlertBundle[], language: SupportedLanguage) => {
  return history.map(data => {
    if (data === undefined) return;
    const threats = data.alerts.map(alert => alert.threat);
    const threat = threats.sort((a, b) =>
        threats.filter(v => v === a).length
      - threats.filter(v => v === b).length
    ).pop()!;
    const times = data.alerts.map(alert => alert.time);
    const time = times.reduce((a, b) => a + b, 0) / times.length;

    const title = THREATS[threat][language];
    const date = new Date(0);
    date.setUTCSeconds(time);

    const cityNames = [...new Set(data.alerts.flatMap(alert => alert.cities))];
    const cities = cityNames.map(city => APIAccess.getCity(city));
    const names = cities.map(city => city![language]);

    return {
      id: data.id,
      title: title,
      threat: threat,
      date: date.toLocaleString('he-IL'),
      cities: names,
    } as History;
  });
}

interface HistoryViewProps {
  setAlertFetcher: React.Dispatch<React.SetStateAction<AlertFetcher>>;
  hideHistory: () => void;
  historyFilter?: (value: History | undefined) => boolean;
};

export function HistoryView({ setAlertFetcher, hideHistory, historyFilter = () => true } : HistoryViewProps) {
  let history = useAlertHistory();
  const [enabled, setEnabled] = React.useState(true);
  const language = useLanguage();

 React. useEffect(() => {

  }, [historyFilter]);

  // const newHistory = React.useMemo(() => calculateHistory(history, language), [history]);
  const newHistory = React.useMemo(() =>
    [...new Set(history.flatMap(x => x.alerts.flatMap(y => y.cities)))]
    .map(x => `${x} ${!!APIAccess.getCity(x)}`),
  [history]);

  const setFetcher = (id: number, threat: number) => {
    APIAccess.historyId = id;
    APIAccess.threat = threat;
    setAlertFetcher(() => () => APIAccess.getRedAlertsHistoryById());
    hideHistory();
    setEnabled(false);
    setTimeout(() => {
      setEnabled(true);
    }, 250);
  }

  const HistoryCard = ({ id, title, threat, date, cities } : History) => (
    <Card
      onClick={() => enabled && setFetcher(id, threat)}
      title={title}
      subTitle={date}
    >
      {cities.map((city, key) => (
        <Chip label={city} key={key} />
      ))}
    </Card>
  );

  return (
    <DataView
      value={newHistory}
      itemTemplate={x => <p>{x}</p>}
      emptyMessage={langDict.NO_RESULTS_FOUND[language]}
    />
  );
}

