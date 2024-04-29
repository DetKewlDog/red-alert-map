import APIAccess from '../services/APIAccess';
import { useLanguage } from './UseLanguage';
import { City } from '../types';
import React from 'react';

export function useSearch() {
  let [names, setNames] = React.useState<string[]>([]);
  let [cities, setCities] = React.useState<Record<string, City>>({});
  const lang = useLanguage();
  
  React.useEffect(() => {
    setNames(
      Object.values(APIAccess.cities!).map(
        city => city[lang] as string
      )
    );
    setCities(APIAccess.cities!);
  }, []);
  
  return [names, cities] as [string[], Record<string, City>];
}