import { app, BrowserWindow, globalShortcut } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    webPreferences: {webSecurity: false},
    height: 788,
    useContentSize: true,
    width: 1200
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.on('focus', () => {
    globalShortcut.register('CommandOrControl+F', function () {
      if (mainWindow && mainWindow.webContents) {
        mainWindow.webContents.send('on-find', '')
      }
    })
  })
  mainWindow.on('blur', () => {
    globalShortcut.unregister('CommandOrControl+F')
  })

  // mainWindow.webContents.openDevTools()
}

app.on('ready', () => {
  require('./server.js')
  createWindow()

})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
  globalShortcut.unregister('CommandOrControl+F')
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
