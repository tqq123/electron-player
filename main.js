const CreateWindow =  require('./CreateWindow')
const { app, ipcMain, dialog } = require('electron')

let mainWindow
app.on('ready', () => {
  mainWindow = new CreateWindow({}, './renderer/index.html')
  ipcMain.on('add-music-window', (event, res) => {
    const addWindow = new CreateWindow({
      width: 500,
      height: 400,
      parent: mainWindow,
    },'./renderer/add.html')
  })
  ipcMain.on('open-music-file', event => {
    dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections'],
      filters: [
        { name: 'Music', extensions: ['mp3']}
      ]
    }, files => {
      event.sender.send('selected-file', files)
    })
  })
})