const { ipcRenderer } = require('electron')
const { $ } = require('./helper')
const path = require('path')

let musicFilesPath = []
$('select-music').addEventListener('click', () => {
  ipcRenderer.send('open-music-file')
})

$('add-music').addEventListener('click', () => {
  ipcRenderer.send('add-music-file', musicFilesPath)
})

const renderListHTML = pathes => {
  const musicList = $('music-list')
  const musicItemsHTML = pathes.reduce((html, music) => {
    return html += `<li class="list-group-item">${path.basename(music)}</li>`
  }, '')
  musicList.innerHTML = `<ul class="list-group">${musicItemsHTML}</ul>`
}

ipcRenderer.on('selected-file', (event, path) => {
  

  if (Array.isArray(path)) {
    renderListHTML(path)
    musicFilesPath = path
  }
})