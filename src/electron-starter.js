const electron = require('electron');
const app = electron.app;
const path = require("path");
const url = require("url");
const BrowserWindow = electron.BrowserWindow;
let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow();
    mainWindow.maximize();
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '../public/index.html'),
        protocol: 'file:',
        slashes: true
    }));
    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
});