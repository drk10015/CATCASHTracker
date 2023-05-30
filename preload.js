const { contextBridge, ipcRenderer } = require('electron')
// the above is not loading the import correcytly and says that the module not found and it is in the same directory as this file
const path = require('path');
const { Student } = require('./models/student.js')
const { Dorm } = require('./models/dorm.js')
// const { BehavioralLog } = require('./models/behavioralLog.js')
// const { Period } = require('./models/period.js')

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
    },
    downloadExcel: (data, student) => ipcRenderer.send("downloadExcel", data, student),
    addNewPeriodView: (id) => ipcRenderer.send("openAddNewPeriodView", id),
    debugFilePath: (cb) => {
        ipcRenderer.send("debugFilePath")
        ipcRenderer.once("debugFilePathLoaded", (event, res) => {
            cb(res)
        })
    },

})
contextBridge.exposeInMainWorld('server', {
    addStudent: (name, dormID, cb) => {
        console.log("in preload", name, dormID)
        ipcRenderer.send("addStudent", name, dormID)
        ipcRenderer.once("studentAdded", (event, res) => {
            console.log("student added", res)
            cb(res)
        })
    },
    addDorm: (name, cb) => {
        ipcRenderer.send("addDorm", name)
        ipcRenderer.once("dormAdded", (event, res) => {
            cb(res)
        })
    },
    addBehavioralLog: (date, studentID, periodObjs) => {
        ipcRenderer.send("addBehavioralLog", date, studentID, periodObjs)
    },
    getStudents: (limit, offset, cb) => {
        ipcRenderer.send("getAllStudents", limit, offset)
        ipcRenderer.once("studentsLoaded", (event, res) => {
            cb(res)
        })
    },
    getDormByID: (id, cb) => {
        ipcRenderer.send("getDormByID", id)
        ipcRenderer.once("dormLoaded", (event, res) => {
            cb(res)
        })
    },
    getDorms: (limit, offset, cb) => {
        ipcRenderer.send("getAllDorms", limit, offset)
        ipcRenderer.once("dormsLoaded", (event, res) => {
            cb(res)
        })
    },
    getDormsBySearch: (search, cb) => {
        ipcRenderer.send("getDormsBySearch", search)
        ipcRenderer.once("dormSearchLoaded", (event, res) => {
            cb(res)
        })
    },
    getStudentsBySearch: (search, cb) => {
        console.log("in preload")
        ipcRenderer.send("getStudentsBySearch", search)
        ipcRenderer.once("studentSearchLoaded", (event, res) => {
            cb(res)
        })
    },
    getBehavioralLog: (studentID, date, cb) => {
        ipcRenderer.send("getBehavioralLog", studentID, date)
        ipcRenderer.once("behavioralLogLoaded", (event, res) => {
            console.error("Successfully Back in preload")
            cb(res)
        })
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
            "Day11": ["Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green"],
            "Day12": ["Green", "Yellow", "Yellow", "Green", "Red", "Yellow", "Red", "Green", "Yellow", "Green", "Red", "Yellow", "Green", "Red"],
            "Day13": ["Green", "Red", "Yellow", "Red", "Green", "Yellow", "Yellow", "Green", "Yellow", "Red", "Green", "Yellow", "Red", "Green"],
            "Day14": ["Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green"],
            "Day15": ["Green", "Green", "Yellow", "Yellow", "Yellow", "Yellow", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green"],
            "Day16": ["Yellow", "Green", "Yellow", "Green", "Red", "Yellow", "Green", "Red", "Yellow", "Green", "Yellow", "Red", "Green", "Yellow"],
            "Day17": ["Green", "Yellow", "Red", "Yellow", "Green", "Yellow", "Red", "Green", "Yellow", "Green", "Red", "Yellow", "Yellow", "Green"],
            "Day18": ["Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green"],
            "Day19": ["Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green"],
            "Day20": ["Red", "Yellow", "Green", "Yellow", "Red", "Yellow", "Green", "Red", "Yellow", "Green", "Yellow", "Red", "Yellow", "Green"],
            "Day21": ["Yellow", "Red", "Green", "Yellow", "Yellow", "Green", "Red", "Green", "Yellow", "Green", "Red", "Yellow", "Red", "Green"],
            "Day22": ["Green", "Green", "Yellow", "Yellow", "Yellow", "Yellow", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green"],
            "Day23": ["Red", "Green", "Yellow", "Yellow", "Green", "Red", "Yellow", "Green", "Yellow", "Green", "Red", "Yellow", "Red", "Green"],
            "Day24": ["Yellow", "Green", "Red", "Yellow", "Green", "Red", "Green", "Yellow", "Green", "Red", "Yellow", "Green", "Yellow", "Red"],
            "Day25": ["Green", "Green", "Yellow", "Yellow", "Yellow", "Yellow", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green"],
            "Day26": ["Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green"],
            "Day27": ["Red", "Yellow", "Green", "Red", "Green", "Yellow", "Yellow", "Green", "Yellow", "Red", "Green", "Yellow", "Green", "Red"],
            "Day28": ["Yellow", "Red", "Green", "Yellow", "Green", "Yellow", "Red", "Green", "Yellow", "Green", "Yellow", "Red", "Green", "Yellow"],
            "Day29": ["Yellow", "Red", "Yellow", "Green", "Red", "Yellow", "Green", "Yellow", "Green", "Red", "Yellow", "Green", "Red", "Green"],
            "Day30": ["Green", "Green", "Yellow", "Yellow", "Yellow", "Yellow", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green"],
            "Day31": ["Green", "Yellow", "Green", "Red", "Yellow", "Yellow", "Green", "Red", "Green", "Yellow", "Yellow", "Green", "Red", "Yellow"],
            "Day32": ["Red", "Green", "Yellow", "Red", "Green", "Yellow", "Yellow", "Green", "Red", "Green", "Yellow", "Red", "Green", "Yellow"],
            "Day33": ["Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green"],
            "Day34": ["Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green"],
            "Day35": ["Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green"],
            "Day36": ["Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green"],
            "Day37": ["Yellow", "Red", "Green", "Yellow", "Green", "Yellow", "Red", "Yellow", "Green", "Red", "Yellow", "Green", "Red", "Green"],
            "Day38": ["Yellow", "Red", "Green", "Yellow", "Green", "Red", "Green", "Yellow", "Yellow", "Green", "Red", "Yellow", "Green", "Red"],
            "Day39": ["Red", "Green", "Yellow", "Red", "Yellow", "Green", "Red", "Green", "Yellow", "Red", "Yellow", "Green", "Red", "Green"],
            "Day40": ["Yellow", "Red", "Yellow", "Green", "Red", "Yellow", "Yellow", "Green", "Yellow", "Red", "Green", "Yellow", "Green", "Red"],
            "Day41": ["Green", "Green", "Yellow", "Yellow", "Yellow", "Yellow", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green"],
            "Day42": ["Yellow", "Red", "Green", "Yellow", "Red", "Yellow", "Green", "Red", "Green", "Yellow", "Green", "Red", "Yellow", "Green"],
            "Day43": ["Green", "Green", "Yellow", "Yellow", "Yellow", "Yellow", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green"],
            "Day44": ["Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green"],
            "Day45": ["Yellow", "Red", "Green", "Yellow", "Green", "Red", "Yellow", "Green", "Yellow", "Red", "Green", "Yellow", "Red", "Green"],
            "Day46": ["Yellow", "Red", "Yellow", "Green", "Yellow", "Green", "Red", "Green", "Yellow", "Green", "Red", "Yellow", "Green", "Red"],
            "Day47": ["Green", "Green", "Yellow", "Yellow", "Yellow", "Yellow", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green"],
            "Day48": ["Green", "Red", "Yellow", "Green", "Red", "Yellow", "Yellow", "Green", "Red", "Green", "Yellow", "Red", "Yellow", "Green"],
            "Day49": ["Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green"],
            "Day50": ["Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green"],
            "Day51": ["Green", "Red", "Green", "Yellow", "Green", "Yellow", "Yellow", "Green", "Red", "Green", "Yellow", "Yellow", "Green", "Yellow"],
            "Day52": ["Green", "Green", "Yellow", "Yellow", "Yellow", "Yellow", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green"],
            "Day53": ["Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green"],
            "Day54": ["Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green"],
            "Day55": ["Red", "Green", "Yellow", "Yellow", "Green", "Red", "Green", "Yellow", "Yellow", "Green", "Red", "Green", "Yellow", "Red"],
            "Day56": ["Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green"],
            "Day57": ["Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green"],
            "Day58": ["Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green"],
            "Day59": ["Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green"],
            "Day60": ["Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green"]
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
        rangeDates: (numOfDays) => {
            let res = []
            let currDate = new Date()
            for (let i = numOfDays; i > 0; i--) {
                currDate.setDate(currDate.getDate() - 1)
                res.push(currDate.toISOString().slice(0, 10))
            }
            return res
        },

        getDailySummary: (dailyData) => {
            let red = 0
            let green = 0
            let yellow = 0
            for (let i = 0; i < dailyData.length; i++) {

                if (dailyData[i].color == "Red") {
                    red++
                } else if (dailyData[i].color == "Yellow") {
                    yellow++
                } else if (dailyData[i].color == "Green") {
                    green++
                }

            }
            if (red >= 1)
                return ["Red", [red, yellow, green]]
            else if (red == 0 && yellow >= 3)
                return ["Yellow", [red, yellow, green]]
            else if (red === 0 && yellow <= 2)
                return ["Green", [red, yellow, green]]
        },
        chartEnum: {
            0: "Red",
            1: "Yellow",
            2: "Green"
        }
    }
})
            }
if (red >= 1)
    return ["Red", [red, yellow, green]]
else if (red == 0 && yellow >= 3)
    return ["Yellow", [red, yellow, green]]
else if (red === 0 && yellow <= 2)
    return ["Green", [red, yellow, green]]
        },
chartEnum: {
    0: "Red",
        1: "Yellow",
            2: "Green"
}
    }
})