import React from 'react';
import APIAccess from '../services/APIAccess';
import { HistoricAlertBundle } from '../types';

export default function useAlertHistory() {
  const [history, setHistory] = React.useState<HistoricAlertBundle[]>([]);
  
  React.useEffect(() => {
    async function fetch() {
      setHistory(await APIAccess.getRedAlertsHistory());
    }
    fetch();
  }, []);
  
  return history;
}