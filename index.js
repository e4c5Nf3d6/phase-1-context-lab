const createEmployeeRecord = function (employee) {
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

const createEmployeeRecords = function (employees) {
    return employees.map(employee => createEmployeeRecord(employee))
}

const createTimeInEvent = function (dateStamp) {
    const [date, hour] = dateStamp.split(' ')
    const timeInEvent = {
        type: "TimeIn",
        hour: parseInt(hour), 
        date: date
    }
    this.timeInEvents.push(timeInEvent)
    return this
}

const createTimeOutEvent = function (dateStamp) {
    const [date, hour] = dateStamp.split(' ')
    const timeOutEvent = {
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    }
    this.timeOutEvents.push(timeOutEvent)
    return this
}

const hoursWorkedOnDate = function (dateStamp) {
    let timeIn = this.timeInEvents.find(event => event.date === dateStamp).hour
    let timeOut = this.timeOutEvents.find(event => event.date ===dateStamp).hour

    return (timeOut - timeIn) / 100
}

const wagesEarnedOnDate = function (dateStamp) {
    return this.payPerHour * hoursWorkedOnDate.call(this, dateStamp)
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

const findEmployeeByFirstName = function (srcArray, firstName) {
    return srcArray.find(emp => emp.firstName === firstName)
}

const calculatePayroll = function (records) {
    return records.reduce((total, employee) => {
        return total + allWagesFor.call(employee)
    }, 0) 
}
