

const searchField = document.getElementById("searchField");
document.getElementById("questionMark").addEventListener("click", () => {
    window.server.getStudentsBySearch(searchField.value, (res) => {
        clearCards()
        createStudentCards(res)
    })
})
searchField.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        window.server.getStudentsBySearch(searchField.value, (res) => {
            clearCards()
            createStudentCards(res)
        })
    } else if (searchField.value == "") {
        window.server.getStudents(100, 0, (res) => {
            clearCards()
            createStudentCards(res)
        })
    }
})
document.getElementById("submitStudentButton").addEventListener("click", () => {
    if (validateNewStudent()) {
        console.log(document.getElementById("name").value)
        window.server.addStudent(document.getElementById("name").value, document.getElementById("dormID").value, (res) => {
            console.log(res)
            window.ipcComms.studentDetailView(res)
        })
    }
})

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
window.server.getStudents(100, 0, (res) => {
    createStudentCards(res)
})

function createStudentCards(items) {
    let students = items;
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
}
function clearCards() {
    let dynStudentCardArea = document.getElementById("card-load")
    while (dynStudentCardArea.firstChild) {
        dynStudentCardArea.removeChild(dynStudentCardArea.firstChild)
    }
}

function validateNewStudent() {
    let name = document.getElementById("name")
    let dormID = document.getElementById("dormID")
    if (name.value == "") {
        console.log("name is empty")
        name.classList.add("is-invalid")
        return false
    }
    if (dormID.value == "") {
        console.log("dormID is empty")
        dormID.classList.add("is-invalid")
        return false
    }
    return true
}
//create the cards for each student
