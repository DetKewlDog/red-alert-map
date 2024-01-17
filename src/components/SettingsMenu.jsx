import { useEffect, useRef, useState } from "react";
import { useSettings } from "../hooks/UseSettings";
import { Setting } from "./Setting";

import { DataView } from 'primereact/dataview';
import { Toast } from 'primereact/toast';
import { Checkbox } from 'primereact/checkbox';
import { Dropdown } from 'primereact/dropdown';
import { Button } from "./Button";

export function SettingsMenu() {
  const { getSettings, updateSettings } = useSettings();
  let [state, setState] = useState(getSettings());
  const toast = useRef(null);

  const showSuccess = () => {
    toast.current.show({
      severity: 'success',
      summary: 'Changes Applied',
      detail: 'Your settings have been saved!',
      life: 3000
    });
  }

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
      description: "Display cities with markers on the map.",
      component: <SettingsCheckbox name='markers' />
    },
    {
      label: "Circles",
      description: "Display cities with circular regions on the map.",
      component: <SettingsCheckbox name='circles' />
    },
    {
      label: "Polygons",
      description: "Represent cities with boundary polygons on the map.",
      component: <SettingsCheckbox name='polygons' />
    }
  ];

  const applySettings = (settings) => {
    document.body.setAttribute('theme', settings['theme']);
  }

  useEffect(() => {
    applySettings(state);
    return () => applySettings(getSettings());
  }, [state]);

  return (
    <div className="settings-menu">
      <Toast ref={toast} />
      <DataView value={options} itemTemplate={Setting} />
      <Button onClick={() => { updateSettings(state); showSuccess(); }}>Save</Button>
    </div>
  );
}