const { v4: uuid } = require("uuid")

class Student {

    constructor() {
        this._id = uuid();
        this.name = "dylan";
        this.behavioralID = uuid();

    }



}