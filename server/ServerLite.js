/**
 * Simulated server but probably will be nothing like this and I will hate myself
 */
const { Student } = require("../models/student.js")
const { Dorm } = require("../models/dorm.js")
const { BehavioralLog } = require("../models/behavioralLog.js")
const { Period } = require("../models/period.js")
const popularNames = [
    'Liam', 'Emma', 'Noah', 'Olivia', 'Isabella', 'Sophia', 'Mia', 'Charlotte', 'Amelia', 'Harper',
    'Evelyn', 'Abigail', 'Emily', 'Elizabeth', 'Mila', 'Ella', 'Avery', 'Sofia', 'Camila', 'Aria',
    'Scarlett', 'Victoria', 'Madison', 'Luna', 'Grace', 'Chloe', 'Penelope', 'Layla', 'Riley', 'Zoey'
];
const exampleData = {
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
class Server {

    constructor(mysql) {
        this.mysql = mysql;
        this.connection = null;
        this.connect = this.connectSQLlite.bind(this);
        this.close = this.close.bind(this);
        this.saveDorm = this.saveDorm.bind(this);
        this.saveStudent = this.saveStudent.bind(this);
        this.getStudents = this.getStudents.bind(this);
        this.getDorms = this.getDorms.bind(this);
        this.getDormByID = this.getDormByID.bind(this);
        this.dormSearch = this.dormSearch.bind(this);
        this.studentSearch = this.studentSearch.bind(this);
        this.initdb = this.initdb.bind(this);
        this.addItems = this.addItems.bind(this);
    }

    async connectSQLlite(dbPath, cb) {
        this.connection = new this.mysql.Database(dbPath), (err) => {
            if (err) {
                console.error(err)
                return;
            }
            console.log("connected to server!")
        }
    }

    initdb() {
        this.connection.serialize(() => {
            this.connection.run("CREATE TABLE IF NOT EXISTS Dorms (_id INTEGER PRIMARY KEY AUTOINCREMENT, maxNumStudents INTEGER)");
            this.connection.run("CREATE TABLE IF NOT EXISTS Students (_id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, dormID INTEGER, behavioralLogID INTEGER, dateAdded TEXT)");
            this.connection.run("CREATE TABLE IF NOT EXISTS BehavioralLogs (_id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, studentID INTEGER, status INTEGER, description TEXT)");
            this.addItems();
        })
    }
    addItems() {
        this.connection.serialize(() => {
            for (let i = 0; i < 10; i++) {
                this.connection.run("INSERT INTO Dorms (_id, maxNumStudents) VALUES (null, 4)");
            }
            for (let i = 0; i < 30; i++) {
                this.connection.run("INSERT INTO Students (_id, name, dormID, behavioralLogID, dateAdded) VALUES (null, ?, ?, null, CURRENT_DATE)", [popularNames[Math.floor(Math.random() * popularNames.length)], Math.floor(Math.random() * 10) + 1]);
            }
        })
    }


    // Dorm functions

    saveDorm(dorm, cb) {
        if (this.connection == null) {
            this.connect();
        }
        let sql = "INSERT INTO Dorms (_id, maxNumStudents) VALUES (?, ?)"
        this.connection.run(sql, [dorm.id, dorm.maxNumStudents], (err, result) => {
            if (err) {
                console.error(err)
                return;
            }
            console.log("Dorm saved!")
            if (cb) {
                return cb(result)
            }
        })

    }

    getDormByID(id, cb) {

        if (this.connection == null) {
            this.connect();
        }
        let sql = "SELECT * FROM Dorms WHERE _id = ?"
        console.log(id)
        try {
            this.connection.all(sql, [id], async (err, result) => {
                console.log(sql)
                if (err) {
                    console.error(err)
                    return;
                }
                console.log("Dorm retrieved!");
                result = new Dorm(result[0]._id, null, result[0].maxNumStudents)
                result.students = await this.getStudentsFromDorm(result);
                console.log(result.students)
                if (cb) {
                    return cb(result)
                }
                return result;
            })
        } catch (error) {
            console.error(error)
            return
        }
    }

    async getDorms(limit, offset, cb) {
        if (this.connection == null) {
            this.connect();
        }
        let sql = "SELECT * FROM Dorms LIMIT ? OFFSET ?"
        try {
            const result = await new Promise((resolve, reject) => {
                this.connection.all(sql, [limit, offset], (err, result) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        console.log("Dorms retrieved!");
                        resolve(result);
                    }
                });
            });

            for (let i = 0; i < result.length; i++) {
                result[i] = new Dorm(result[i]._id, null, result[i].maxNumStudents);
                result[i].students = await this.getStudentsFromDorm(result[i]);
            }

            if (cb) {
                cb(result);
            }

            return result;
        } catch (error) {
            console.error(error);
            return;
        }
    }
    dormSearch(search, cb) {
        if (this.connection == null) {
            this.connect();
        }
        let sql = "SELECT * FROM Dorms WHERE _id LIKE ?"
        this.connection.all(sql, ['%' + search + '%'], async (err, result) => {
            if (err) {
                console.error(err)
                return;
            }
            console.log("Dorm retrieved!");
            for (let i = 0; i < result.length; i++) {
                result[i] = new Dorm(result[i]._id, null, result[i].maxNumStudents);
                result[i].students = await this.getStudentsFromDorm(result[i]);
            }
            if (cb) {
                return cb(result)
            }
            return result;
        })
    }

    async getStudentsFromDorm(dorm, cb) {
        if (this.connection == null) {
            this.connect();
        }
        let sql = "SELECT * FROM Students WHERE dormID = ?"
        console.log("in student from dorm", dorm.id)
        return new Promise((resolve, reject) => {
            this.connection.all(sql, [dorm.id], (err, result) => {
                if (err) {
                    console.error(err)
                    reject(err);
                } else {
                    console.log("result", result)
                    resolve(result);
                }
            });
        });
    }

    // Student functions

    saveStudent(student) {
        if (this.connection == null) {
            this.connect();
        }
        let sql = "INSERT INTO Students (name, dormID, behavioralLogID, dateAdded) VALUES (?, ?, ?, CURRENT_DATE)"
        this.connection.run(sql, [student.name, student.dormID, student.behavioralLogID], (err, result) => {
            if (err) {
                console.error(err)
                return;
            } else if (result) {
                console.log(result)
            }
            console.log("Student saved!")
        })
    }

    getStudents(limit, offset, cb) {
        if (this.connection == null) {
            this.connect();
        }
        let sql = "SELECT * FROM Students LIMIT ? OFFSET ?"
        this.connection.all(sql, [limit, offset], (err, result) => {
            if (err) {
                console.error(err)
                return;
            }
            console.log("Students retrieved!", result, err);
            for (let i = 0; i < result.length; i++) {
                result[i] = new Student(result[i]._id, result[i].name, result[i].dormID, result[i].behavioralLogID, result[i].dateAdded)
            }
            if (cb) {
                return cb(result)
            }
            return result;
        })
    }

    studentSearch(search, cb) {
        if (this.connection == null) {
            this.connect();
        }
        let sql = "SELECT * FROM Students WHERE name LIKE ? or _id LIKE ?"
        this.connection.all(sql, ['%' + search + '%', '%' + search + '%'], (err, result) => {
            if (err) {
                console.error(err)
                return;
            }
            console.log("Student retrieved!");
            for (let i = 0; i < result.length; i++) {
                console.log(result[i])
                result[i] = new Student(result[i]._id, result[i].name, result[i].dormID, result[i].behavioralLogID, result[i].dateAdded)
            }
            if (cb) {
                return cb(result)
            }
            return result;
        })
    }

    //Behaviroal Log functions

    async saveBehavioralLog(blog, cb) {
        if (this.connection == null) {
            this.connect();
        }
        let periodIDs = []
        for (let i = 0; i < blog.periods.length; i++) {
            periodIDs[i] = await this.savePeriod(blog.periods[i]);
        }
        let sql = "INSERT INTO BehavioralLogs (date, studentID, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
        return new Promise((resolve, reject) => {
            this.connection.run(sql, [blog.date, blog.studentID, periodIDs[0], periodIDs[1], periodIDs[2], periodIDs[3], periodIDs[4], periodIDs[5], periodIDs[6], periodIDs[7], periodIDs[8], periodIDs[9], periodIDs[10], periodIDs[11], periodIDs[12], periodIDs[13]], (err, result) => {
                if (err) {
                    console.error(err)
                    reject(err);
                } else {
                    resolve(result)
                }
            })
        });
    }

    async loadBehavioralLog(id, date, cb) {
        if (this.connection == null) {
            this.connect();
        }
        let sql = "SELECT * FROM BehavioralLogs WHERE studentID = ? AND date >= ?"
        const result = await new Promise((resolve, reject) => {
            this.connection.all(sql, [id, date], (err, result) => {
                if (err) {
                    console.error(err)
                    reject(err);
                    return;
                }
                for (let i = 0; i < result.length; i++) {
                    result[i] = new BehavioralLog(result[i]._id, result[i].date, result[i].studentID, [result[i].p1, result[i].p2, result[i].p3, result[i].p4, result[i].p5, result[i].p6, result[i].p7, result[i].p8, result[i].p9, result[i].p10, result[i].p11, result[i].p12, result[i].p13, result[i].p14])
                }
                resolve(result)
            });
        });
        for (let i = 0; i < result.length; i++) {

            for (let j = 0; j < 14; j++) {
                result[i].addPeriod(await this.loadPeriod(result[i].periods[j]))
            }
        }
        console.error("RETURNING FROM SERVER")
        if (cb) {
            return cb(result)
        };
    }



    //period functions
    async savePeriod(period, cb) {
        if (this.connection == null) {
            this.connect();
        }
        let sql = "INSERT INTO Periods (periodOrder, code, colorCode, notes) VALUES (?, ?, ?, ?)"
        return new Promise((resolve, reject) => {
            this.connection.all(sql, [period.periodOrder, period.code, period.color, period.notes], (err, result) => {
                if (err) {
                    console.error(err)
                    reject(err);
                } else {
                    this.connection.get("SELECT last_insert_rowid() as id", (err, row) => {
                        if (err) {
                            console.error(err)
                            reject(err);
                        } else {
                            resolve(row.id)
                        }
                    })
                }
            });
        });
    }

    async loadPeriod(id, cb) {
        if (this.connection == null) {
            this.connect();
        }
        let sql = "SELECT * FROM Periods WHERE _id = ?"
        return new Promise((resolve, reject) => {
            this.connection.all(sql, [id], (err, result) => {
                if (err) {
                    console.error(err)
                    reject(err);
                } else {
                    if (result[0].colorCode == -1) {
                        result[0].colorCode = "Red"
                    } else if (result[0].colorCode == 0) {
                        result[0].colorCode = "Yellow"
                    } else if (result[0].colorCode == 1) {
                        result[0].colorCode = "Green"
                    }
                    resolve(new Period(result[0]._id, result[0].periodOrder, result[0].code, result[0].colorCode, result[0].notes))
                }
            });
        });
    }

    close() {
        this.connection.end();
        console.log("closed connection to server!")
    }


}

module.exports = { Server }
// function getColorValue(color) { return en.get(color) }
// let server = new Server(require("sqlite3"))
// server.connectSQLlite();
// async function test() {
//     let day = new Date()
//     let strDay = ""
//     for (let i = 0; i < Object.entries(exampleData).length; i++) {
//         let tempPeriods = []
//         for (let j = 0; j < Object.entries(exampleData)[i][1].length; j++) {
//             tempPeriods.push(new Period(null, j + 1, 0, getColorValue(Object.entries(exampleData)[i][1][j]), null))
//         }
//         day.setDate(day.getDate() - 1)
//         const blog = new BehavioralLog(null, day.toISOString().slice(0, 10), 1, tempPeriods)
//         let res = await server.saveBehavioralLog(blog)
//     }
// }
// test()
// async function test() {



// }
// let data = test()

