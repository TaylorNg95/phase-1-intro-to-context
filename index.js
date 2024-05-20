function createEmployeeRecord(empArray){
    const empRecord = {}
    empRecord.firstName = empArray[0]
    empRecord.familyName = empArray[1]
    empRecord.title = empArray[2]
    empRecord.payPerHour = empArray[3]
    empRecord.timeInEvents = []
    empRecord.timeOutEvents = []
    return empRecord
}

function createEmployeeRecords(arrayOfArrays){
    return arrayOfArrays.map(array => createEmployeeRecord(array))
}

function createTimeInEvent(empRecord, dateStamp){
    const timeInObject = {
        type: 'TimeIn',
        hour: parseInt(dateStamp.slice(11, 15)),
        date: dateStamp.slice(0, 10)
    }
    empRecord.timeInEvents.push(timeInObject)
    return empRecord
}

function createTimeOutEvent(empRecord, dateStamp){
    const timeOutObject = {
        type: 'TimeOut',
        hour: parseInt(dateStamp.slice(11, 15)),
        date: dateStamp.slice(0, 10)
    }
    empRecord.timeOutEvents.push(timeOutObject)
    return empRecord
}

function hoursWorkedOnDate(empRecord, queryDate){
    const hourIn = empRecord.timeInEvents.find(array => array.date === queryDate).hour
    const hourOut = empRecord.timeOutEvents.find(array => array.date === queryDate).hour
    return (hourOut - hourIn) / 100
}

function wagesEarnedOnDate(empRecord, queryDate){
    const hoursWorked = hoursWorkedOnDate(empRecord, queryDate)
    return hoursWorked * empRecord.payPerHour
}

function allWagesFor(empRecord){
    const availableDates = empRecord.timeInEvents.map(array => array.date)
    let wages = 0
    availableDates.forEach(date => {
        const wagesEarned = wagesEarnedOnDate(empRecord, date)
        wages = wages + wagesEarned
    })
    return wages
}

function calculatePayroll(empRecordArray){
    const totalWages = empRecordArray.reduce(function (accumulator, element){
        const empWages = allWagesFor(element)
        return accumulator + empWages
    }, 0)
    return totalWages
}