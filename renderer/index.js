const { ipcRenderer } = require('electron')
const { $, convertTime } = require('./helper')
const musicAudio = new Audio()

let allMusic = []
let current = {}
$('add-music').addEventListener('click', () => {
  ipcRenderer.send('add-music-window')
})

const renderMusicList = list => {
  const musicListHTML = list.reduce((html, item) => {
    return html += `<li class="row list-group-item d-flex justify-content-between align-items-center">
      <div class="col-10">
        <i class="fa fa-music mr-2"></i>
        <b>${item.fileName}</b>
      </div>
      <div class="col-2">
        <i class="fa fa-play mr-3" data-id="${item.id}"></i>
        <i class="fa fa-trash" data-id="${item.id}"></i>
      </div>
    </li>`
  }, '')
  const emptyHTML = '<div class="alert alert-primary">还没有添加音乐</div>'
  $('musicList').innerHTML = list.length ? `<ul class="list-group">${musicListHTML}</ul>` : emptyHTML
}

ipcRenderer.on('renderMusic', (event, music) => {
  allMusic = music
  renderMusicList(music)
  if (!musicAudio.paused) {
    document.querySelectorAll('.fa-play').forEach(item => {
      if (item.dataset.id === current.id) {
        item.classList.replace('fa-play', 'fa-pause')
      }
    })
  }
})
const renderPlayerHTML = (name, duration) => {
  const html = `<div class="col font-weight-bold">
                  正在播放: ${name}
                </div>
                <div class="col">
                  <span id="current-time">00 : 00</span>  / ${convertTime(duration)}
                </div>
                `
  $('player-status').innerHTML = html
}
const updateProgressHTML = (currentTime, duration) => {
  $('current-time').innerHTML = convertTime(currentTime)
  const progress = Math.floor(currentTime / duration * 100) || 0
  $('current-progress').innerHTML = `${progress}%`
  $('current-progress').style.width = `${progress}%`
  if (progress === 100) {
    $('current-time').innerHTML = '00 : 00'
    $('current-progress').innerHTML = ''
    $('current-progress').style.width = '0%'
    resetIcon()

    let currentIndex
    allMusic.forEach((item, index) => {
      if (item.id === current.id) {
        currentIndex = index
      }
    })
    if (allMusic[currentIndex + 1]) {
      current = allMusic[currentIndex + 1]
      musicAudio.src = current.path
      musicAudio.play()
      document.querySelectorAll('.fa-play').forEach(item => {
        if (item.dataset.id === current.id) {
          item.classList.replace('fa-play', 'fa-pause')
        }
      })
    }
  }
}

const resetIcon = () => {
  const resetIconEle = document.querySelector('.fa-pause')
  if (resetIconEle) {
    resetIconEle.classList.replace('fa-pause', 'fa-play')
  }
}
musicAudio.addEventListener('loadedmetadata', () => {
  renderPlayerHTML(current.fileName, musicAudio.duration)
})

musicAudio.addEventListener('timeupdate', () => {
  updateProgressHTML(musicAudio.currentTime, musicAudio.duration)
})
$('musicList').addEventListener('click', e => {
  e.preventDefault()
  const { dataset, classList } = e.target
  const id = dataset && dataset.id
  if (id && classList.contains('fa-play')) {
    if (current && current.id === id) {
      musicAudio.play()
    } else {
      current = allMusic.find(item => item.id === id)
      musicAudio.src = current.path
      musicAudio.play()
      resetIcon()
      document.querySelector('.fixed-bottom').style.display = 'block';
    }
    classList.replace('fa-play', 'fa-pause') 
  } else if (id && classList.contains('fa-pause')){
    musicAudio.pause()
    classList.replace('fa-pause', 'fa-play')
  } else if (id && classList.contains('fa-trash')) {
    if (id === current.id) {
      current = {}
      musicAudio.pause()
      document.querySelector('.fixed-bottom').style.display = 'none';
    } 
    ipcRenderer.send('delete-music', id)
  }
})

$('progress').addEventListener('click', e => {
  const setPrecent = e.offsetX / $('progress').clientWidth
  const setProgress = Math.floor(setPrecent * 100)
  console.log(setProgress)
  $('current-progress').innerHTML = `${setProgress}%`
  $('current-progress').style.width = `${setProgress}%`
  musicAudio.currentTime = musicAudio.duration * setPrecent
})