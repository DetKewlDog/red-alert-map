export function Setting({ label, description, component }) {
  return (
    <div className="setting">
      <div className="setting-key">
        <h3>{label}</h3>
        <p>{description}</p>
      </div>
      <div className="setting-value">
        {component}
      </div>
    </div>
  )
}