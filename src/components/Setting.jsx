import { Divider } from 'primereact/divider';

export function Setting({ label, summary, component }) {
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