import { SupportedLanguage, supportedLanguages } from "./hooks/UseLanguage";

type NumericString = ((`${number}` | number) & string) | number;

type LocalizedObject = Record<SupportedLanguage, string>;

interface APIcity extends LocalizedObject {
  id: number;
  area: number;
  evac_time: number;
  center: [number, number];
}

interface APIcityCollection {
  [name: string]: APIcity;
}

interface APIpolygonCollection {
  [id: NumericString]: [number, number][];
}

interface HistoricAlert {
  time: number;
  cities: string[];
  threat: number;
  isDrill: boolean;
}

interface HistoricAlertBundle {
  id: number;
  description: string | null;
  alerts: HistoricAlert[];
}

interface AlertNotif {
  notificationId: string;
  time: number;
  threat: number;
  isDrill: boolean;
  cities: string[];
}

interface Settings {
  theme: 'light' | 'dark' | 'pink';
  language: SupportedLanguage;
  markers: boolean;
  circles: boolean;
  polygons: boolean;
}

interface City extends Omit<APIcity, "area"> {
  radius: number;
  polygon: [number, number][];
}

interface History {
  id: number;
  title: string;
  threat: number;
  date: string;
  cities: string[];
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<{ outcome: 'accepted' | 'dismissed'; }>;
};

type AlertFetcher = () => Promise<string[] | undefined>;