import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { useSettings } from './hooks/UseSettings';

const { getSettings } = useSettings();
const settings = getSettings();
document.body.setAttribute('theme', settings['theme']);

createRoot(document.getElementById('root')).render(<App />);
