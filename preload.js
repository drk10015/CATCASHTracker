const { contextBridge, ipcRenderer } = require('electron')
// the above is not loading the import correcytly and says that the module not found and it is in the same directory as this file
const { Server } = require("./server/Server.js")
const mysql = require('mysql2');
const path = require('path')
contextBridge.exposeInMainWorld('ipcComms', {
    dormView: () => ipcRenderer.send("openDormView"),
    homeView: () => ipcRenderer.send("openHomeView"),
    storeView: () => ipcRenderer.send("openStoreView"),
    studentView: () => ipcRenderer.send("openStudentView"),

})
contextBridge.exposeInMainWorld('node', {
    getSinstance: () => {
        return new Server(mysql);
    }
})

contextBridge.exposeInMainWorld('constants', {
    k: {
        filepaths: {
            views: path.join(__dirname, "../views/"),
            bootstrap: path.join(__dirname, "../bootstrap-5.0.2-dist/"),
            assets: path.join(__dirname, "../assets/")
        },
        names: {
            title: "Temp Title",
        }
    },
})