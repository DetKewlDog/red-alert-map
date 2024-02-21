import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { useSettings } from './hooks/UseSettings';
import { InstallPWA } from './util/InstallPWA';

const { getSettings } = useSettings();
const settings = getSettings();
document.body.setAttribute('theme', settings['theme']);

window.addEventListener("beforeinstallprompt", e => {
  e.preventDefault();
  InstallPWA.installPrompt = e;
});

window.addEventListener("appinstalled", () => {
  InstallPWA.installPrompt = null;
});

createRoot(document.getElementById('root')).render(<App />);
