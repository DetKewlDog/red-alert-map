import { useEffect, useRef, useState } from "react";
import { useSettings } from "../hooks/UseSettings";
import { Setting } from "./Setting";

import { Toast } from 'primereact/toast';
import { Checkbox } from 'primereact/checkbox';
import { Button } from "./Button";

export function SettingsMenu() {
  const [getSettings, setSettings] = useSettings();
  let [state, setState] = useState(getSettings());
  const toast = useRef(null);

  const showSuccess = () => {
    toast.current.show({ severity: 'success', summary: 'Changes Applied', detail: 'Your new settings have been saved!', life: 3000 });
  }

  const setSetting = (name, value) => setState({ ...state, [name]: value });

  const SettingsCheckbox = ({ name }) => (
    <Checkbox name={name} onChange={e => setSetting(name, e.checked)} checked={state[name]} />
  );

  const options = [
    {
      label: "Markers",
      description: "...",
      component: <SettingsCheckbox name='markers' />
    },
    {
      label: "Circles",
      description: "...",
      component: <SettingsCheckbox name='circles' />
    },
    {
      label: "Polygons",
      description: "...",
      component: <SettingsCheckbox name='polygons' />
    }
  ];


  return (
    <div className="settings-menu">
      <Toast ref={toast} />
      {options.map((setting, index) => (
        <Setting key={index} index={index} {...setting} />
      ))}
      <Button onClick={() => { setSettings(state); showSuccess(); }}>Save</Button>
    </div>
  );
}