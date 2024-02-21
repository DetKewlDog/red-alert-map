import { useState, useEffect } from 'react';
import APIAccess from '../services/APIAccess';

export function useSearch() {
  let [names, setNames] = useState([]);
  let [cities, setCities] = useState({});
  
  useEffect(() => {
    setNames(
      Object.entries(APIAccess.cities).flatMap(
        ([name, city]) => [name, city.name_en]
      )
    );
    setCities(APIAccess.cities);
  }, []);
  
  return [names, cities];
}