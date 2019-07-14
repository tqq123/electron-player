const Store = require('electron-store')
const uuid = require('uuid')
const path = require('path')

class DataStore extends Store {
  constructor(props) {
    super(props)
    this.tracks = [
      {
        id: uuid(),
        path: 'http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/C400004AeIvh4ML0Bz.m4a?guid=1971402826&vkey=CE1C95E7E487A72E9FFE6C5D472845389BA673935AB11F2398A6FEC38953EEEA133B01F9F778D9FA72D83FF9B64111F801F20257887C6D88&uin=0&fromtag=38',
        fileName: '需要人陪'
      },
      {
        id: uuid(),
        path: 'http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/C400000KZlmK3nklnD.m4a?guid=1971402826&vkey=5E597CB8F094F4E50B8EF9D94423083D392247005FC1DB6E802F892A1F32B6AC360665772D3072C0EC0371F11B761CFC3F53BE49D18D499D&uin=0&fromtag=38',
        fileName: '好心分手'
      },
      {
        id: uuid(),
        path: 'http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/C400002HsogO0iKhf2.m4a?guid=1971402826&vkey=5591C6CC9D4482CE612600DDAC9B0309835CE219655240097864B07A417820C82FAD7EB6FB4F6FA6F9C62909E159BFB6D085CF34CC96EEE5&uin=0&fromtag=38',
        fileName: '爱一点'
      },
      {
        id: uuid(),
        path: 'http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/C400004OhZs82CZXfA.m4a?guid=1971402826&vkey=87A38ECC9773ABC2F04EDF137848D964DAC875378E4D678427C0DFD59160C65C37224B8F4BFF075585987F68E649B2A6FD547E34D1F241A5&uin=0&fromtag=38',
        fileName: '你不知道的事'
      },
      {
        id: uuid(),
        path: 'http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/C400004O1DHG4MjYOi.m4a?guid=1971402826&vkey=FC4F5DCF73EF00051DDA8C849A8802591E0266D2487B42FA18C24C35590B980AAA5F983FCBA38178FD2C550CBD427770EA76484967314C7E&uin=0&fromtag=38',
        fileName: '大城小爱'
      },
      {
        id: uuid(),
        path: 'http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/C400001Fk0YJ2hiNgC.m4a?guid=1971402826&vkey=467EB47D26B4A87424FFCFB9A36387BCAE540458E19FB09984AC292E5F4EED3DF858F4D2D0186EB2D9395CE1D4147842C47367F38146E4D9&uin=0&fromtag=38',
        fileName: '心跳'
      },
    ]
    this.saveTracks()
  }
  saveTracks() {
    this.set('tracks', this.tracks)
    return this
  }

  getTracks() {
    return this.get('tracks')
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
  deleteTracks(id) {
    this.tracks = this.tracks.filter(item => item.id !== id)
    return this.saveTracks()
  }
}

module.exports = DataStore