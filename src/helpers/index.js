import moment from "moment";
import { timeTypes } from "@/enums";


function getPriceDiff (type, amount, timeSeries, nextClose) {
    const previousDate = getPreviousDate(type, amount);
    let startDay;
    let endDay;

    // time-series limit is 1 year.
    if (type == timeTypes.year && isWeekend(new Date(previousDate))) {
        startDay = getNextMonday(new Date(previousDate));
    } else {
        if (isWeekend(new Date(previousDate))) {
            startDay = getFridayDateOfWeekByDate(new Date(previousDate))
        } else {
            startDay = previousDate
        }
    }

    if (isWeekend()) {
        endDay = getFridayDateOfWeekByDate();
    } else {
        endDay = isAfter(nextClose) ? getPreviousDate(timeTypes.day, 1) : getTodayDate();
    }

    const startDate = timeSeries.find(quote => quote.date == startDay);
    const endDate = timeSeries.find(quote => quote.date == endDay);


    if (startDate && endDate) {
        return {
            diff: endDate.close - startDate.open,
            rate: getRateOfChange(startDate.open, endDate.close)
        };
    }

    return {
        diff: "",
        rate: "",
    }
}


function getRateOfChange (open, close) {
    return (close - open) / open * 100
}

function getPreviousDate (type, amount = 1, date = moment.now()) {
    return moment(date).subtract(amount, type).format("YYYY-MM-DD")
}

function getTodayDate () {
    return moment(moment.now()).format("YYYY-MM-DD");
}

function getTimestampByDate (date) {
    return moment(date, 'YYYY-MM-DD').format('x');
}

function isWeekend (date = new Date()) {
    return date.getDay() === 6 || date.getDay() === 0;
}

function isAfter (closingDate) {
    return moment(new Date()).isAfter(closingDate)
}

function getFridayDateOfWeekByDate (date = new Date()) {
    const fridayDate = date;

    if (fridayDate.getDay() == 6) {
        fridayDate.setDate(fridayDate.getDate() - 1);
    } else if (fridayDate.getDay() == 0) {
        fridayDate.setDate(fridayDate.getDate() - 2);
    } else {
        const weekDaysCount = 5;
        const friday = weekDaysCount - fridayDate.getDay();
        fridayDate.setDate(fridayDate.getDate() + friday);
    }

    return moment(fridayDate).format("YYYY-MM-DD");
}

// Reference: https://bobbyhadz.com/blog/javascript-get-date-of-next-monday#:~:text=The%20method%20takes%20an%20integer,%2C%20Tuesday%20is%202%2C%20etc.
function getNextMonday (date = new Date()) {
    const newDate = new Date(date.getTime());
    const dayOfMonth = newDate.getDate();
    const dayOfWeek = newDate.getDay();
    const numberOfDaysToAdd = dayOfMonth + ((7 - dayOfWeek + 1) % 7 || 7);
    const nextMonday = new Date(newDate.setDate(numberOfDaysToAdd));

    return moment(nextMonday).format("YYYY-MM-DD");
}


export {
    getPriceDiff,
    getRateOfChange,
    getPreviousDate,
    getTimestampByDate,
    getTodayDate,
    getFridayDateOfWeekByDate,
    isWeekend,
    isAfter
}