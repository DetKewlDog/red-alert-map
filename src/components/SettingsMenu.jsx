import { Setting } from "./Setting";

import { Checkbox } from 'primereact/checkbox';

export function SettingsMenu() {
  const settings = [
    { label: "Setting", description: "Lorem ipsum", component: <Checkbox checked /> }
  ];

  return (
    <>
      {settings.map((setting, index) => (
        <Setting key={index} {...setting} />
      ))}
    </>
  );
}