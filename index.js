// Your code here

function createEmployeeRecord([firstName, lastName, title, payPerHour]) {
    let employeeRecord = {}
    employeeRecord.firstName = firstName
    employeeRecord.familyName = lastName
    employeeRecord.title = title
    employeeRecord.payPerHour =  payPerHour
    employeeRecord.timeInEvents = []
    employeeRecord.timeOutEvents = []

    return employeeRecord;
}

function createEmployeeRecords(employeeArrays) {
    let employeeRecords = [];
    employeeArrays.map(record => {
        employeeRecords.push(createEmployeeRecord(record))
    })
    return employeeRecords;
}

let emp1 = ["Byron", "Poodle", "Mascot", 3]
function createTimeInEvent(employeeRecord, timestamp) {
    let timeInObj = {type: "TimeIn", hour: parseInt(timestamp.split(' ')[1]), date: timestamp.split(' ')[0]};
    employeeRecord.timeInEvents.push(timeInObj);
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, timestamp) {
    let timeOutObj = {type: "TimeOut", hour: parseInt(timestamp.split(' ')[1]), date: timestamp.split(' ')[0]};
    employeeRecord.timeOutEvents.push(timeOutObj);
    return employeeRecord
}
 
function hoursWorkedOnDate(employeeRecord, date) {
    let hoursWorked;
    let timeInIdx = employeeRecord.timeInEvents.findIndex(timeCard => timeCard.date === date);
    let timeOutIdx = employeeRecord.timeOutEvents.findIndex(timeCard => timeCard.date === date);
    let clockInTime = employeeRecord.timeInEvents[timeInIdx].hour;
    let clockOutTime = employeeRecord.timeOutEvents[timeOutIdx].hour;

    if (timeInIdx !== -1 ) {
        hoursWorked = (clockOutTime - clockInTime)/100;
    }
    else {
        console.log(`error: time information for ${date} doesn/'t exist`)
    }

    return hoursWorked
}


function wagesEarnedOnDate(employeeRecord, date) {
    let employeeHours = hoursWorkedOnDate(employeeRecord,date)
    let payOwed = employeeHours*employeeRecord.payPerHour;

    return payOwed;
}

function allWagesFor(employeeRecord) {
    // Wages Earned on Date function takes 1 date and returns pay for employee on date
    // Iterate over timeInEvents array
    let wages = [];
    employeeRecord.timeInEvents.forEach(timeCard => {
        let wagesOnDate = wagesEarnedOnDate(employeeRecord,timeCard.date);
        wages.push(wagesOnDate);
    })

    let totalPayOwed = wages.reduce((previousWage, currentWage) => previousWage + currentWage, 0)
    return totalPayOwed;
}

function calculatePayroll(employeeArrays) {
    let payForEachEmployee = [];
    employeeArrays.forEach(employeeObj => {
        payForEachEmployee.push(allWagesFor(employeeObj))
    })
    let payroll = payForEachEmployee.reduce((previousPay,currentPay) => previousPay + currentPay, 0)
    return payroll;
}
