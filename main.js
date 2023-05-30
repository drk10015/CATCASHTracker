const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const { k } = require("./utils/constants");
const { Server } = require("./server/ServerLite")
const mysql = require('sqlite3');
const path = require('path');
const fs = require('fs');
const { Student } = require('./models/student');
const { Dorm } = require('./models/dorm');
const { BehavioralLog } = require('./models/behavioralLog');
const { Period } = require('./models/period');
let dbPath = null

const exceljs = require("exceljs")
let lastDormID = null
let lastStudentID = null
let s = null;

function createSpreadsheet(data, student, dpath) {
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  let wb = new exceljs.Workbook();
  let ws = wb.addWorksheet("Behavioral Log");
  ws.columns = [
    { header: "Date", key: "date", width: 20 },
    { header: "Day Of Week", key: "day", width: 20 },
    { header: "6 AM - 8 AM", key: "p1", width: 20 },
    { header: "8 AM - 9:10", key: "p2", width: 20 },
    { header: "9:11 - 10:01", key: "p3", width: 20 },
    { header: "10:02 - 10:52", key: "p4", width: 20 },
    { header: "10:53 - 12:09", key: "p5", width: 20 },
    { header: "12:10 - 1:00", key: "p6", width: 20 },
    { header: "1:01 - 1:52", key: "p7", width: 20 },
    { header: "1:53 - 2:45", key: "p8", width: 20 },
    { header: "2:46 - 4:00 PM", key: "p9", width: 20 },
    { header: "4:00 PM - 5:00", key: "p10", width: 20 },
    { header: "5:00 PM - 7:00", key: "p11", width: 20 },
    { header: "7:00 PM - 8:00 PM", key: "p12", width: 20 },
    { header: "8:00 PM - 9:00 PM", key: "p13", width: 20 },
    { header: "9:00 PM - 10:00 PM", key: "p14", width: 20 },
  ];

  ws.getRow(1).font = { bold: true };
  ws.getRow(1).alignment = { horizontal: "center" };
  ws.getRow(1).border = { bottom: { style: "thin" } };

  for (let i = 0; i < data.length; i++) {
    let day = days[new Date(data[i].date).getDay()]
    if (day == "Sunday") {
      ws.addRow({ date: "", day: "", p1: "", p2: "", p3: "", p4: "", p5: "", p6: "", p7: "", p8: "", p9: "", p10: "", p11: "", p12: "", p13: "", p14: "" })
      ws.addRow({ date: "", day: "", p1: "", p2: "", p3: "", p4: "", p5: "", p6: "", p7: "", p8: "", p9: "", p10: "", p11: "", p12: "", p13: "", p14: "" })
    }
    let row = {
      date: data[i].date,
      day: day,
      p1: data[i].periods[0].color,
      p2: data[i].periods[1].color,
      p3: data[i].periods[2].color,
      p4: data[i].periods[3].color,
      p5: data[i].periods[4].color,
      p6: data[i].periods[5].color,
      p7: data[i].periods[6].color,
      p8: data[i].periods[7].color,
      p9: data[i].periods[8].color,
      p10: data[i].periods[9].color,
      p11: data[i].periods[10].color,
      p12: data[i].periods[11].color,
      p13: data[i].periods[12].color,
      p14: data[i].periods[13].color,
    };
    let newRow = ws.addRow(row);

    for (let j = 3; j <= 16; j++) {
      let cell = newRow.getCell(j);

      // set the fill color based on the cell value
      switch (cell.value) {
        case 'Red':
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFF0000' }  // Red fill
          };
          break;
        case 'Green':
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF00FF00' }  // Green fill
          };
          break;
        case 'Yellow':
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFFFF00' }  // Yellow fill
          };
          break;
      }
      newRow.commit();
    }
  }
  ws.addRow({ date: "", day: "", p1: "", p2: "", p3: "", p4: "", p5: "", p6: "", p7: "", p8: "", p9: "", p10: "", p11: "", p12: "", p13: "", p14: "" })
  ws.addRow({ date: "", day: "", p1: "", p2: "", p3: "", p4: "", p5: "", p6: "", p7: "", p8: "", p9: "", p10: "", p11: "", p12: "", p13: "", p14: "" })
  ws.addRow({ date: "Student Name", day: "Student ID", p1: "Dorm ID", p2: "Date Added", p3: "", p4: "", p5: "", p6: "", p7: "", p8: "", p9: "", p10: "", p11: "", p12: "", p13: "", p14: "" })
  ws.addRow({ date: student.name, day: student._id, p1: student.dormID, p2: student.dateAdded, p3: "", p4: "", p5: "", p6: "", p7: "", p8: "", p9: "", p10: "", p11: "", p12: "", p13: "", p14: "" })
  wb.xlsx.writeFile(path.join(dpath, student.name + "'sBehavioralLog.xlsx")).then(() => {
    console.log("file saved!");
  });
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 1000,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      sandbox: false,
    },
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
  ipcMain.on("openDormDetailView", (event, id) => {
    const webContents = event.sender;
    console.log("in main receiver", id)
    const win = BrowserWindow.fromWebContents(webContents);
    win.loadFile(k.filepaths.views + 'dormDetailView.html');
    console.log(id)
    lastDormID = id
    return
  });
  ipcMain.on("dormDetailViewLoaded", (event) => {
    console.log(lastDormID)
    console.log("in detail signal send", lastDormID)
    event.sender.send("getDormDetailViewID", lastDormID)
    return
  })
  ipcMain.on("openStudentDetailView", (event, id) => {
    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents);
    win.loadFile(k.filepaths.views + 'studentDetailView.html');
    lastStudentID = id
    return
  });
  ipcMain.on("studentDetailViewLoaded", (event) => {
    event.sender.send("getStudentDetailViewID", lastStudentID)
    return
  })
  ipcMain.on("getAllStudents", (event, limit, offset, cb) => {
    s.getStudents(limit, offset, (res) => {
      console.log(res)
      event.reply("studentsLoaded", res)
    })
  })
  ipcMain.on("getAllDorms", (event, limit, offset, cb) => {
    s.getDorms(limit, offset, (res) => {
      console.log(res)
      event.reply("dormsLoaded", res)
    })
  })
  ipcMain.on("getDormByID", (event, id) => {
    s.getDormByID(id, (res) => {
      console.log(res)
      event.reply("dormLoaded", res)
    })
  })
  ipcMain.on("getDormsBySearch", (event, search) => {
    s.dormSearch(search, (res) => {
      console.log(res)
      event.reply("dormSearchLoaded", res)
    })
  })
  ipcMain.on("getStudentsBySearch", (event, search) => {
    s.studentSearch(search, (res) => {
      console.log(res)
      event.reply("studentSearchLoaded", res)
    })
  })
  ipcMain.on("addStudent", (event, name, dormID) => {

    s.saveStudent(new Student(null, name, dormID), (res) => {
      console.log(res)
      event.reply("studentAdded", res)
    })
  })
  ipcMain.on("addDorm", (event, maxNumStudents) => {
    console.log("Made it to main")
    s.saveDorm(new Dorm(null, null, maxNumStudents), (res) => {
      console.log(res)
      event.reply("dormAdded", res)
    })
  })
  ipcMain.on("getBehavioralLog", (event, studentID, date) => {
    s.loadBehavioralLog(studentID, date, (res) => {
      console.log(res)
      console.error("SENDING BACK TO PRELOAD")
      event.reply("behavioralLogLoaded", res)
    })
  })
  ipcMain.on("downloadExcel", (event, data, student) => {
    dialog.showOpenDialog(win, {
      properties: ['openDirectory'],
    }).then((result) => {
      if (!result.canceled) {
        const filePath = result.filePaths[0];
        // Do something with the selected file
        console.log('Selected file:', filePath);
        createSpreadsheet(data, student, filePath)
      }
    }).catch((err) => {
      console.log(err);
    });
  })
  ipcMain.on("openAddNewPeriodView", (event, student) => {
    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents);
    win.loadFile(k.filepaths.views + 'addNewPeriodView.html');
    return
  })
  ipcMain.on("debugFilePath", (event) => {
    event.reply("debugFilePathLoaded", process.resourcesPath, 'app.asar.unpacked', 'yourDatabase.db')
  })
  ipcMain.on("addBehavioralLog", (event, date, studentID, periodObjs) => {
    console.log("in main", periodObjs)
    for (let i = 0; i < periodObjs.length; i++) {
      periodObjs[i] = new Period(null, periodObjs[i][1], periodObjs[i][2], periodObjs[i][3], periodObjs[i][4])
    }
    let behavioralLog = new BehavioralLog(null, date, studentID, periodObjs)
    console.log(behavioralLog)
    s.saveBehavioralLog(behavioralLog, (res) => {
      console.log(res)
      event.reply("behavioralLogAdded", res)
    })
  })
  win.removeMenu()

  win.loadFile("./views/index.html")
}

app.whenReady().then(() => {
  let destination = null
  if (app.isPackaged) {
    const source = path.join(process.resourcesPath, 'app.asar.unpacked', 'server.db');
    destination = path.join(app.getPath('userData'), 'server.db');

    if (!fs.existsSync(destination)) {
      fs.copyFileSync(source, destination);
    }
  } else {
    destination = path.join(__dirname, 'server.db');
  }
  s = new Server(mysql)


  s.connectSQLlite(destination)
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})







