import { useState } from 'react';
import { isMobile } from 'react-device-detect';

import { Sidebar } from './Sidebar';
import { Button } from './Button';

import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { PanButton } from './PanButton';

export function UILayer({ setLocation }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [historyVisible, setHistoryVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);

  return (
    <section id="ui" className='ui'>
      <Button size='large' icon="pi pi-bars" onClick={() => setMenuVisible(true)} rounded />
      <Sidebar visible={menuVisible} position='left' onHide={() => setMenuVisible(false)}>
        <h2>Red Alert</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </Sidebar>
      <Sidebar 
        visible={historyVisible} 
        position={isMobile ? "bottom" : "left"} 
        onHide={() => setHistoryVisible(false)} 
        pt={isMobile && { root: { style: { 'height': '75vh' } } }}
      >
        <h2>Alerts History</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </Sidebar>
      <Sidebar 
        visible={searchVisible} 
        position={isMobile ? "bottom" : "left"} 
        onHide={() => setSearchVisible(false)} 
        pt={isMobile && { root: { style: { 'height': '75vh' } } }}
      >
        <h2>Search</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </Sidebar>
      <section>
        <div className="p-buttonset">
          <Button size="large" onClick={() => setSearchVisible(true)}>
            <span className='p-button-label p-c'>
              <span className='pi pi-search' style={{ margin: '8px'}} />
              Search
            </span>
          </Button>
          <PanButton setLocation={setLocation} />
          <Button size="large" onClick={() => setHistoryVisible(true)}>
            <span className='p-button-label p-c'>
              <span className='pi pi-history' style={{ margin: '8px'}} />
              History
            </span>
          </Button>
        </div>
      </section>
    </section>
  )
}