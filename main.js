const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron')
const path = require('path')

function createWindow() {
    let win = new BrowserWindow({
        width: 250,
        height: 440,
        frame: false,
        resizable: false,
        icon: __dirname + './favicon.png',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.removeMenu()
    win.loadFile('index.html')

    ipcMain.handle('dark-mode:toggle', () => {
        if (nativeTheme.shouldUseDarkColors) {
            nativeTheme.themeSource = 'light'
        }
        else {
            nativeTheme.themeSource = 'dark'
        }
        return nativeTheme.shouldUseDarkColors
    })

    ipcMain.handle('dark-mode:system', () => {
        nativeTheme.themeSource = 'system'
    })

    ipcMain.handle('minimizeApp', () => {
        win.minimize()
    })

    win.webContents.setWindowOpenHandler(({ url }) => {
        require('electron').shell.openExternal(url)
        return { action: 'deny' }
    })
}

app.on('ready', createWindow)