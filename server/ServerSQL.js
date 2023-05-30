/**
 * Simulated server but probably will be nothing like this and I will hate myself
 */
const { Student } = require("../models/student.js")
const { Dorm } = require("../models/dorm.js")
const path = require("path")
const popularNames = [
    'Liam', 'Emma', 'Noah', 'Olivia', 'Isabella', 'Sophia', 'Mia', 'Charlotte', 'Amelia', 'Harper',
    'Evelyn', 'Abigail', 'Emily', 'Elizabeth', 'Mila', 'Ella', 'Avery', 'Sofia', 'Camila', 'Aria',
    'Scarlett', 'Victoria', 'Madison', 'Luna', 'Grace', 'Chloe', 'Penelope', 'Layla', 'Riley', 'Zoey'
];
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

    async connectSQL(cb) {
        this.connection = this.mysql.createConnection({
            host: 'localhost',
            user: "root",
            password: 'lunch10015',
            database: 'ccTracker',
            port: 3306,
        })
        this.connection.on('error', (err) => {
            console.error('Connection error:', err);
        });

        this.connection.on('timeout', () => {
            console.error('Connection timeout');
        });
        this.connection.connect((err) => {
            if (err) {
                console.error(err)
                return;
            }
            console.log("connected to server!")
            if (cb) {
                cb();
                return
            }
            return
        })
    }
    async connectSQLlite(cb) {
        this.connection = new this.mysql.Database(path.join(__dirname, "../server.db"), (err) => {
            if (err) {
                console.error(err)
                return;
            }
            console.log("connected to server!")
        })
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
        this.connection.query(sql, [dorm.id, dorm.maxNumStudents], (err, result) => {
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
            this.connection.query(sql, [id], async (err, result) => {
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
                this.connection.query(sql, [limit, offset], (err, result) => {
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
        this.connection.query(sql, ['%' + search + '%'], async (err, result) => {
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
            this.connection.query(sql, [dorm.id], (err, result) => {
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
        this.connection.query(sql, [student.name, student.dormID, student.behavioralLogID], (err, result) => {
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
        this.connection.query(sql, [limit, offset], (err, result) => {
            if (err) {
                console.error(err)
                return;
            }
            console.log("Students retrieved!");
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
        this.connection.query(sql, ['%' + search + '%', '%' + search + '%'], (err, result) => {
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

    close() {
        this.connection.end();
        console.log("closed connection to server!")
    }


}

module.exports = { Server }

let s = new Server(require("sqlite3"))
s.connectSQLlite()
s.initdb()
