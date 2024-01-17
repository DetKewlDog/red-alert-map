const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

export function useSettings() {
  const getSettings = () => {
    return Object.fromEntries(
      Object.entries({
        'theme': () => darkMode,
        'markers': () => true,
        'circles': () => false,
        'polygons': () => true,
      }).map(([name, getDefaultValue]) =>
        [name, JSON.parse(localStorage.getItem(name)) ?? getDefaultValue()]
      )
    )
  }

  const setSettings = settings => {
    Object.entries(settings)
      .forEach(setting => localStorage.setItem(...setting));
  }
  
  return [getSettings, setSettings];
}