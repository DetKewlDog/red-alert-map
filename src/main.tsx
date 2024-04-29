import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { useSettings } from './hooks/UseSettings';
import { InstallPWA } from './util/InstallPWA';
import { BeforeInstallPromptEvent } from './types';

const { getSettings } = useSettings();
const settings = getSettings();
document.body.setAttribute('theme', settings['theme']);
document.body.setAttribute('language', settings['language']);

window.addEventListener("beforeinstallprompt", (e: Event) => {
  e.preventDefault();
  InstallPWA.installPrompt = e as BeforeInstallPromptEvent;
});

window.addEventListener("appinstalled", () => {
  InstallPWA.installPrompt = null;
});

createRoot(document.getElementById('root')!).render(<App />);
