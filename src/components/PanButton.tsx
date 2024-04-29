import { Button } from "./Button";
import APIAccess from "../services/APIAccess";
import { MapUtil } from "../util/MapUtil";

import { icons } from 'lucide-react';
import { City } from "../types";

const Icon = ({ name } : { name: keyof typeof icons }) => {
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
] as const;

interface PanButtonProps {
  alertedCities: City[];
}

export function PanButton({ alertedCities } : PanButtonProps) {
  if (APIAccess.threat == -1) {
    return undefined;
  }

  return (
    <Button 
      size="large" 
      rounded 
      onClick={() => MapUtil.flyToPolygons(alertedCities.map(i => i.polygon).flat(1))}
    >
      <Icon name={THREAT_ICONS[APIAccess.threat]} />
    </Button>
  );
}