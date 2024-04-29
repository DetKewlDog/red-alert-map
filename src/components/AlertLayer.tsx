import { LayerGroup } from "react-leaflet";
import { City } from "../types";
import { BaseAlert } from "./Alert";

interface AlertsLayerProps {
  alerts: City[];
  alertTemplate: typeof BaseAlert;
}

export function AlertLayer({ alerts, alertTemplate } : AlertsLayerProps) {
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