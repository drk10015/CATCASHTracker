const { app, BrowserWindow, ipcMain } = require('electron')
const { k } = require("./utils/constants");
const path = require('path')




function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 1000,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      sandbox: false,
    }
  })
  ipcMain.on("openDormView", (event) => {
    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents);
    win.loadFile(k.filepaths.views + 'dormView.html');
  });
  ipcMain.on("openHomeView", (event) => {
    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents);
    win.loadFile(k.filepaths.views + 'index.html');
  });
  ipcMain.on("openStoreView", (event) => {
    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents);
    win.loadFile(k.filepaths.views + 'storeView.html');
  });
  ipcMain.on("openStudentView", (event) => {
    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents);
    win.loadFile(k.filepaths.views + 'studentView.html');
  });

  win.loadFile("./views/index.html")
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})







