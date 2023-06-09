const cEnum = window.constants.colorEnum
const exData = window.constants.k.exampleData
const ctx = document.getElementById("MyChart")
const subtitle = document.getElementById("scatPlot")
let days = 60
const set7Days = (c, data) => {
    const res = []
    const totals = {
        red: 0,
        yellow: 0,
        green: 0
    }
    for (let i = data.length - 7; i < data.length; i++) {
        let val = data[i].periods
        let sum = window.constants.utils.getDailySummary(val)
        res.push(cEnum.getColorValue(sum[0]))
        totals["red"] += sum[1][0]
        totals["yellow"] += sum[1][1]
        totals["green"] += sum[1][2]
    }
    days = 7
    return [res, totals]
}
const set30Days = (c, data) => {
    const res = []
    const totals = {
        red: 0,
        yellow: 0,
        green: 0
    }
    for (let i = data.length - 30; i < data.length; i++) {
        let val = data[i].periods
        let sum = window.constants.utils.getDailySummary(val)
        res.push(cEnum.getColorValue(sum[0]))
        totals["red"] += sum[1][0]
        totals["yellow"] += sum[1][1]
        totals["green"] += sum[1][2]
    }
    days = 30
    return [res, totals]
}
const set60Days = (c, data) => {
    const res = []
    const totals = {
        red: 0,
        yellow: 0,
        green: 0
    }
    for (let i = data.length - 60; i < data.length; i++) {
        let val = data[i].periods
        let sum = window.constants.utils.getDailySummary(val)
        res.push(cEnum.getColorValue(sum[0]))
        totals["red"] += sum[1][0]
        totals["yellow"] += sum[1][1]
        totals["green"] += sum[1][2]
    }
    days = 60
    return [res, totals]
}
const pieChart = (c, data) => {
    c.config.type = "pie"
    c.data.labels = ["Red", "Yellow", "Green"]
    c.data.datasets[0].data = data
    c.data.datasets[0].backgroundColor = ['red', 'rgb(255, 205, 86)', 'green']
    c.options.plugins.legend.display = true
    c.options.scales.y = {}
    c.options.scales.y = { display: false }
    c.options.scales.x = { display: false }
    scatPlot.innerText = "This is the total count of the student's colored period over the selected amount of days displayed as a pie chart."
    c.update()
}
const scatterChart = (c, data) => {
    c.config.type = "scatter"
    c.data.labels = window.constants.utils.range(1, 60)
    c.data.datasets[0].data = data
    c.data.datasets[0].backgroundColor = []
    c.options.plugins.legend.display = false
    c.options.scales.y = {
        ticks: {
            callback: function (value, index, values) {
                return window.constants.utils.chartEnum[value + 1]
            }
        },
        title: {
            display: true,
            text: 'Daily Status'
        },
    }
    c.options.scales.x = {
        title: {
            display: true,
            text: 'Day'
        }
    }
    scatPlot.innerText = "This is summary data of the student's daily status over the selected amount of days."
    c.update()
}
const barChart = (c, data) => {
    c.config.type = "bar"
    c.data.labels = ["Red", "Yellow", "Green"]
    c.options.plugins.legend.display = false
    c.data.datasets[0].data = data
    c.data.datasets[0].backgroundColor = ['red', 'rgb(255, 205, 86)', 'green']
    c.options.scales.y = { display: false }
    c.options.scales.x = { display: false }
    scatPlot.innerText = "This is the total count of the student's colored period over the selected amount of days displayed as a bar chart."
    c.update()
}
window.ipcComms.dormDetailViewID((id) => {
    window.ipcComms.desiredDormID = id
    console.log(id)
    console.log(id.students)
    document.getElementById("dormTitle").innerText += " " + id.id
    document.getElementById("dormIDLabel").innerText += " " + id.id
    const residentSection = document.getElementById("residentSection")
    for (let i = 0; i < id.students.length; i++) {
        let newRow = document.createElement("div")
        newRow.className = "row"

        let student = document.createElement("div")
        student.className = "col-1 ml-4 text-dark fw-bold btn btn-link"
        student.addEventListener("click", () => {
            window.ipcComms.studentDetailView(id.students[i])
        })
        student.innerText = id.students[i].name
        residentSection.insertAdjacentElement("afterend", newRow.appendChild(student))
    }
    window.server.getBehavioralLog(1, "2023-03-29", (result) => {
        const exData = result
        const res = []
        const totals = {
            red: 0,
            yellow: 0,
            green: 0
        }
        for (let i = 1; i <= exData.length; i++) {
            let val = exData[i - 1].periods
            let sum = window.constants.utils.getDailySummary(val)
            res.push(cEnum.getColorValue(sum[0]))
            totals["red"] += sum[1][0]
            totals["yellow"] += sum[1][1]
            totals["green"] += sum[1][2]
        }
        const c = new Chart(ctx, {
            type: 'scatter',
            data: {
                labels: window.constants.utils.range(1, 60),
                datasets: [{
                    data: res,
                    borderWidth: 0,
                    pointRadius: 10,
                    pointBackgroundColor: function (context) {
                        var index = context.dataIndex;
                        var value = context.dataset.data[index];
                        if (value == 1) {
                            return 'green'
                        }
                        else if (value == 0) {
                            return 'rgb(255, 205, 86)'
                        } else {
                            return 'red'
                        }
                    }
                }]
            },
            options: {
                layout: {
                    padding: 20
                },
                plugins: {
                    legend: {
                        display: false
                    },
                },
                tooltips: {
                    enabled: false
                },
                scales: {
                    y: {
                        ticks: {
                            callback: function (value, index, values) {
                                return window.constants.utils.chartEnum[value + 1]
                            }
                        },
                        title: {
                            display: true,
                            text: 'Daily Status'
                        },
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Day'
                        }
                    }
                }
            },
        })
        scatterChart(c, res)
        document.getElementById("btnradio1").addEventListener("click", () => {
            if (days == 7) {
                scatterChart(c, set7Days(c, exData)[0])
            } else if (days == 30) {
                scatterChart(c, set30Days(c, exData)[0])
            } else if (days == 60) {
                scatterChart(c, set60Days(c, exData)[0])
            }
        })
        document.getElementById("btnradio2").addEventListener("click", () => {
            if (days == 7) {
                let data = set7Days(c, exData)
                pieChart(c, [data[1].red, data[1].yellow, data[1].green])
            } else if (days == 30) {
                let data = set30Days(c, exData)
                pieChart(c, [data[1].red, data[1].yellow, data[1].green])
            }
            else if (days == 60) {
                let data = set60Days(c, exData)
                pieChart(c, [data[1].red, data[1].yellow, data[1].green])
            }
        })
        document.getElementById("btnradio3").addEventListener("click", () => {
            if (days == 7) {
                let data = set7Days(c, exData)
                barChart(c, [data[1].red, data[1].yellow, data[1].green])
            } else if (days == 30) {
                let data = set30Days(c, exData)
                barChart(c, [data[1].red, data[1].yellow, data[1].green])
            }
            else if (days == 60) {
                let data = set60Days(c, exData)
                barChart(c, [data[1].red, data[1].yellow, data[1].green])
            }
        })
        document.getElementById("btnradio4").addEventListener("click", () => {
            let data = set7Days(c, exData)
            if (document.getElementById("btnradio1").checked) {
                scatterChart(c, data[0])
            }
            else if (document.getElementById("btnradio2").checked) {
                pieChart(c, [data[1].red, data[1].yellow, data[1].green])
            }
            else if (document.getElementById("btnradio3").checked) {
                barChart(c, [data[1].red, data[1].yellow, data[1].green])
            }
        })
        document.getElementById("btnradio5").addEventListener("click", () => {
            let data = set30Days(c, exData)
            if (document.getElementById("btnradio1").checked) {
                scatterChart(c, data[0])
            }
            else if (document.getElementById("btnradio2").checked) {
                pieChart(c, [data[1].red, data[1].yellow, data[1].green])
            }
            else if (document.getElementById("btnradio3").checked) {
                barChart(c, [data[1].red, data[1].yellow, data[1].green])
            }
        })
        document.getElementById("btnradio6").addEventListener("click", () => {
            let data = set60Days(c, exData)
            if (document.getElementById("btnradio1").checked) {
                scatterChart(c, data[0])
            }
            else if (document.getElementById("btnradio2").checked) {
                pieChart(c, [data[1].red, data[1].yellow, data[1].green])
            }
            else if (document.getElementById("btnradio3").checked) {
                barChart(c, [data[1].red, data[1].yellow, data[1].green])
            }
        })
    })
})
window.ipcComms.dormDetailViewLoaded()

