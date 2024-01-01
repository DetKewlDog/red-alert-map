import { LayerGroup, LayersControl } from "react-leaflet";

export function AlertLayer({ name, alerts, alertTemplate, checked=false }) {
  return (
    <LayersControl.Overlay name={name} checked={checked}>
      <LayerGroup>
        {alerts.map((alert, index) => (
          <div key={index}>
            {new alertTemplate(alert).render()}
          </div>
        ))}
      </LayerGroup>
    </LayersControl.Overlay>
  );
}