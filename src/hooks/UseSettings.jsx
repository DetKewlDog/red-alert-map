const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
let setSettings = undefined;

export function useSettings(callbackFunc) {
  if (!setSettings && callbackFunc) {
    setSettings = callbackFunc;
  }

  const getSettingValue = (name) => {
    let val = localStorage.getItem(name);
    try {
      val = JSON.parse(val);
    } catch { }
    return val;
  }

  const getSettings = () => {
    return Object.fromEntries(
      Object.entries({
        'theme': () => darkMode ? 'dark' : 'light',
        'markers': () => true,
        'circles': () => false,
        'polygons': () => true,
      }).map(([name, getDefaultValue]) =>
        [name, getSettingValue(name) ?? getDefaultValue()]
      )
    )
  }

  const updateSettings = settings => {
    Object.entries(settings)
      .forEach(setting => localStorage.setItem(...setting));
    setSettings?.(settings);
  }

  return { getSettings: getSettings, updateSettings: updateSettings };
}