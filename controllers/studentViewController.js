
function statusToColor(status) {
    if (status == 1) {
        return "Green"
    } else if (status == 2) {
        return "Yellow"
    } else if (status == 3) {
        return "Red"
    }
}
//eventually change this to pull from the database
s = window.server.connect();
let students = window.server.getStudents(s, 30, 0, (res) => {
    students = res;
    for (let i = 0; i < students.length; i++) {
        students[i].status = Math.floor(Math.random() * 3) + 1
    }
    let dynStudentCardArea = document.getElementById("card-load")
    for (let i = 0; i < students.length; i++) {
        let studentCard = document.createElement("div")
        studentCard.className = "card mb-3 a-link text-left"
        if (students[i].status == 1) {
            studentCard.classList.add("bg-success")
        } else if (students[i].status == 2) {
            studentCard.classList.add("bg-warning")
        } else if (students[i].status == 3) {
            studentCard.classList.add("bg-danger")
        }
        let studentCardBody = document.createElement("div")
        studentCardBody.className = "card-body"
        let studentCardTitle = document.createElement("div")
        studentCardTitle.className = "card-title"
        let studentCardLink = document.createElement("a")
        let studentCardLinkSpan = document.createElement("span")
        studentCardLinkSpan.style.fontSize = "x-large"
        let studentCardText = document.createElement("p")
        studentCardText.className = "card-text"
        studentCard.appendChild(studentCardBody).appendChild(studentCardTitle).appendChild(studentCardLink).appendChild(studentCardLinkSpan)
        studentCard.appendChild(studentCardBody).appendChild(studentCardText)
        studentCardText.innerText = "Student ID: " + students[i]._id
        studentCardText.innerText += "\n Weekly Status: " + statusToColor(students[i].status)
        studentCardLinkSpan.innerText = students[i].name
        dynStudentCardArea.appendChild(studentCard)
        studentCard.addEventListener("click", () => {
            window.ipcComms.studentDetailView(students[i])
            return;
        })
    }
    window.server.close(s)
})


//create the cards for each student
