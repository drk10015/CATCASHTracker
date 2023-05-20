class Dorm {
    constructor(id, students, maxNumStudents) {
        if (id != null) {
            this.id = id;
        } else {
            this.id = null;
        }
        if (students != null) {
            this.students = students;
        } else {
            this.students = [];
        }
        this.maxNumStudents = maxNumStudents;
    }
    addStudent(student) {
        this.students.push(student)
    }
}

module.exports = { Dorm }