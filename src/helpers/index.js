import moment from "moment";

function getPriceDiff (type, amount, quotes) {
    const ago = new Date(getPreviousDate(type, amount));
    const startDay = isWeekend(ago) ? getFridayDateOfWeekByDate(ago) : getPreviousDate(type, amount);
    const endDay = isWeekend() ? getFridayDateOfWeekByDate() : getTodayDate();
    const startDate = quotes.find(quote => quote.date == startDay);
    const endDate = quotes.find(quote => quote.date == endDay);

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

export {
    getPriceDiff,
    getRateOfChange,
    getPreviousDate,
    getTimestampByDate,
    getTodayDate,
    getFridayDateOfWeekByDate,
    isWeekend
}