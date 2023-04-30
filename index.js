//Create an employee record from an array
function createEmployeeRecord(arr) {
    const employeeRecord = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return employeeRecord;
}
//Create an array of record objects from an array of record arrays
function createEmployeeRecords(empData) {
    //Create array to hold record objects
    const empRecords = empData.map(createEmployeeRecord);
    //Return array of record objects
    return empRecords;
}
function createTimeInEvent(dateStamp) {
    //Split string into date and time
    const dateTime = dateStamp.split(" ");
    //Create an object holding the type, time, and date
    const dateTimeIn = {
        type: "TimeIn",
        hour: parseInt(dateTime[1]),
        date: dateTime[0]
    };
    //Add object to timeInEvents array of record object
    this.timeInEvents.push(dateTimeIn);
    //Return the modified record object
    return this;
}
function createTimeOutEvent(dateStamp) {
    //Split string into date and time
    const dateTime = dateStamp.split(" ");
    //Create an object holding the type, time, and date
    const dateTimeOut = {
        type: "TimeOut",
        hour: parseInt(dateTime[1]),
        date: dateTime[0]
    };
    //Add object to timeOutEvents array of record object
    this.timeOutEvents.push(dateTimeOut);
    //Return the modified record object
    return this;
}
function hoursWorkedOnDate(date) {
    let timeIn = this.timeInEvents.find(day => day.date === date).hour;
    let timeOut = this.timeOutEvents.find(day => day.date === date).hour;
    const hoursWorked = (timeOut - timeIn)/100;
    return hoursWorked;
}
function wagesEarnedOnDate(date) {
    return this.payPerHour * hoursWorkedOnDate.call(this, date);
}
function findEmployeeByFirstName(arr, firstName) {
    for(let i = 0; i < arr.length; i++) {
        if(arr[i].firstName === firstName) {
            return arr[i];
        }
    }
    return undefined;
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
function calculatePayroll(empArr) {
    return empArr.reduce(function(total, emp) {
        return total + allWagesFor.call(emp);
    }, 0);
}