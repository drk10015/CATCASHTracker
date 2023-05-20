
window.ipcComms.dormDetailViewID((id) => {
    window.ipcComms.desiredDormID = id
    console.log(id)
    document.getElementById("dormTitle").innerText += " " + id.id + " Detail"
})



window.ipcComms.dormDetailViewLoaded()

