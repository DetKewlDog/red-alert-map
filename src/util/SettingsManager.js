const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

class SettingsManager {
  static #settings = undefined;
  static get settings() {
    if (!SettingsManager.#settings) {
      SettingsManager.#settings = Object.fromEntries(
        Object.entries({
          'theme'    : () => darkMode, 
          'markers'  : () => true, 
          'circles'  : () => false, 
          'polygons' : () => true, 
        }).map(
          ([ name, getDefaultValue ]) => localStorage.getItem(name) || getDefaultValue()
        )
      );
    }

    return SettingsManager.#settings;
  }

  static saveSettings(settings) {
    SettingsManager.#settings = Object.entries(settings)
      .map(setting => localStorage.setItem(...setting));
  }
}