import { isMobile } from 'react-device-detect';

import { Sidebar } from './Sidebar';
import { Button } from './Button';

import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { PanButton } from './PanButton';
import { HistoryView } from './HistoryView';
import { Menu } from './Menu';
import APIAccess from '../services/APIAccess';
import { SettingsMenu } from './SettingsMenu';
import { SearchView } from './SearchView';
import { StatsView } from './StatsView';
import { langDict, useLanguage } from '../hooks/UseLanguage';
import { AlertFetcher, City } from '../types';
import React from 'react';

interface UILayerProps {
  setAlertFetcher: React.Dispatch<React.SetStateAction<AlertFetcher>>;
  alertedCities: City[];
}

export function UILayer({ setAlertFetcher, alertedCities } : UILayerProps) {
  const [ menuVisible     , setMenuVisible     ] = React.useState(false);
  const [ historyVisible  , setHistoryVisible  ] = React.useState(false);
  const [ settingsVisible , setSettingsVisible ] = React.useState(false);
  const [ statsVisible    , setStatsVisible    ] = React.useState(false);

  const [lang, setLang] = React.useState(useLanguage());

  const showRealtime = () => {
    APIAccess.historyId = 0;
    APIAccess.threat = -1;
    setAlertFetcher(() => () => APIAccess.getRedAlerts());
  }

  const isRealTime = APIAccess.historyId === 0;

  return (
    <section id="ui" style={{ direction: 'ltr' }}>
      <Button size='large' icon="pi pi-bars" onClick={() => setMenuVisible(true)} rounded />
      <Sidebar
        title='Red Alert Map'
        visible={menuVisible}
        position='left'
        onHide={() => setMenuVisible(false)}
        headerClassName='main-sidebar'
      >
        <Menu
          hideMenu={() => setMenuVisible(false)}
          showRealtime={showRealtime}
          showHistory={() => setHistoryVisible(true)}
          showStats={() => setStatsVisible(true)}
          showSettings={() => setSettingsVisible(true)}
        />
      </Sidebar>
      <Sidebar
        title={langDict.VIEW_TITLE_HISTORY[lang]}
        visible={historyVisible}
        position={isMobile ? "bottom" : "left"}
        onHide={() => setHistoryVisible(false)}
        pt={{ root: { style: isMobile ? { 'height': '75vh' } : { 'width': '40vw' } } }}
      >
        <SearchView setAlertFetcher={setAlertFetcher} hideSearch={() => setHistoryVisible(false)} />
      </Sidebar>
      <Sidebar
        title={langDict.VIEW_TITLE_SETTINGS[lang]}
        visible={settingsVisible}
        onHide={() => { setSettingsVisible(false); setLang(useLanguage()); }}
        fullScreen
      >
        <SettingsMenu setLang={setLang} />
      </Sidebar>
      <Sidebar
        title={langDict.VIEW_TITLE_STATISTICS[lang]}
        visible={statsVisible}
        onHide={() => setStatsVisible(false)}
        fullScreen
      >
        <StatsView />
      </Sidebar>
      <section id='dock'>
        <div className="p-buttonset">
          <Button size="large" onClick={() => setStatsVisible(true)}>
            <span className='p-button-label p-c'>
              <span className='pi pi-chart-bar' style={{ margin: '8px'}} />
              {langDict.MENU_STATISTICS[lang]}
            </span>
          </Button>
          <PanButton alertedCities={alertedCities} />
          <Button size="large" onClick={() => isRealTime ? setHistoryVisible(true) : showRealtime()}>
            <span className='p-button-label p-c'>
              <span className={`pi pi-${isRealTime ? 'history' : 'sync'}`} style={{ margin: '8px'}} />
              {isRealTime ? langDict.MENU_HISTORY[lang] : langDict.MENU_REALTIME[lang]}
            </span>
          </Button>
        </div>
      </section>
    </section>
  )
}