const { app, BrowserWindow } = require('electron')

/* Load webpage into a new BrowserWindow instance */
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600
    })

    win.loadFile('index.html')
}

/* Create window when app is ready */
app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

/* Quit the app when all windows are closed */
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})