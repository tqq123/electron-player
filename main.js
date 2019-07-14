const CreateWindow =  require('./CreateWindow')
const DataStore = require('./renderer/MusicDataStore')
const { app, ipcMain, dialog } = require('electron')

const myStore = new DataStore({name: 'music'})

let mainWindow
let addWindow
app.on('ready', () => {
  mainWindow = new CreateWindow({}, './renderer/index.html')
  mainWindow.webContents.on('did-finish-load', (event) => {   
    event.sender.send('renderMusic', myStore.getTracks())
  })
  ipcMain.on('add-music-window', (event, res) => {
    addWindow = new CreateWindow({
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
  ipcMain.on('add-music-file', (event, data) => {
    const updateMusic = myStore.addTracks(data).getTracks()
    mainWindow.send('renderMusic', updateMusic)
    addWindow.close()
  })
  ipcMain.on('delete-music', (event, data) => {
    const updateMusic = myStore.deleteTracks(data).getTracks()
    mainWindow.send('renderMusic', updateMusic)
  })
})