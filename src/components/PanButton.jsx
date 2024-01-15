import { Button } from "./Button";
import APIAccess from "../services/APIAccess";

const THREAT_ICONS = [
  'rocket',
  'flask',
  'user-ninja',
  'wave-square',
  'water',
  'plane',
  'radiation',
  'skull',
  'triangle-exclamation',
  'bell'
];

export function PanButton({ location, setLocation }) {
  if (APIAccess.threat == -1) {
    return undefined;
  }
  
  return (
    <Button 
      size="large" 
      icon={`fas fa-${THREAT_ICONS[APIAccess.threat]}`} 
      rounded 
      onClick={() => setLocation({ ...location })}
    />
  );
}