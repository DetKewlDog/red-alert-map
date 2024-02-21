import { AutoComplete } from 'primereact/autocomplete';
import { useEffect, useRef, useState } from 'react';
import { useSearch } from '../hooks/UseSearch';
import { Button } from './Button';
import { HistoryView } from './HistoryView';
import APIAccess from '../services/APIAccess';

export function SearchView({ setAlertFetcher, hideSearch }) {
  const [names, cities] = useSearch();
  
  const [value, setValue] = useState('');
  const [items, setItems] = useState([]);
  
  const [filter, setFilter] = useState(() => () => false);

  const inputRef = useRef(undefined);

  useEffect(() => {
    inputRef.current.getInput().setAttribute('dir', 'auto');
  }, []);

  const getSuggestions = e => {
    const query = e.query.toLowerCase();
    const suggestions = names.filter(name => name.toLowerCase().startsWith(query)).slice(0, 10).sort();
    setItems(suggestions);

    if (suggestions.length === 0) return;
    Array.from(document.querySelectorAll('.p-autocomplete-panel li')).forEach(
      item => item.setAttribute('lang', 'he')
    );
  }
  
  const searchCity = () => {
    setFilter(() =>
      alert => alert.citiesHe.concat(alert.citiesEn)
        .map(name => name.toLowerCase())
        .includes(value.toLowerCase())
    );
  }

  return (
    <>
      <span className='sidebar-header'>
        <AutoComplete
          value={value}
          suggestions={items}
          completeMethod={getSuggestions}
          onChange={e => setValue(e.value)}
          ref={inputRef}
        />
        <Button icon='pi pi-search' onClick={searchCity} rounded />
      </span>
      <HistoryView
        setAlertFetcher={setAlertFetcher}
        hideHistory={hideSearch}
        historyFilter={filter}
      />
    </>  
  );
}