/**
 * Simulated server but probably will be nothing like this and I will hate myself
 */
const mysql = require('mysql2');
const { Student } = require("../models/student.js")
const { Dorm } = require("../models/dorm.js")
class Server {

    constructor(mysql) {
        this.mysql = mysql;
        this.connection = null;
        this.connect = this.connect.bind(this);
        this.close = this.close.bind(this);
        this.saveDorm = this.saveDorm.bind(this);
        this.saveStudent = this.saveStudent.bind(this);
        this.getStudents = this.getStudents.bind(this);
        this.getDorms = this.getDorms.bind(this);
        this.getDormByID = this.getDormByID.bind(this);
        this.dormSearch = this.dormSearch.bind(this);
        this.studentSearch = this.studentSearch.bind(this);
    }

    async connect(cb) {
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

    // Dorm functions

    saveDorm(dorm) {
        if (this.connection == null) {
            this.connect();
        }
        let sql = "INSERT INTO Dorms (maxNumStudents) VALUES (?)"
        this.connection.query(sql, [dorm.maxNumStudents], (err, result) => {
            if (err) {
                console.error(err)
                return;
            }
            console.log("Dorm saved!")
        })

    }

    getDormByID(id, cb) {

        if (this.connection == null) {
            this.connect();
        }
        let sql = "SELECT * FROM Dorms WHERE _id = ?"
        console.log(id)
        try {
            this.connection.query(sql, [id], (err, result) => {
                console.log(sql)
                if (err) {
                    console.error(err)
                    return;
                }
                console.log("Dorm retrieved!");
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
        let sql = "SELECT _id FROM Dorms WHERE _id LIKE ?"
        this.connection.query(sql, [search], (err, result) => {
            if (err) {
                console.error(err)
                return;
            }
            console.log("Dorm retrieved!");
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
        return new Promise((resolve, reject) => {
            this.connection.query(sql, [dorm.id], (err, result) => {
                if (err) {
                    console.error(err)
                    reject(err);
                } else {
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
        let sql = "SELECT name FROM Students WHERE name LIKE ?"
        this.connection.query(sql, [search], (err, result) => {
            if (err) {
                console.error(err)
                return;
            }
            console.log("Student retrieved!");
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
// function test(s, search, cb) {
//     return s.studentSearch(search, cb)
// }
// const s = new Server(mysql);
// s.connect();
// // let dorms = []
// test(s, "%A%", (res) => {
//     console.log(res)
// })