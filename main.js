const { app, BrowserWindow, ipcMain } = require('electron')

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  mainWindow.loadFile('./renderer/index.html')
  ipcMain.on('add-music-window', (event, res) => {
    const addWindow = new BrowserWindow({
      width: 500,
      height: 400,
      webPreferences: {
        nodeIntegration: true
      },
      parent: mainWindow
    })
    addWindow.loadFile('./renderer/add.html')
    
  })
})