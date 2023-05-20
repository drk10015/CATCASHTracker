const cEnum = window.constants.colorEnum
const exData = window.constants.k.exampleData
const ctx = document.getElementById("MyChart")


window.ipcComms.studentDetailViewID((id) => {
    window.ipcComms.desiredDormID = id
    console.log(id)
    document.getElementById("studentTitle").innerText += id.name + "'s Details"
    document.getElementById("studentNameLabel").innerText += " " + id.name
    document.getElementById("studentIDLabel").innerText += " " + id._id
    document.getElementById("dormIDLabel").innerText += " " + id.dormID
    const res = []
    for (let i = 1; i <= Object.entries(exData).length; i++) {
        let val = exData["Day" + i]
        res.push(cEnum.getColorValue(window.constants.utils.getDailySummary(val)))
    }
    const c = new Chart(ctx, {
        type: 'scatter',
        data: {
            labels: window.constants.utils.range(1, 60),
            datasets: [{
                data: res,
                fill: false,
                borderWidth: 0,
                pointRadius: 10,
                pointBackgroundColor: function (context) {
                    var index = context.dataIndex;
                    var value = context.dataset.data[index];
                    if (value == 1) {
                        return 'green'
                    }
                    else if (value == 0) {
                        return 'yellow'
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

    document.getElementById("btnradio1").addEventListener("click", () => {
        c.config.type = "scatter"
        c.update()
    })
    document.getElementById("btnradio2").addEventListener("click", () => {
        c.config.type = "pie"
        c.update()
    })
    document.getElementById("btnradio3").addEventListener("click", () => {
        c.config.type = "line"
        c.update()
    })
})



window.ipcComms.studentDetailViewLoaded()

