const { app, BrowserWindow, Menu } = require('electron');
const fs = require('fs');
const path = require('path');

/* Load webpage into a new BrowserWindow instance */
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 650,
        icon: __dirname + '/icons/favicon.ico',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            webSecurity: false,
        }
    })

    // Load HTML and CSS(SCSS)
    win.loadFile('index.html');
    win.webContents.on('did-finish-load', () => {
        win.webContents.insertCSS(fs.readFileSync('styles/style.css', 'utf-8'));
    });

    // Remove the default menu bar
    Menu.setApplicationMenu(null);
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