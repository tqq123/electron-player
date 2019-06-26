const { ipcRenderer } = require('electron')

document.getElementById('add-music').addEventListener('click', () => {
  ipcRenderer.send('add-music-window')
})