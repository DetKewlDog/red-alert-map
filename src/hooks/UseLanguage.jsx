export const supportedLanguages = [
  'he',
  'en',
  'ru',
  'ar',
  'es'
];

export const langDict = {
  ALERT_POPUP_EVAC_TIME: {
    he: 'זמן כניסה לממ"ד',
    en: 'Evacuation Time',
    ru: 'Время эвакуации',
    ar: 'وقت الإخلاء',
    es: 'Tiempo de Evacuación'
  },
  ALERT_POPUP_EVAC_TIME_FORMAT_SEC: {
    he: 'שניות',
    en: 's',
    ru: 'с',
    ar: 'دق',
    es: 's',
  },
  ALERT_POPUP_EVAC_TIME_FORMAT_MIN: {
    he: 'דקות',
    en: 'm',
    ru: 'м',
    ar: 'ثو',
    es: 'min',
  },
  ALERT_POPUP_EVAC_IMMEDIATE: {
    he: 'מיידי',
    en: 'Immediate',
    ru: 'Немедленно',
    ar: 'فوري',
    es: 'Inmediato'
  },

  MAP_LAYER_DEFAULT: {
    he: 'ברירת מחדל',
    en: 'Default',
    ru: 'По Умолчанию',
    ar: 'تقصير',
    es: 'Por Defecto'
  },
  MAP_LAYER_OSM: {
    he: 'OSM',
    en: 'OSM',
    ru: 'OSM',
    ar: 'OSM',
    es: 'OSM',
  },
  MAP_LAYER_TERRAIN: {
    he: 'מפה פיזית',
    en: 'Terrain',
    ru: 'Физкарта',
    ar: 'خريطة جغرافية',
    es: 'Mapa físico'
  },
  MAP_LAYER_SATELLITE: {
    he: 'מפת לוויין',
    en: 'Satellite',
    ru: 'Спутниковая Карта',
    ar: 'خريطة القمر الصناعي',
    es: 'Mapa Satelital'
  },

  MENU_REALTIME: {
    he: 'זמן אמת',
    en: 'Real Time',
    ru: 'Реальном Времени',
    ar: 'الآن',
    es: 'Tiempo Real'
  },
  MENU_HISTORY: {
    he: 'היסטוריה',
    en: 'History',
    ru: 'История',
    ar: 'تاريخ',
    es: 'Historia'
  },
  MENU_SEARCH: {
    he: 'חיפוש',
    en: 'Search',
    ru: 'Поиск',
    ar: 'بحث',
    es: 'Búsqueda'
  },
  MENU_STATISTICS: {
    he: 'סטטיסטיקות',
    en: 'Statistics',
    ru: 'Статистики',
    ar: 'إحصاءات',
    es: 'Estadísticas'
  },
  MENU_SETTINGS: {
    he: 'הגדרות',
    en: 'Settings',
    ru: 'Настройки',
    ar: 'إعدادات',
    es: 'Configuración'
  },
  MENU_INSTALL: {
    he: 'התקנה',
    en: 'Install',
    ru: 'Установить',
    ar: 'تثبيت',
    es: 'Instalar'
  },

  SEARCH_PLACEHOLDER_CITY_NAME: {
    he: 'הזן שם עיר...',
    en: 'Enter a city name...',
    ru: 'Введите название города...',
    ar: 'أدخل اسم المدينة...',
    es: 'Ingresa el nombre de la ciudad...'
  },

  TOAST_SUMMARY_SAVED_SETTINGS: {
    he: 'השינויים נשמרו',
    en: 'Changes Applied',
    ru: 'Изменения Применены',
    ar: 'تم تطبيق التغييرات',
    es: 'Cambios Aplicados'
  },
  TOAST_DETAIL_SAVED_SETTINGS: {
    he: 'השינויים שלך נשמרו!',
    en: 'Your changes have been saved!',
    ru: 'Ваши изменения сохранены!',
    ar: 'تم حفظ التغييرات الخاصة بك!',
    es: '¡Tus cambios han sido guardados!'
  },

  TOAST_SUMMARY_RESET_SETTINGS: {
    he: 'איפוס הגדרות',
    en: 'Reset Settings',
    ru: 'Сбросить Настройки',
    ar: 'إعادة ضبط الإعدادات',
    es: 'Restablecer Configuración'
  },
  TOAST_DETAIL_RESET_SETTINGS: {
    he: 'הערכים ברירת המחדל של הגדרותיך שוחזרו!',
    en: 'Your settings\' default values have been restored!',
    ru: 'Значения настроек по умолчанию восстановлены!',
    ar: 'تمت استعادة قيم الإعدادات الافتراضية الخاصة بك!',
    es: '¡Se han restaurado los valores predeterminados de tus ajustes!'
  },

  DIALOG_HEADER_SAVE_SETTINGS: {
    he: 'שמור שינויים',
    en: 'Save Changes',
    ru: 'Сохранить Изменения',
    ar: 'حفظ التغييرات',
    es: 'Guardar Cambios'
  },
  DIALOG_MESSAGE_SAVE_SETTINGS: {
    he: 'שמירת השינויים הללו תשכתב את ההגדרות הקודמות שלך.',
    en: 'Saving these changes will overwrite your previous settings.',
    ru: 'Сохранение этих изменений перезапишет ваши предыдущие настройки.',
    ar: 'حفظ هذه التغييرات سيقوم بالكتابة فوق إعداداتك السابقة.',
    es: 'Guardar estos cambios sobrescribirá tus ajustes anteriores.'
  },

  DIALOG_HEADER_RESET_SETTINGS: {
    he: 'אפס לברירת המחדל',
    en: 'Reset to Default',
    ru: 'Сбросить по Умолчанию',
    ar: 'إعادة تعيين للإعدادات الافتراضية',
    es: 'Restablecer Predeterminados'
  },
  DIALOG_MESSAGE_RESET_SETTINGS: {
    he: 'האם אתה בטוח שברצונך לאפס את ההגדרות לברירת המחדל?',
    en: 'Are you sure you want to reset settings to default?',
    ru: 'Вы уверены, что хотите сбросить настройки до умолчанию?',
    ar: 'هل أنت متأكد أنك تريد إعادة تعيين الإعدادات إلى الافتراضي؟',
    es: '¿Estás seguro de que quieres restablecer la configuración a los valores predeterminados?'
  },

  SETTINGS_OPTION_LABEL_THEME: {
    he: 'ערכת נושא',
    en: 'Theme',
    ru: 'Тема',
    ar: 'السمة',
    es: 'Tema'
  },
  SETTINGS_OPTION_SUMMARY_THEME: {
    he: 'עצב את מראה האפליקציה.',
    en: 'Customize the app\'s appearance.',
    ru: 'Настройка внешнего вида приложения.',
    ar: 'تخصيص مظهر التطبيق.',
    es: 'Personalizar la apariencia de la aplicación.'
  },

  SETTINGS_OPTION_LABEL_MARKERS: {
    he: 'סימני מיקום',
    en: 'Markers',
    ru: 'Маркеры',
    ar: 'علامات',
    es: 'Marcadores'
  },
  SETTINGS_OPTION_SUMMARY_MARKERS: {
    he: 'ייצוג ערים באמצעות סימני מיקום על המפה.',
    en: 'Represent cities with markers on the map.',
    ru: 'Представление городов на карте с помощью маркеров.',
    ar: 'تمثيل المدن بواسطة علامات على الخريطة.',
    es: 'Representar ciudades con marcadores en el mapa.'
  },

  SETTINGS_OPTION_LABEL_CIRCLES: {
    he: 'עיגולים',
    en: 'Circles',
    ru: 'Круги',
    ar: 'دوائر',
    es: 'Círculos'
  },
  SETTINGS_OPTION_SUMMARY_CIRCLES: {
    he: 'ייצוג ערים באמצעות שטחים עגולים על המפה.',
    en: 'Represent cities with circular regions on the map.',
    ru: 'Представление городов на карте с помощью круглых областей.',
    ar: 'تمثيل المدن بمناطق دائرية على الخريطة.',
    es: 'Representar ciudades con regiones circulares en el mapa.'
  },

  SETTINGS_OPTION_LABEL_POLYGONS: {
    he: 'שטחי ערים',
    en: 'City Areas',
    ru: 'Городские районы',
    ar: 'مناطق المدن',
    es: 'Áreas de la Ciudad'
  },
  SETTINGS_OPTION_SUMMARY_POLYGONS: {
    he: 'ייצוג ערים באמצעות הצורות שלהן על המפה.',
    en: 'Represent cities with their shapes on the map.',
    ru: 'Представление городов с их формами на карте.',
    ar: 'تمثيل المدن بأشكالها على الخريطة.',
    es: 'Representar ciudades con sus formas en el mapa.'
  },

  SETTINGS_OPTION_LABEL_LANGUAGE: {
    he: 'שפה',
    en: 'Language',
    ru: 'Язык',
    ar: 'اللغة',
    es: 'Idioma'
  },
  SETTINGS_OPTION_SUMMARY_LANGUAGE: {
    he: 'שנה את שפת האפליקציה.',
    en: 'Change the app\'s language.',
    ru: 'Изменить язык приложения.',
    ar: 'غيّر لغة التطبيق.',
    es: 'Cambiar el idioma de la aplicación.'
  },

  SETTINGS_BUTTON_SAVE: {
    he: 'שמירה',
    en: 'Save',
    ru: 'Сохранить',
    ar: 'حفظ',
    es: 'Guardar'
  },
  SETTINGS_BUTTON_RESET: {
    he: 'איפוס',
    en: 'Reset',
    ru: 'Сбросить',
    ar: 'إعادة تعيين',
    es: 'Restablecer'
  },

  THEME_NAME_LIGHT: {
    he: 'בהיר',
    en: 'Light',
    ru: 'Светлая',
    ar: 'فاتحة',
    es: 'Claro'
  },
  THEME_NAME_DARK: {
    he: 'כהה',
    en: 'Dark',
    ru: 'Тёмная',
    ar: 'داكنة',
    es: 'Oscuro'
  },
  THEME_NAME_PINK: {
    he: 'ורוד',
    en: 'Pink',
    ru: 'Розовая',
    ar: 'وردية',
    es: 'Rosa'
  },

  CHART_TITLE_DATE_TO_ALERT_COUNT: {
    he: 'אזעקות במהלך השבוע',
    en: 'Alerts over the week',
    ru: 'Оповещения в течение недели',
    ar: 'تنبيهات خلال الأسبوع',
    es: 'Alertas durante la semana'
  },
  CHART_TITLE_CITY_TO_ALERT_COUNT: {
    he: 'אזורים עם הכי הרבה אזעקות',
    en: 'Areas with the most alerts',
    ru: 'Районы с наибольшим количеством тревог',
    ar: 'المناطق التي تتلقى أكبر عدد من التنبيهات',
    es: 'Áreas con la mayor cantidad de alertas'
  },

  VIEW_TITLE_HISTORY: {
    he: 'היסטוריית אזעקות',
    en: 'Alerts History',
    ru: 'История Оповещений',
    ar: 'سجل التنبيهات',
    es: 'Historial de Alertas'
  },
  VIEW_TITLE_SEARCH: {
    he: 'חיפוש',
    en: 'Search',
    ru: 'Поиск',
    ar: 'بحث',
    es: 'Búsqueda'
  },
  VIEW_TITLE_SETTINGS: {
    he: 'הגדרות',
    en: 'Settings',
    ru: 'Настройки',
    ar: 'إعدادات',
    es: 'Configuración'
  },
  VIEW_TITLE_STATISTICS: {
    he: 'סטטיסטיקות',
    en: 'Statistics',
    ru: 'Статистики',
    ar: 'إحصاءات',
    es: 'Estadísticas'
  },

  CONFIRM_DIALOG_ACCEPT: {
    he: 'כן',
    en: 'Yes',
    ru: 'Да',
    ar: 'نعم',
    es: 'Sí'
  },
  CONFIRM_DIALOG_REJECT: {
    he: 'לא',
    en: 'No',
    ru: 'Нет',
    ar: 'لا',
    es: 'No'
  },

  NO_RESULTS_FOUND: {
    he: 'לא נמצאו תוצאות',
    en: 'No results found',
    ru: 'Результаты не найдены',
    ar: 'لم يتم العثور على نتائج',
    es: 'No se encontraron resultados'
  },
  SETTINGS_DROPDOWN_PLACEHOLDER_SELECT: {
    he: 'בחר',
    en: 'Select',
    ru: 'Выберите',
    ar: 'اختر',
    es: 'Seleccionar'
  }
}

export function useLanguage() {
  const savedLang = localStorage.getItem('language');
  const navigatorLang = navigator.language;

  if (savedLang && supportedLanguages.includes(savedLang)) {
    return savedLang;
  }

  return supportedLanguages.includes(navigatorLang)
    ? navigatorLang
    : 'en';
}