import { useState, useEffect } from 'react';
import APIAccess from '../services/APIAccess';

export default function useAlertHistory() {
  const [history, setHistory] = useState([]);
  
  useEffect(() => {
    async function fetch() {
      setHistory(await APIAccess.getRedAlertsHistory());
    }
    fetch();
  }, []);
  
  return history;
}