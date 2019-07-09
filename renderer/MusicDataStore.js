const Store = require('electron-store')
const uuid = require('uuid')
const path = require('path')

class DataStore extends Store {
  constructor(props) {
    super(props)
    this.tracks = this.get('tracks') || []
  }
  saveTracks() {
    this.set('tracks', this.tracks)
    return this
  }

  getTracks() {
    return this.get('tracks') || []
  }

  addTracks(tracks) {
    const tracksWithProps = tracks.map(track => {
      return {
        id: uuid(),
        path: track,
        fileName: path.basename(track)
      }
    }).filter(track => {
      const currentTracksPath = this.getTracks().map(track => track.path)
      return currentTracksPath.indexOf(track.path) < 0
    })
    this.tracks = [...this.tracks, ...tracksWithProps]
    return this.saveTracks()
  }
}

module.exports = DataStore