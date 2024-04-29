import { Divider } from 'primereact/divider';

interface SettingProps {
  label: string;
  summary: string;
  component: React.ReactNode;
}

export function Setting({ label, summary, component } : SettingProps) {
  return (
    <>
      <div className="setting">
        <div className="setting-key">
          <h3>{label}</h3>
          <p>{summary}</p>
        </div>
        <div className="setting-value">
          {component}
        </div>
      </div>
      <Divider />
    </>
  )
}