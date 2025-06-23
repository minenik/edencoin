const { ipcRenderer } = require('electron');

window.blocxus = {
  generateAddress: () => ipcRenderer.invoke('generate-address'),
  getBalance: (address) => ipcRenderer.invoke('get-balance', address),
  sendTransaction: (tx) => ipcRenderer.invoke('send-transaction', tx)
};
