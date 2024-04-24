import { useEffect, useRef, useState } from "react";
import { useSettings } from "../hooks/UseSettings";
import { Setting } from "./Setting";

import { DataView } from 'primereact/dataview';
import { Toast } from 'primereact/toast';
import { Checkbox } from 'primereact/checkbox';
import { Dropdown } from 'primereact/dropdown';
import { Button } from "./Button";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { langDict } from "../hooks/UseLanguage";
import { isUsingMobile } from "../util/IsUsingMobile";

export function SettingsMenu() {
  const { getSettings, updateSettings, resetSettings } = useSettings();
  let [state, setState] = useState(getSettings());
  const toast = useRef(null);
  let lang = state['language'];

  const openToast = (summary, detail) => {
    toast.current.show({
      severity: 'success',
      summary: langDict[summary][lang],
      detail: langDict[detail][lang],
      life: 3000
    });
  }

  const toastSavedSettings = () => {
    openToast(
      'TOAST_SUMMARY_SAVED_SETTINGS',
      'TOAST_DETAIL_SAVED_SETTINGS',
    );
  }

  const toastResetSettings = () => {
    openToast(
      'TOAST_SUMMARY_RESET_SETTINGS',
      'TOAST_DETAIL_RESET_SETTINGS',
    );
  }

  const applySaveSettings = () => {
    updateSettings(state);
    const newSettings = getSettings();
    setState(newSettings);
    lang = newSettings['language'];
    toastSavedSettings();
  }

  const applyResetSettings = () => {
    resetSettings();
    const newSettings = getSettings();
    setState(newSettings);
    lang = newSettings['language'];
    toastResetSettings();
  }

  const openDialog = (header, message, accept) => {
    confirmDialog({
      icon: 'pi pi-exclamation-triangle',
      defaultFocus: 'accept',
      acceptLabel: langDict.CONFIRM_DIALOG_ACCEPT[lang],
      rejectLabel: langDict.CONFIRM_DIALOG_REJECT[lang],
      rtl: ['he', 'ar'].includes(lang),
      draggable: false,
      header: langDict[header][lang],
      message: langDict[message][lang],
      accept: accept
    })
  }

  const confirmSaveSettings = () => {
    openDialog(
      'DIALOG_HEADER_SAVE_SETTINGS',
      'DIALOG_MESSAGE_SAVE_SETTINGS',
      applySaveSettings,
    );
  };

  const confirmResetSettings = () => {
    openDialog(
      'DIALOG_HEADER_RESET_SETTINGS',
      'DIALOG_MESSAGE_RESET_SETTINGS',
      applyResetSettings,
    );
  };

  const setSetting = (name, value) => setState({ ...state, [name]: value });

  const SettingsCheckbox = ({ name }) => (
    <Checkbox
      name={name}
      onChange={e => setSetting(name, e.checked)}
      checked={state[name]}
    />
  );

  const SettingsDropdown = ({ name, options }) => (
    <Dropdown
      name={name}
      value={options.find(i => i.name === state[name])}
      onChange={(e) => setSetting(name, e.value.name)}
      options={options}
      placeholder={`${langDict.SETTINGS_DROPDOWN_PLACEHOLDER_SELECT[lang]} ${name}`}
      optionLabel='label'
    />
  );

  const options = [
    {
      label: langDict.SETTINGS_OPTION_LABEL_THEME[lang],
      summary: langDict.SETTINGS_OPTION_SUMMARY_THEME[lang],
      component: <SettingsDropdown
        name='theme'
        options={[
          { name: 'light', label: langDict.THEME_NAME_LIGHT[lang] },
          { name: 'dark' , label: langDict.THEME_NAME_DARK [lang] },
          { name: 'pink' , label: langDict.THEME_NAME_PINK [lang] },
        ]}
      />
    },
    {
      label: langDict.SETTINGS_OPTION_LABEL_MARKERS[lang],
      summary: langDict.SETTINGS_OPTION_SUMMARY_MARKERS[lang],
      component: <SettingsCheckbox name='markers' />
    },
    {
      label: langDict.SETTINGS_OPTION_LABEL_CIRCLES[lang],
      summary: langDict.SETTINGS_OPTION_SUMMARY_CIRCLES[lang],
      component: <SettingsCheckbox name='circles' />
    },
    {
      label: langDict.SETTINGS_OPTION_LABEL_POLYGONS[lang],
      summary: langDict.SETTINGS_OPTION_SUMMARY_POLYGONS[lang],
      component: <SettingsCheckbox name='polygons' />
    },
    {
      label: langDict.SETTINGS_OPTION_LABEL_LANGUAGE[lang],
      summary: langDict.SETTINGS_OPTION_SUMMARY_LANGUAGE[lang],
      component: <SettingsDropdown
        name='language'
        options={[
          { name: 'he', label: 'עברית' },
          { name: 'en', label: 'English' },
          { name: 'ru', label: 'Русский' },
          { name: 'ar', label: 'العربية' },
          { name: 'es', label: 'Español' },
        ]}
      />
    }
  ];

  const applySettingsRealtime = (settings) => {
    document.body.setAttribute('theme', settings['theme']);
    document.body.setAttribute('language', settings['language']);
  }

  useEffect(() => {
    applySettingsRealtime(state);
    return () => applySettingsRealtime(getSettings());
  }, [state]);

  return (
    <div className="settings-menu">
      <Toast ref={toast} position='top-center' pt={{
        root: {
          style: {
            paddingTop: isUsingMobile ? '32px': '8px',
            paddingInline: '16px'
          }
        }
      }} />
      <ConfirmDialog />
      <DataView value={options} itemTemplate={Setting} />
      <div>
        <Button onClick={confirmSaveSettings}>
          {langDict.SETTINGS_BUTTON_SAVE[lang]}
        </Button>
        <Button onClick={confirmResetSettings}>
          {langDict.SETTINGS_BUTTON_RESET[lang]}
        </Button>
      </div>
    </div>
  );
}