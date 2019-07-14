const { BrowserWindow } = require('electron') 

class CreateWindow extends BrowserWindow {
  constructor(config, fileLocation) {
    const basicConfig = {
      width: 960,
      height: 620,
      webPreferences: {
        nodeIntegration: true
      },
      show: false
    }
    const finalConfig = { ...basicConfig, ...config }
    super(finalConfig)
    this.loadFile(fileLocation)
    this.once('ready-to-show', () => {
      this.show()
    })
  }
}

module.exports = CreateWindow