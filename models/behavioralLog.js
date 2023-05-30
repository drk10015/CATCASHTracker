class BehavioralLog {
    constructor(id, date, studentID, periods,) {
        this.id = id;
        this.studentID = studentID
        this.date = date
        if (periods) {
            this.periods = periods
        } else {
            this.periods = []
        }
    }
    addPeriod(period) {
        this.periods[period.periodOrder - 1] = period;
    }
}

module.exports = { BehavioralLog }