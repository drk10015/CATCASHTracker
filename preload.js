const { contextBridge, ipcRenderer } = require('electron')
// the above is not loading the import correcytly and says that the module not found and it is in the same directory as this file
const { Server } = require("./server/Server.js")
const mysql = require('mysql2');
const path = require('path');
const { start } = require('repl');
let s = null
const en = new Map([["Red", -1], ["Yellow", 0], ["Green", 1]])
contextBridge.exposeInMainWorld('ipcComms', {
    dormView: () => ipcRenderer.send("openDormView"),
    homeView: () => ipcRenderer.send("openHomeView"),
    storeView: () => ipcRenderer.send("openStoreView"),
    studentView: () => ipcRenderer.send("openStudentView"),
    dormDetailView: (id) => {
        console.log("in detail view signal", id)
        ipcRenderer.send("openDormDetailView", id)
    },
    dormDetailViewLoaded: () => ipcRenderer.send("dormDetailViewLoaded"),
    dormDetailViewID: (cb) => {
        ipcRenderer.on("getDormDetailViewID", (event, id) => {
            cb(id)
            return
        })
    },
    studentDetailView: (id) => ipcRenderer.send("openStudentDetailView", id),
    studentDetailViewLoaded: () => ipcRenderer.send("studentDetailViewLoaded"),
    studentDetailViewID: (cb) => {
        ipcRenderer.on("getStudentDetailViewID", (event, id) => {
            cb(id)
            return
        })
    }

})
contextBridge.exposeInMainWorld('server', {
    connect: () => {
        s = new Server(mysql)
        s.connect()
        return s
    },
    getStudents: (s, limit, offset, cb) => {
        return s.getStudents(limit, offset, cb)
    },
    getDorms: (s, limit, offset, cb) => {
        s.getDorms(limit, offset, cb)
    },
    close: (s) => {
        s.close()
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
            title: "Cat Cash",
        },
        exampleData: {
            "Day1": ["Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green"],
            "Day2": ["Green", "Yellow", "Red", "Yellow", "Green", "Yellow", "Green", "Yellow", "Yellow", "Green", "Red", "Yellow", "Red", "Green"],
            "Day3": ["Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green"],
            "Day4": ["Yellow", "Yellow", "Yellow", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green"],
            "Day5": ["Yellow", "Green", "Red", "Green", "Red", "Yellow", "Yellow", "Green", "Red", "Yellow", "Green", "Yellow", "Green", "Red"],
            "Day6": ["Red", "Yellow", "Green", "Red", "Green", "Yellow", "Yellow", "Green", "Red", "Yellow", "Green", "Red", "Yellow", "Yellow"],
            "Day7": ["Yellow", "Green", "Red", "Yellow", "Green", "Red", "Yellow", "Green", "Yellow", "Green", "Red", "Yellow", "Green", "Red"],
            "Day8": ["Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green"],
            "Day9": ["Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green"],
            "Day10": ["Yellow", "Green", "Red", "Yellow", "Yellow", "Green", "Red", "Green", "Yellow", "Green", "Red", "Yellow", "Green", "Red"],
            "Day11": ["Red", "Yellow", "Green", "Yellow", "Red", "Yellow", "Yellow", "Green", "Yellow", "Red", "Green", "Red", "Green", "Yellow"],
            "Day12": ["Green", "Yellow", "Yellow", "Green", "Red", "Yellow", "Red", "Green", "Yellow", "Green", "Red", "Yellow", "Green", "Red"],
            "Day13": ["Green", "Red", "Yellow", "Red", "Green", "Yellow", "Yellow", "Green", "Yellow", "Red", "Green", "Yellow", "Red", "Green"],
            "Day14": ["Red", "Yellow", "Red", "Green", "Yellow", "Green", "Red", "Green", "Yellow", "Red", "Green", "Yellow", "Red", "Green"],
            "Day15": ["Yellow", "Red", "Yellow", "Green", "Red", "Yellow", "Green", "Red", "Yellow", "Green", "Yellow", "Green", "Red", "Yellow"],
            "Day16": ["Yellow", "Green", "Yellow", "Green", "Red", "Yellow", "Green", "Red", "Yellow", "Green", "Yellow", "Red", "Green", "Yellow"],
            "Day17": ["Green", "Yellow", "Red", "Yellow", "Green", "Yellow", "Red", "Green", "Yellow", "Green", "Red", "Yellow", "Yellow", "Green"],
            "Day18": ["Red", "Yellow", "Yellow", "Green", "Red", "Yellow", "Red", "Green", "Yellow", "Green", "Red", "Green", "Yellow", "Green"],
            "Day19": ["Yellow", "Green", "Red", "Yellow", "Green", "Red", "Yellow", "Green", "Yellow", "Green", "Yellow", "Red", "Yellow", "Green"],
            "Day20": ["Red", "Yellow", "Green", "Yellow", "Red", "Yellow", "Green", "Red", "Yellow", "Green", "Yellow", "Red", "Yellow", "Green"],
            "Day21": ["Yellow", "Red", "Green", "Yellow", "Yellow", "Green", "Red", "Green", "Yellow", "Green", "Red", "Yellow", "Red", "Green"],
            "Day22": ["Yellow", "Red", "Green", "Red", "Yellow", "Green", "Yellow", "Green", "Yellow", "Red", "Yellow", "Green", "Red", "Green"],
            "Day23": ["Red", "Green", "Yellow", "Yellow", "Green", "Red", "Yellow", "Green", "Yellow", "Green", "Red", "Yellow", "Red", "Green"],
            "Day24": ["Yellow", "Green", "Red", "Yellow", "Green", "Red", "Green", "Yellow", "Green", "Red", "Yellow", "Green", "Yellow", "Red"],
            "Day25": ["Yellow", "Green", "Yellow", "Red", "Green", "Yellow", "Red", "Green", "Yellow", "Red", "Green", "Yellow", "Green", "Red"],
            "Day26": ["Red", "Yellow", "Green", "Red", "Yellow", "Yellow", "Green", "Yellow", "Red", "Green", "Yellow", "Green", "Yellow", "Red"],
            "Day27": ["Red", "Yellow", "Green", "Red", "Green", "Yellow", "Yellow", "Green", "Yellow", "Red", "Green", "Yellow", "Green", "Red"],
            "Day28": ["Yellow", "Red", "Green", "Yellow", "Green", "Yellow", "Red", "Green", "Yellow", "Green", "Yellow", "Red", "Green", "Yellow"],
            "Day29": ["Yellow", "Red", "Yellow", "Green", "Red", "Yellow", "Green", "Yellow", "Green", "Red", "Yellow", "Green", "Red", "Green"],
            "Day30": ["Green", "Yellow", "Green", "Red", "Yellow", "Red", "Green", "Yellow", "Green", "Yellow", "Green", "Red", "Yellow", "Green"],
            "Day31": ["Green", "Yellow", "Green", "Red", "Yellow", "Yellow", "Green", "Red", "Green", "Yellow", "Yellow", "Green", "Red", "Yellow"],
            "Day32": ["Red", "Green", "Yellow", "Red", "Green", "Yellow", "Yellow", "Green", "Red", "Green", "Yellow", "Red", "Green", "Yellow"],
            "Day33": ["Yellow", "Red", "Green", "Yellow", "Red", "Yellow", "Green", "Red", "Green", "Yellow", "Yellow", "Green", "Red", "Yellow"],
            "Day34": ["Green", "Yellow", "Green", "Red", "Yellow", "Green", "Yellow", "Red", "Green", "Yellow", "Red", "Yellow", "Green", "Red"],
            "Day35": ["Yellow", "Red", "Yellow", "Green", "Red", "Green", "Yellow", "Green", "Red", "Yellow", "Green", "Red", "Yellow", "Green"],
            "Day36": ["Red", "Green", "Yellow", "Green", "Red", "Yellow", "Green", "Yellow", "Red", "Green", "Yellow", "Red", "Yellow", "Green"],
            "Day37": ["Yellow", "Red", "Green", "Yellow", "Green", "Yellow", "Red", "Yellow", "Green", "Red", "Yellow", "Green", "Red", "Green"],
            "Day38": ["Yellow", "Red", "Green", "Yellow", "Green", "Red", "Green", "Yellow", "Yellow", "Green", "Red", "Yellow", "Green", "Red"],
            "Day39": ["Red", "Green", "Yellow", "Red", "Yellow", "Green", "Red", "Green", "Yellow", "Red", "Yellow", "Green", "Red", "Green"],
            "Day40": ["Yellow", "Red", "Yellow", "Green", "Red", "Yellow", "Yellow", "Green", "Yellow", "Red", "Green", "Yellow", "Green", "Red"],
            "Day41": ["Green", "Red", "Green", "Yellow", "Green", "Yellow", "Yellow", "Green", "Red", "Green", "Yellow", "Red", "Green", "Yellow"],
            "Day42": ["Yellow", "Red", "Green", "Yellow", "Red", "Yellow", "Green", "Red", "Green", "Yellow", "Green", "Red", "Yellow", "Green"],
            "Day43": ["Yellow", "Red", "Yellow", "Green", "Red", "Green", "Yellow", "Red", "Green", "Yellow", "Green", "Red", "Yellow", "Green"],
            "Day44": ["Green", "Yellow", "Yellow", "Green", "Red", "Green", "Yellow", "Red", "Yellow", "Green", "Yellow", "Red", "Green", "Yellow"],
            "Day45": ["Yellow", "Red", "Green", "Yellow", "Green", "Red", "Yellow", "Green", "Yellow", "Red", "Green", "Yellow", "Red", "Green"],
            "Day46": ["Yellow", "Red", "Yellow", "Green", "Yellow", "Green", "Red", "Green", "Yellow", "Green", "Red", "Yellow", "Green", "Red"],
            "Day47": ["Yellow", "Green", "Red", "Yellow", "Red", "Green", "Yellow", "Red", "Yellow", "Green", "Red", "Green", "Yellow", "Red"],
            "Day48": ["Green", "Red", "Yellow", "Green", "Red", "Yellow", "Yellow", "Green", "Red", "Green", "Yellow", "Red", "Yellow", "Green"],
            "Day49": ["Green", "Yellow", "Yellow", "Green", "Red", "Yellow", "Green", "Yellow", "Red", "Green", "Yellow", "Red", "Green", "Yellow"],
            "Day50": ["Red", "Yellow", "Green", "Yellow", "Red", "Green", "Yellow", "Red", "Green", "Yellow", "Red", "Green", "Yellow", "Green"],
            "Day51": ["Green", "Red", "Green", "Yellow", "Green", "Yellow", "Yellow", "Green", "Red", "Green", "Yellow", "Yellow", "Green", "Yellow"],
            "Day52": ["Yellow", "Red", "Green", "Yellow", "Red", "Green", "Yellow", "Red", "Green", "Yellow", "Green", "Red", "Yellow", "Green"],
            "Day53": ["Red", "Yellow", "Green", "Yellow", "Red", "Yellow", "Green", "Red", "Yellow", "Green", "Yellow", "Red", "Green", "Yellow"],
            "Day54": ["Yellow", "Green", "Red", "Green", "Yellow", "Red", "Yellow", "Green", "Yellow", "Green", "Red", "Yellow", "Green", "Red"],
            "Day55": ["Red", "Green", "Yellow", "Yellow", "Green", "Red", "Green", "Yellow", "Yellow", "Green", "Red", "Green", "Yellow", "Red"],
            "Day56": ["Green", "Yellow", "Red", "Green", "Yellow", "Green", "Red", "Yellow", "Green", "Red", "Yellow", "Green", "Red", "Green"],
            "Day57": ["Red", "Yellow", "Green", "Red", "Green", "Yellow", "Yellow", "Green", "Yellow", "Red", "Green", "Yellow", "Yellow", "Green"],
            "Day58": ["Yellow", "Green", "Red", "Yellow", "Red", "Green", "Yellow", "Red", "Yellow", "Green", "Yellow", "Red", "Green", "Yellow"],
            "Day59": ["Green", "Yellow", "Red", "Green", "Yellow", "Yellow", "Green", "Red", "Yellow", "Green", "Red", "Green", "Yellow", "Red"],
            "Day60": ["Red", "Green", "Yellow", "Red", "Yellow", "Green", "Red", "Yellow", "Green", "Yellow", "Red", "Yellow", "Green", "Red"]
        }
    },
    colorEnum: {
        getColorValue: (color) => en.get(color),
        getColorName: (value) => {
            for (let [key, val] of en) {
                if (val == value) {
                    return key
                }
            }
        }
    },
    utils: {
        range: (start, end) => {
            return [...Array(end - start + 1).keys()].map(i => i + start);
        },
        getDailySummary: (dailyData) => {
            let red = 0
            let green = 0
            let yellow = 0
            for (let i = 0; i < dailyData.length; i++) {

                if (dailyData[i] == "Red") {
                    red++
                } else if (dailyData[i] == "Yellow") {
                    yellow++
                } else if (dailyData[i] == "Green") {
                    green++
                }

            }
            if (red >= 1)
                return "Red"
            else if (red == 0 && yellow >= 3)
                return "Yellow"
            else if (red === 0 && yellow <= 2)
                return "Green"
        },
        chartEnum: {
            0: "Red",
            1: "Yellow",
            2: "Green"
        }
    }
})