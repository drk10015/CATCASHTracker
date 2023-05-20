const { Student } = require('../models/student')
const { Dorm } = require('../models/dorm')
const { Server } = require('./Server')
const mysql = require('mysql2');
const s = new Server(mysql);



let dorms = []
let students = []
const popularNames = [
    'Liam', 'Emma', 'Noah', 'Olivia', 'Isabella', 'Sophia', 'Mia', 'Charlotte', 'Amelia', 'Harper',
    'Evelyn', 'Abigail', 'Emily', 'Elizabeth', 'Mila', 'Ella', 'Avery', 'Sofia', 'Camila', 'Aria',
    'Scarlett', 'Victoria', 'Madison', 'Luna', 'Grace', 'Chloe', 'Penelope', 'Layla', 'Riley', 'Zoey'
];

//create a 10 dorm objects with random data
for (let i = 0; i < 10; i++) {
    dorms.push(new Dorm(i + 1, null, 4))
}

//create a 10 student objects with random data
let num = -1
for (let i = 0; i < 30; i++) {
    if ((i % 3) == 0) {
        num += 1
    }
    students.push(new Student(null, popularNames[Math.floor(Math.random() * popularNames.length)], num + 1, null, null))
}

//add students to dorms with the same dorm id
for (let i = 0; i < students.length; i++) {
    for (let j = 0; j < dorms.length; j++) {
        if (students[i].dormID == dorms[j].id) {
            dorms[j].addStudent(students[i])
        }
    }
}

///Server functions
let res = s.connect()
// for (let i = 0; i < dorms.length; i++) {
//     s.saveDorm(dorms[i])
// }
// 
const studs = s.getStudents(10, 0, (err, res) => {
    if (err) {
        console.error(err)
        return;
    }
    return res
})
console.log(studs)