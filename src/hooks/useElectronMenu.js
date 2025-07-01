import { useEffect } from 'react';

export const useElectronMenu = (onNew, onSave, onClear) => {
  useEffect(() => {
    if (window.electronAPI) {
      const handleMenuNew = () => onNew();
      const handleMenuSave = () => onSave();
      const handleMenuClear = () => onClear();
      
      window.electronAPI.onMenuNew(handleMenuNew);
      window.electronAPI.onMenuSave(handleMenuSave);
      window.electronAPI.onMenuClear(handleMenuClear);
      
      return () => {
        window.electronAPI.removeAllListeners('menu-new');
        window.electronAPI.removeAllListeners('menu-save');
        window.electronAPI.removeAllListeners('menu-clear');
      };
    }
  }, [onNew, onSave, onClear]);
};