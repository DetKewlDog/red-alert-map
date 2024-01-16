import { Menu as PRMenu } from 'primereact/menu';

export function Menu({ hideMenu, showRealtime, showHistory, showSearch, showSettings }) {
  const selectMenuItem = (callback) => {
    hideMenu();
    callback();
  }

  let items = [
    { 
      label: 'Real Time', 
      icon: 'sync',
      command: showRealtime
    },
    { 
      label: 'History', 
      icon: 'history',
      command: showHistory
    },
    { 
      label: 'Search', 
      icon: 'search',
      command: showSearch
    },
    { 
      label: 'Settings', 
      icon: 'cog',
      command: showSettings
    }
  ].map(item => ({ ...item, icon: 'pi pi-' + item.icon, command: () => selectMenuItem(item.command) }));

  return (
    <PRMenu model={items} />
  );
}