import { Menu as PRMenu } from 'primereact/menu';

export function Menu({ hideMenu, showRealtime, showHistory, showSearch, showSettings }) {
  const selectMenuItem = (callback) => {
    hideMenu();
    callback();
  }

  let items = [
    { 
      label: 'Real Time', 
      icon: 'pi pi-sync',
      command: showRealtime
    },
    { 
      label: 'History', 
      icon: 'pi pi-history',
      command: showHistory
    },
    { 
      label: 'Search', 
      icon: 'pi pi-search',
      command: showSearch
    },
    { 
      label: 'Settings', 
      icon: 'pi pi-cog',
      command: showSettings
    }
  ].map(item => ({ ...item, command: () => selectMenuItem(item.command) }));

  return (
    <PRMenu model={items} />
  );
}