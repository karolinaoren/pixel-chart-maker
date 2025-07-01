import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Menu handlers
  onMenuNew: (callback) => ipcRenderer.on('menu-new', callback),
  onMenuSave: (callback) => ipcRenderer.on('menu-save', callback),
  onMenuClear: (callback) => ipcRenderer.on('menu-clear', callback),
  
  // File operations
  showSaveDialog: () => ipcRenderer.invoke('show-save-dialog'),
  saveFile: (filePath, buffer) => ipcRenderer.invoke('save-file', filePath, buffer),
  
  // Remove listeners
  removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel)
});