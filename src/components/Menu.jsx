import { Menu as PRMenu } from 'primereact/menu';
import { InstallPWA } from '../util/InstallPWA';

export function Menu({ hideMenu, showRealtime, showHistory, showSearch, showSettings }) {
  const selectMenuItem = (callback) => {
    hideMenu();
    callback();
  }

  const installApp = async () => {
    if (!InstallPWA.installPrompt) {
      return;
    }
    const result = await InstallPWA.installPrompt.prompt();
    console.log(`Install prompt was: ${result.outcome}`);
    InstallPWA.installPrompt = null;
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
  ];

  if (InstallPWA.installPrompt) {
    items.push({
      label: 'Install',
      icon: 'download',
      command: installApp
    });
  }

  items = items.map(item => ({
    ...item,
    icon: 'pi pi-' + item.icon,
    command: () => selectMenuItem(item.command)
  }));

  return (
    <PRMenu model={items} />
  );
}