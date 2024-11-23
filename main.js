const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('path')

//console.log('App Started');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, './preload.js')
    }
  })
  
  win.webContents.openDevTools()
  // for in console log: 
  // ELECTRON_ENABLE_LOGGING=rue npx electron .

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  //ipcMain.handle('ping', () => 'pong')
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})