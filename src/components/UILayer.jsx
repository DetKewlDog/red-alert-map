import { useState } from 'react';
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

export function UILayer({ setAlertFetcher, alertedCities }) {
  const [ menuVisible     , setMenuVisible     ] = useState(false);
  const [ historyVisible  , setHistoryVisible  ] = useState(false);
  const [ searchVisible   , setSearchVisible   ] = useState(false);
  const [ settingsVisible , setSettingsVisible ] = useState(false);

  const showRealtime = () => {
    APIAccess.historyId = 0;
    APIAccess.threat = -1;
    setAlertFetcher(() => () => APIAccess.getRedAlerts());
  }

  const isRealTime = APIAccess.historyId === 0;

  return (
    <section id="ui">
      <Button size='large' icon="pi pi-bars" onClick={() => setMenuVisible(true)} rounded />
      <Sidebar title='Red Alert' visible={menuVisible} position='left' onHide={() => setMenuVisible(false)}>
        <Menu
          hideMenu={() => setMenuVisible(false)}
          showRealtime={showRealtime}
          showHistory={() => setHistoryVisible(true)}
          showSearch={() => setSearchVisible(true)}
          showSettings={() => setSettingsVisible(true)}
        />
      </Sidebar>
      <Sidebar
        title='Alerts History'
        visible={historyVisible}
        position={isMobile ? "bottom" : "left"}
        onHide={() => setHistoryVisible(false)}
        pt={{ root: { style: isMobile ? { 'height': '75vh' } : { 'width': '40vw' } } }}
      >
        <HistoryView setAlertFetcher={setAlertFetcher} hideHistory={() => setHistoryVisible(false)} />
      </Sidebar>
      <Sidebar
        title='Search'
        visible={searchVisible}
        position={isMobile ? "bottom" : "left"}
        onHide={() => setSearchVisible(false)}
        pt={{ root: { style: isMobile ? { 'height': '75vh' } : { 'width': '40vw' } } }}
      >
        <SearchView setAlertFetcher={setAlertFetcher} hideSearch={() => setSearchVisible(false)} />
      </Sidebar>
      <Sidebar
        title='Settings'
        visible={settingsVisible}
        onHide={() => setSettingsVisible(false)}
        fullScreen
      >
        <SettingsMenu />
      </Sidebar>
      <section id='dock'>
        <div className="p-buttonset">
          <Button size="large" onClick={() => setSearchVisible(true)}>
            <span className='p-button-label p-c'>
              <span className='pi pi-search' style={{ margin: '8px'}} />
              Search
            </span>
          </Button>
          <PanButton alertedCities={alertedCities} />
          <Button size="large" onClick={() => isRealTime ? setHistoryVisible(true) : showRealtime()}>
            <span className='p-button-label p-c'>
              <span className={`pi pi-${isRealTime ? 'history' : 'sync'}`} style={{ margin: '8px'}} />
              {isRealTime ? 'History' : 'Real Time'}
            </span>
          </Button>
        </div>
      </section>
    </section>
  )
}