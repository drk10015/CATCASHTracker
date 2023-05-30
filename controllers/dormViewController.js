const searchField = document.getElementById("searchField");
document.getElementById("questionMark").addEventListener("click", () => {
    window.server.getDormsBySearch(searchField.value, (res) => {
        clearCards()
        createStudentCards(res)
    })
})
searchField.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        window.server.getDormsBySearch(searchField.value, (res) => {
            clearCards()
            createStudentCards(res)
        })
    } else if (searchField.value == "") {
        window.server.getDorms(10, 0, (res) => {
            clearCards()
            createStudentCards(res)
        })
    }
})

document.getElementById("submitDormButton").addEventListener("click", () => {
    if (validateNewDorm()) {
        window.server.addDorm(document.getElementById("maxNumStudents").value, (res) => {
            console.log(res)
        })
    }
})
function statusToColor(status) {
    if (status == 1) {
        return "Green"
    } else if (status == 2) {
        return "Yellow"
    } else {
        return "Red"
    }
}

let students = []
let num = -1
for (i = 0; i < 30; i += 3) {

    if ((i % 3) == 0) {
        num += 1
    }
    students.push({
        name: "Dorm Number " + num,
        id: [123456 + i, 123456 + i + 1, 123456 + i + 2],
        status: Math.floor(Math.random() * 3) + 1
    })
}

//create the cards for each student
window.server.getDorms(50, 0, (res) => {
    createStudentCards(res)
})

function createStudentCards(items) {
    students = items;
    console.log(students)
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
        // i want to loop through all the ids in the array and add them to the card
        studentCardText.innerText += "Students: "
        for (let j = 0; j < students[i].students.length; j++) {
            studentCardText.innerText += students[i].students[j].name + ", "
            if (j == students[i].students.length - 1) {
                studentCardText.innerText = studentCardText.innerText.slice(0, -2)
            }
        }

        studentCardText = document.createElement("p")
        studentCardText.className = "card-text"
        studentCard.appendChild(studentCardBody).appendChild(studentCardText)
        studentCardText.innerText += "Weekly Dorm Status: " + statusToColor(students[i].status)
        studentCardLinkSpan.innerText = students[i].id
        dynStudentCardArea.appendChild(studentCard)
        studentCard.addEventListener("click", () => {
            window.ipcComms.dormDetailView(students[i])
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

function validateNewDorm() {
    let dormID = document.getElementById("dormID")
    let maxNStudents = document.getElementById("maxNumStudents")
    // if (dormID.value == "") {
    //     console.log("dormID is empty")
    //     dormID.classList.add("is-invalid")
    //     return false
    // }
    if (maxNStudents.value == "") {
        console.log("maxNStudents is empty")
        maxNStudents.classList.add("is-invalid")
        return false
    }
    return true
}