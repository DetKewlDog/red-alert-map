import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";

export function ThemeProvider({ darkMode }) {
  const [theme, setTheme] = useState(darkMode ? 'dark' : 'light');

  const map = useMap();

	useEffect(() => {
		map.on('overlayadd', e => {
      if (e.name !== 'Dark Mode') return;
      setTheme('dark');
    });
    map.on('overlayremove', e => {
      if (e.name !== 'Dark Mode') return;
      setTheme('light');
    });
	}, []);

  useEffect(() => {
    document.body.setAttribute('theme', theme);
  }, [theme]);

  return null;
}