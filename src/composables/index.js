async function fetchLiveCurrencyList () {
    const currencies = {
        data: [],
        status: false,
        errorMessage: ""
    }

    try {
        const url = `${import.meta.env.VITE_REST_API_URL}/api/v1/live_currencies_list?&api_key=${import.meta.env.VITE_REST_API_KEY}`;

        const response = await fetch(url);
        const responseJson = await response.json();

        if (responseJson.available_currencies) {
            currencies.status = true;
            currencies.data = Object.keys(responseJson.available_currencies).map(currency => {
                return {
                    id: currency,
                    title: responseJson.available_currencies[currency]
                }
            });
        } else {
            throw new Error();
        }

    } catch (error) {
        currencies.errorMessage = "An error occurred during loading live currency list.Please try again.";
    }

    return currencies;
}


async function fetchLiveCurrencyPair (selectedCurrencyPair) {
    const currencyPairResponse = {
        data: [],
        status: false,
        errorMessage: ""
    }

    try {
        const url = `${import.meta.env.VITE_REST_API_URL}/api/v1/live?currency=${selectedCurrencyPair}&api_key=${import.meta.env.VITE_REST_API_KEY}`;
        const response = await fetch(url);
        const responseJson = await response.json();

        if (responseJson.quotes) {
            currencyPairResponse.status = true;
            currencyPairResponse.data = responseJson.quotes[0]
        } else {
            throw new Error();
        }

    } catch (error) {
        currencyPairResponse.errorMessage = "An error occurred during loading live currency pair data.Please try again.";
    }

    return currencyPairResponse;
}


async function fetchTimeSeries (params) {
    const timeSeries = {
        data: [],
        status: false,
        errorMessage: ""
    }

    try {
        const url = new URL(`${import.meta.env.VITE_REST_API_URL}/api/v1/timeseries?&api_key=${import.meta.env.VITE_REST_API_KEY}`);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        const response = await fetch(url.href);
        const responseJson = await response.json();

        if (responseJson.quotes) {
            timeSeries.status = true;
            timeSeries.data = responseJson;
        } else {
            throw new Error();
        }

    } catch (error) {
        timeSeries.errorMessage = "An error occurred during loading timeseries data.Please try again.";
    }

    return timeSeries;
}


async function fetchMarketOpenStatus () {
    const data = {
        data: {},
        status: false,
        errorMessage: ""
    }

    try {
        const url = `${import.meta.env.VITE_REST_API_URL}/api/v1/beta/market_open_status?api_key=${import.meta.env.VITE_REST_API_KEY}`;
        const response = await fetch(url);
        const responseJson = await response.json();
        if (responseJson.Forex) {
            data.status = true;
            data.data = responseJson.Forex;
        }

    } catch (error) {
        data.errorMessage = "An error occurred while checking market status.Please try again.";
    }

    return data;
}

export {
    fetchLiveCurrencyList,
    fetchLiveCurrencyPair,
    fetchTimeSeries,
    fetchMarketOpenStatus
}