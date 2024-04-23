import { useEffect, useRef, useState } from "react";
import { useSettings } from "../hooks/UseSettings";
import { Setting } from "./Setting";

import { DataView } from 'primereact/dataview';
import { Toast } from 'primereact/toast';
import { Checkbox } from 'primereact/checkbox';
import { Dropdown } from 'primereact/dropdown';
import { Button } from "./Button";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

export function SettingsMenu() {
  const { getSettings, updateSettings, resetSettings } = useSettings();
  let [state, setState] = useState(getSettings());
  const toast = useRef(null);

  const toastSavedSettings = () => {
    toast.current.show({
      severity: 'success',
      summary: 'Changes Applied',
      detail: 'Your changes have been saved!',
      life: 3000
    });
  }

  const toastResetSettings = () => {
    toast.current.show({
      severity: 'success',
      summary: 'Settings Reset',
      detail: 'Settings have been reset to their default values!',
      life: 3000
    });
  }

  const applySaveSettings = () => {
    updateSettings(state);
    toastSavedSettings();
  }

  const applyResetSettings = () => {
    resetSettings();
    setState(getSettings());
    toastResetSettings();
  }

  const confirmSaveSettings = () => {
    confirmDialog({
      message: 'Saving these changes will overwrite your previous settings.',
      header: 'Save Changes',
      icon: 'pi pi-exclamation-triangle',
      defaultFocus: 'accept',
      accept: applySaveSettings
    });
  };

  const confirmResetSettings = () => {
    confirmDialog({
      message: 'Are you sure you want to reset settings to default?',
      header: 'Reset to Default',
      icon: 'pi pi-exclamation-triangle',
      defaultFocus: 'accept',
      accept: applyResetSettings
    });
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
      value={state[name]}
      onChange={(e) => setSetting(name, e.value)}
      options={options}
      placeholder={`Select ${name}`}
    />
  );

  const options = [
    {
      label: "Theme",
      description: "Customize the app's appearance.",
      component: <SettingsDropdown name='theme' options={['light', 'dark', 'pink']} />
    },
    {
      label: "Markers",
      description: "Represent cities with markers on the map.",
      component: <SettingsCheckbox name='markers' />
    },
    {
      label: "Circles",
      description: "Represent cities with circular regions on the map.",
      component: <SettingsCheckbox name='circles' />
    },
    {
      label: "Polygons",
      description: "Represent cities with boundary polygons on the map.",
      component: <SettingsCheckbox name='polygons' />
    }
  ];

  const applySettingsRealtime = (settings) => {
    document.body.setAttribute('theme', settings['theme']);
  }

  useEffect(() => {
    applySettingsRealtime(state);
    return () => applySettingsRealtime(getSettings());
  }, [state]);

  return (
    <div className="settings-menu">
      <Toast ref={toast} />
      <ConfirmDialog />
      <DataView value={options} itemTemplate={Setting} />
      <div>
        <Button onClick={confirmSaveSettings}>Save</Button>
        <Button onClick={confirmResetSettings}>Reset</Button>
      </div>
    </div>
  );
}