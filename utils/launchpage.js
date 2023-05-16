const titles = document.getElementsByClassName("mainTitle")
for (let t = 0; t < titles.length; t++) {
    let newInnerText = titles[t].innerHTML + " " + window.constants.k.names.title
    titles[t].innerHTML = newInnerText;
}
const dormViewButtons = document.getElementsByClassName('dormViewButton');
for (let i = 0; i < dormViewButtons.length; i++) {
    dormViewButtons[i].addEventListener('click', () => {
        const res = window.ipcComms.dormView();
    });
}
const homeViewButtons = document.getElementsByClassName('homeViewButton');
for (let b = 0; b < homeViewButtons.length; b++) {
    homeViewButtons[b].addEventListener('click', () => {
        const res = window.ipcComms.homeView();
    });
}
const storeViewButtons = document.getElementsByClassName('storeViewButton');
for (let b = 0; b < storeViewButtons.length; b++) {
    storeViewButtons[b].addEventListener('click', () => {
        const res = window.ipcComms.storeView();
    });
}
const studentViewButtons = document.getElementsByClassName('studentViewButton');
for (let b = 0; b < studentViewButtons.length; b++) {
    studentViewButtons[b].addEventListener('click', () => {
        const res = window.ipcComms.studentView();
    });
}