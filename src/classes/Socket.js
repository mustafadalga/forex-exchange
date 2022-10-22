import * as io from 'socket.io-client';

class Socket {
    constructor () {
        const options = { reconnect: true };
        const url = import.meta.env.VITE_STREAMING_API_URL;
        this.socket = io.connect(url, options);
    }

    connect () {
        this.socket.on('connect', () => {
            this.socket.emit('login', { userKey: import.meta.env.VITE_STREAMING_API_KEY });
        });
    }

    subscribeCurrencyPair (currencyPair) {
        this.socket.emit("symbolSub", { symbol: currencyPair });
    }

    handleLiveCurrencyPair (currencyPair, liveCurrencyPairData) {
        this.socket.on('price', (response) => {
            const data = response.split(" ");

            if (data[0] == currencyPair.value) {
                liveCurrencyPairData.value = {
                    pair: data[0],
                    bid: data[1],
                    ask: data[2],
                    mid: data[3],
                    date: data[4]
                }
            }
        });
    }

    disconnect () {
        this.socket.on('disconnect', (message) => {
        });
    }
}

export default Socket;