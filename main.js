const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
function createWindow() {
    const window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, '/renderer/js/preload.js')
        }
    })
    window.loadFile('./renderer/index.html')
}


// app.on('ready', () => {
//     createWindow()
// })
app.whenReady().then(() => {
    createWindow()
    
    ipcMain.handle('ping', () => 'pong')
    
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
      }
    })
  })

app.on('window-all-closed', () => {
    if( process.platform !== 'darwin' ) app.quit()
})
