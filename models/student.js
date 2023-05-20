
class Student {

    constructor(_id, name, dormID, behavioralLogID, dateAdded) {
        if (_id != null) {
            this._id = _id;
        } else {
            this._id = null;
        }
        this.name = name;
        this.behavioralLogID = behavioralLogID;
        this.dormID = dormID;
    }


}

module.exports = { Student }