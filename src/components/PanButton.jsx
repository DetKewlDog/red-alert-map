import { Button } from "./Button";
import APIAccess from "../services/APIAccess";
import { MapUtil } from "../util/MapUtil";

import { icons } from 'lucide-react';

const Icon = ({ name }) => {
  const LucideIcon = icons[name];
  return (<LucideIcon size={80} />);
}

const THREAT_ICONS = [
  'Radio',
  'Biohazard',
  'Skull',
  'Activity',
  'Waves',
  'Plane',
  'Radiation',
  'Rocket',
  'AlertTriangle',
  'RadioTower',
];

export function PanButton() {
  if (APIAccess.threat == -1) {
    return undefined;
  }

  return (
    <Button 
      size="large" 
      rounded 
      onClick={MapUtil.flyToPolygons}
    >
      <Icon name={THREAT_ICONS[APIAccess.threat]} />
    </Button>
  );
}