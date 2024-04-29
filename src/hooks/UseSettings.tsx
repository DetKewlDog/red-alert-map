import { Settings } from "../types";
import { useLanguage } from "./UseLanguage";

const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
let setSettings: ((value: Settings) => void) | undefined = undefined;

export function useSettings(callbackFunc?: (value: Settings) => void) {
  if (!setSettings && callbackFunc) {
    setSettings = callbackFunc;
  }

  const getSettingValue = (name: string) : Settings[keyof Settings] | string | undefined => {
    let val = localStorage.getItem(name);
    if (!val) return undefined;
    try {
      const newVal = JSON.parse(val!);
      return newVal;
    } catch { }
    return val;
  }

  const getSettings = () => {
    return Object.fromEntries(
      Object.entries({
        'theme': () => darkMode ? 'dark' : 'light',
        'language': () => useLanguage(),
        'markers': () => true,
        'circles': () => false,
        'polygons': () => true,
      } as Record<string, () => any>).map(([name, getDefaultValue]) =>
        [name, getSettingValue(name) ?? getDefaultValue()]
      )
    ) as Settings;
  }

  const updateSettings = (settings: Settings) => {
    Object.entries(settings)
      .forEach(setting => localStorage.setItem(...setting));
    setSettings?.(settings);
  }

  const resetSettings = () => {
    localStorage.clear();
    setSettings?.(getSettings());
  }

  return { getSettings, updateSettings, resetSettings };
}