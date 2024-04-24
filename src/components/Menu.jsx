import { Menu as PRMenu } from 'primereact/menu';
import { InstallPWA } from '../util/InstallPWA';
import { langDict, useLanguage } from '../hooks/UseLanguage';

export function Menu({ hideMenu, showRealtime, showHistory, showSearch, showStats, showSettings }) {
  const lang = useLanguage();
  const selectMenuItem = (callback) => {
    hideMenu();
    callback();
  }

  const installApp = async () => {
    if (!InstallPWA.installPrompt) {
      return;
    }
    const result = await InstallPWA.installPrompt.prompt();
    if (result.outcome === 'dismissed') return;
    InstallPWA.installPrompt = null;
  }

  let items = [
    {
      label: langDict.MENU_REALTIME[lang],
      icon: 'sync',
      command: showRealtime
    },
    {
      label: langDict.MENU_HISTORY[lang],
      icon: 'history',
      command: showHistory
    },
    {
      label: langDict.MENU_SEARCH[lang],
      icon: 'search',
      command: showSearch
    },
    {
      label: langDict.MENU_STATISTICS[lang],
      icon: 'chart-bar',
      command: showStats
    },
    {
      label: langDict.MENU_SETTINGS[lang],
      icon: 'cog',
      command: showSettings
    },
  ];

  if (InstallPWA.installPrompt) {
    items.push({
      label: langDict.MENU_INSTALL[lang],
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