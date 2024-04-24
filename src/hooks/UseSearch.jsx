import { useState, useEffect } from 'react';
import APIAccess from '../services/APIAccess';
import { useLanguage } from './UseLanguage';

export function useSearch() {
  let [names, setNames] = useState([]);
  let [cities, setCities] = useState({});
  const lang = useLanguage();
  
  useEffect(() => {
    setNames(
      Object.values(APIAccess.cities).map(
        city => city[lang]
      )
    );
    setCities(APIAccess.cities);
  }, []);
  
  return [names, cities];
}