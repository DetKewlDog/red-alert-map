import { LayerGroup } from "react-leaflet";

export function AlertLayer({ alerts, alertTemplate }) {
  return (
    <LayerGroup>
      {alerts.map((alert, index) => (
        <div key={index}>
          {new alertTemplate(alert).render()}
        </div>
      ))}
    </LayerGroup>
  );
}