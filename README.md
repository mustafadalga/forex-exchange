# Forex Exchange

**The project uses https://tradermade.com/ data.**

<h6 align="center">
  <img alt="Forex Exchange" src="https://user-images.githubusercontent.com/25087769/197361601-75cb972b-eaac-444d-adb0-876687cc75af.png"/>
  <br>
  <br>
  <br>
  <br>

  <p align="center">
  <a href="#demo">Demo</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#used-technologies">Used Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#notes">Notes</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#project-setup">Project Setup</a>&nbsp;&nbsp;&nbsp;
  </p>

</h6>

## Demo
* [Project](https://forex-exchange-v1.netlify.app/)

## Used Technologies
* Vue.js 3
* SCSS / CSS 3
* Vite.js
* Socket.io
* 3rd party libraries
  * Highchart
  * vue-select
  * moment.js
  * highcharts
  * currency-symbol-map
  * currency-flags

## Notes
* Since the stock market is closed on the weekend, I am showing the data for Friday of that week.
* I show the previous day's data when the stock market is closed on weekdays. (market_open_status rest api)
* Timeseries rest API returns server error for pairs (SAR / USD) and (SAR / XPD). As a result, the graph cannot be rendered.
* There is a maximum of 1 year of graphic data.

## Project Setup

* The following variables should be defined in an .env file.

**Environment Variables(.env)**

* [VITE_STREAMING_API_URL](https://tradermade.com/docs/streaming-data-api)
* [VITE_REST_API_URL](https://tradermade.com/docs/restful-api)
* VITE_STREAMING_API_KEY
* VITE_REST_API_KEY

### Project Setup and Runs

```
npm install 
npm run dev
```
