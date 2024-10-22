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
    const areas = cities.reduce<Record<string, string[]>>((acc, city) => {
      const area = city!.area[language];
      return {
        ...acc,
        [area]: [...(acc[area] ?? []), city![language]]
      };
    }, {});

    return {
      id: data.id,
      title,
      threat,
      date: date.toLocaleString('he-IL'),
      areas,
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

  const newHistory = React.useMemo(() => calculateHistory(history, language), [history]);

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

  const HistoryCard = ({ id, title, threat, date, areas }: History) => {
    return (
      <Card
        onClick={() => enabled && setFetcher(id, threat)}
        title={title}
        subTitle={date}
      >
        {Object.entries(areas).sort((a, b) => a[0].localeCompare(b[0])).map(([area, cities], k1) => (
          <Card title={area} key={k1}>
            {[...cities].sort().map((city, k2) => <Chip label={city} key={k2} />)}
          </Card>
        ))}
      </Card>
    );
  }

  return (
    <DataView
      value={newHistory.filter(historyFilter)}
      itemTemplate={HistoryCard}
      emptyMessage={langDict.NO_RESULTS_FOUND[language]}
    />
  );
}

