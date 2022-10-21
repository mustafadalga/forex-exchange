import moment from "moment";

function getPriceDiff (type, quotes) {
    const now = moment(moment.now()).format("YYYY-MM-DD");
    const lastDay = quotes.find(quote => quote.date == now);
    const previousDay = quotes.find(quote => quote.date == getPreviousDate(type));

    return {
        diff: lastDay.close - previousDay.open,
        rate: getRateOfChange(previousDay.open, lastDay.close)
    };
}

function getRateOfChange (open, close) {
    return (close - open) / open * 100
}

function getPreviousDate (type) {
    return moment(moment.now()).subtract(1, type).format("YYYY-MM-DD")
}

function getTodayDate () {
    return moment(moment.now()).format("YYYY-MM-DD");
}

export {
    getPriceDiff,
    getRateOfChange,
    getPreviousDate,
    getTodayDate
}