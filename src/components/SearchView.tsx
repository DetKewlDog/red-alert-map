import { AutoComplete, AutoCompleteCompleteEvent } from 'primereact/autocomplete';
import { useSearch } from '../hooks/UseSearch';
import { Button } from './Button';
import { HistoryView } from './HistoryView';
import { langDict, useLanguage } from '../hooks/UseLanguage';
import { AlertFetcher, History } from '../types';
import React from 'react';

interface SearchViewProps {
  setAlertFetcher: React.Dispatch<React.SetStateAction<AlertFetcher>>;
  hideSearch: () => void;
}

export function SearchView({ setAlertFetcher, hideSearch } : SearchViewProps) {
  const [names, cities] = useSearch();

  const [value, setValue] = React.useState<string>('');
  const [items, setItems] = React.useState<string[]>([]);

  const [filter, setFilter] = React.useState<(value: History | undefined) => boolean>(() => () => false);

  const lang = useLanguage();

  const inputRef = React.useRef<AutoComplete>(null);

  React.useEffect(() => {
    inputRef.current?.getInput().setAttribute('dir', 'auto');
  }, []);

  const getSuggestions = (e: AutoCompleteCompleteEvent) => {
    const query = e.query.toLowerCase();
    setItems(names.filter(name => name.toLowerCase().startsWith(query)).slice(0, 10).sort());
  }

  const searchCity = () => {
    setFilter(() =>
      (alert: History | undefined) =>
        alert!.cities
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
          placeholder={langDict.SEARCH_PLACEHOLDER_CITY_NAME[lang]}
          ref={inputRef}
          pt={{ panel: { className: 'pointer-events-none' } }}
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