
const path = require('path')

const k = {
    filepaths: {
        views: path.join(__dirname, "../views/"),
        bootstrap: path.join(__dirname, "../bootstrap-5.0.2-dist/"),
        assets: path.join(__dirname, "../assets/")
    },
    names: {
        title: "CC Tracker"
    }
}

module.exports = { k };