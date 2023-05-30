
const f = document.getElementById("form")

let currPeriod = 0
let currentPeriodsSelected = []
let optionalStudents = []
// document.getElementById('addNewPButton').addEventListener('click', (event) => {
//     event.preventDefault()
//     if (currPeriod < 13) {
//         document.querySelectorAll('.collapse').forEach((el) => {
//             var bsCollapse = new bootstrap.Collapse(el, { toggle: false });
//             bsCollapse.hide();
//         });

//         newPeriod()
//     } else {
//         alert("You can only add 14 periods")
//         return
//     }
// })
newPeriod()
function newPeriod() {
    for (let i = 0; i < 13; i++) {
        let appendingE = document.getElementById("collapseExample" + currPeriod);
        currPeriod++

        // 1st element
        let buttonRow = document.createElement("div")
        buttonRow.classList.add("row")
        // let cButton = document.createElement("button")
        // cButton.classList.add("btn")
        // cButton.classList.add("pull-left")
        // cButton.setAttribute("type", "button")
        // cButton.setAttribute("data-bs-toggle", "collapse")
        // cButton.setAttribute("data-bs-target", "#collapseExample" + currPeriod)
        // cButton.setAttribute("aria-expanded", "true")
        // cButton.setAttribute("aria-controls", "collapseExample" + currPeriod)
        // cButton.setAttribute("id", "cb" + currPeriod)
        // cButton.innerHTML = "Collapse Period " + (currPeriod + 1)
        // cButton.addEventListener("click", (event) => {
        //     // if (event.target.innerText.includes("Collapse")) {
        //     //     let period = document.getElementById("period" + currPeriod).value
        //     //     document.getElementById("cb" + currPeriod).innerText = "Expand " + period
        //     // } else {
        //     //     let period = document.getElementById("period" + currPeriod).value
        //     //     document.getElementById("cb" + currPeriod).innerText = "Collapse " + period
        //     // }
        // })
        // buttonRow.appendChild(cButton)

        // 2nd element
        let collapseDiv = document.createElement("div")
        collapseDiv.classList.add("collapse")
        collapseDiv.classList.add("show")
        collapseDiv.setAttribute("id", "collapseExample" + currPeriod)
        let r = document.createElement("div")
        r.classList.add("row")
        r.classList.add("mt-4")
        collapseDiv.appendChild(r)
        let formGroup1 = document.createElement("div")
        formGroup1.classList.add("form-group")
        formGroup1.classList.add("col-md-6")
        let label1 = document.createElement("label")
        label1.setAttribute("for", "period" + currPeriod)
        label1.innerHTML = "Period:"
        let select1 = document.createElement("select")
        select1.classList.add("form-control")
        select1.classList.add("periodDD")
        select1.setAttribute("id", "period" + currPeriod)
        for (let i = 1; i <= 14; i++) {
            let option = document.createElement("option")
            option.innerHTML = "Period " + i
            select1.appendChild(option)
        }
        select1.selectedIndex = currPeriod
        // select1.addEventListener("mousedown", (event) => {
        //     let i = 0
        //     while (select1.children.length < i) {
        //         if (currentPeriodsSelected.includes(select1.children[i].innerText)) {
        //             select1.children[i].disabled = true
        //         } else {
        //             select1.children[i].disabled = false
        //         }
        //     }
        // })
        select1.addEventListener("change", (event) => {
            let period = event.target.value
            document.getElementById("cb" + currPeriod).innerText = "Collapse " + period
        })
        formGroup1.appendChild(label1)
        formGroup1.appendChild(select1)
        r.appendChild(formGroup1)
        let formGroup2 = document.createElement("div")
        formGroup2.classList.add("form-group")
        formGroup2.classList.add("col-md-4")
        let label2 = document.createElement("label")
        label2.setAttribute("for", "status" + currPeriod)
        label2.innerHTML = "Status:"
        let select2 = document.createElement("select")
        select2.classList.add("form-control")
        select2.classList.add("statusDD")
        select2.setAttribute("id", "status" + currPeriod)
        let option4 = document.createElement("option")
        option4.innerHTML = "Green"
        let option5 = document.createElement("option")
        option5.innerHTML = "Yellow"
        let option6 = document.createElement("option")
        option6.innerHTML = "Red"
        select2.appendChild(option4)
        select2.appendChild(option5)
        select2.appendChild(option6)
        formGroup2.appendChild(label2)
        formGroup2.appendChild(select2)
        r.appendChild(formGroup2)
        let formGroup3 = document.createElement("div")
        formGroup3.classList.add("form-group")
        formGroup3.classList.add("col-md-2")
        let label3 = document.createElement("label")
        label3.setAttribute("for", "code" + currPeriod)
        label3.innerHTML = "Code:"
        let input1 = document.createElement("input")
        input1.setAttribute("type", "text")
        input1.classList.add("form-control")
        input1.classList.add("codeField")
        input1.setAttribute("id", "code" + currPeriod)
        input1.value = "0"
        formGroup3.appendChild(label3)
        formGroup3.appendChild(input1)
        r.appendChild(formGroup3)
        let formGroup4 = document.createElement("div")
        formGroup4.classList.add("form-group")
        let label4 = document.createElement("label")
        label4.setAttribute("for", "notes" + currPeriod)
        label4.innerHTML = "Notes:"
        let textarea1 = document.createElement("textarea")
        textarea1.classList.add("form-control")
        textarea1.setAttribute("id", "notes" + currPeriod)
        textarea1.setAttribute("rows", "1")
        textarea1.classList.add("notesField")
        formGroup4.appendChild(label4)
        formGroup4.appendChild(textarea1)
        collapseDiv.appendChild(formGroup4)

        appendingE.insertAdjacentElement('afterend', collapseDiv)
        appendingE.insertAdjacentElement('afterend', buttonRow)
        // window.scrollTo(0, document.body.scrollHeight);
    }
}
const periods = document.getElementById("period0");
for (let i = 1; i <= 14; i++) {
    let option = document.createElement("option")
    option.innerHTML = "Period " + i
    periods.appendChild(option)
}
const students = document.getElementById("student");
window.server.getStudents(100, 0, (res) => {
    for (let i = 0; i < res.length; i++) {
        let option = document.createElement("option")
        option.innerHTML = res[i].name
        students.appendChild(option)

    }
    optionalStudents = res
})
document.getElementById("period0").addEventListener("change", (event) => {
    let period = event.target.value
    document.getElementById("cb0").innerText = "Collapse " + period
})
// document.getElementById("cb0").addEventListener("click", (event) => {
//     // flipFlopCollapse(event, 0)
// })
// function flipFlopCollapse(event, num) {
//     if (event.target.innerText.includes("Collapse")) {
//         let period = document.getElementById("period" + num).value
//         document.getElementById("cb" + num).innerText = "Expand " + period
//     } else {
//         let period = document.getElementById("period" + num).value
//         document.getElementById("cb" + num).innerText = "Collapse " + period
//     }
// }
document.getElementById("subButton").addEventListener("click", (event) => {
    event.preventDefault()
    let studentIndex = document.getElementById("student").selectedIndex
    let student = optionalStudents[studentIndex]
    let date = document.getElementById("date").value
    let periods = document.querySelectorAll(".periodDD")
    let status = document.querySelectorAll(".statusDD")
    let code = document.querySelectorAll(".codeField")
    let notes = document.querySelectorAll(".notesField")
    let periodObjs = []
    periods.forEach((period, ind) => {
        let periodObj = [null, period.selectedIndex + 1, parseInt(code[ind].value), window.constants.colorEnum.getColorValue(status[ind].value), notes[ind].value]
        periodObjs.push(periodObj)
    })
    // let behavioralLog = window.constants.models.BehavioralLog(null, date, student._id, periodObjs)
    // console.log(behavioralLog)
    window.server.addBehavioralLog(date, student._id, periodObjs, (res) => {
        console.log(res)
    }
    )
    window.ipcComms.studentView()
})

/* <div class="row">
                <button class="btn pull-left" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample1"
                    aria-expanded="true" aria-controls="collapseExample1">Collapse Period</button>
            </div>
            <div class="collapse show" id="collapseExample1">
                <div class="form-group">
                    <label for="period">Period:</label>
                    <select class="form-control" id="period">
                        <option>Period 1</option>
                        <option>Period 2</option>
                        <option>Period 3</option>
                        <!-- Add more period options here -->
                    </select>
                </div>
                <div class="form-group">
                    <label for="status">Status:</label>
                    <select class="form-control" id="status">
                        <option>Green</option>
                        <option>Yellow</option>
                        <option>Red</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="code">Code:</label>
                    <input type="text" class="form-control" id="code">
                </div>
                <div class="form-group">
                    <label for="notes">Notes:</label>
                    <textarea class="form-control" id="notes" rows="5"></textarea>
                </div>
            </div> */