import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import APIAccess from './services/APIAccess';


APIAccess.initCollections();
createRoot(document.getElementById('root')).render(<App />);
