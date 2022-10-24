<script setup>
import * as Highcharts from 'highcharts/highstock';
import { computed, ref, watch } from "vue";
import { timeTypes } from "@/enums";
import { getPriceDiff, getTimestampByDate } from "@/helpers";
import HistoricalClosePrice from "@/components/HistoricalClosePrice.vue";
import LivePrice from "@/components/LivePrice.vue";
import SelectedCurrencies from "@/components/SelectedCurrencies.vue";


const props = defineProps({
  timeSeriesRawData: {
    type: Object,
    required: true,
    default: () => ({})
  },
  liveCurrencyPairData: {
    type: Object,
    required: true
  },
  fromCurrency: {
    type: String,
    required: true
  },
  toCurrency: {
    type: String,
    required: true
  },
  marketOpenStatus: {
    type: Object,
    required: true
  }
});
const chart = ref(null);
const selectedHistoricalRangeIndex = ref(2);
const watchOptions = {
  deep: true,
}

// Computed
const quotes = computed(() => props.timeSeriesRawData.quotes ? props.timeSeriesRawData.quotes : []);
const hasQuotes = computed(() => quotes.value.length ? true : false);
const historicalClosePrice = ref({
  diff: null,
  rate: null,
});
const graphData = computed(() => {
  if (!hasQuotes.value) return [];

  return quotes.value.map(row => {
    return [
      Number(getTimestampByDate(row.date)),
      row.open,
      row.high,
      row.low,
      row.close
    ]
  })
});

watch(graphData, () => {
  removeHistoricalClosePrice();
  chooseInitialHistoricalClose();

  chart.value ? updateChart() : createChart();

}, watchOptions);


function createChart () {
  chart.value = new Highcharts.stockChart('chart', {
    yAxis: [ {
      labels: {
        align: 'center',
        overflow: 'left',
        style: {
          color: "#666666",
          cursor: "default",
          fontSize: "11px",
        }
      },
      showLastLabel: true,
      resize: {
        enabled: true
      }
    } ],
    tooltip: {
      shape: 'square',
      headerShape: 'callout',
      borderWidth: 0,
      shadow: false,
    },
    series: [ {
      type: 'candlestick',
      data: graphData.value,
    } ],
    navigator: {
      enabled: false
    },
    scrollbar: {
      enabled: false
    },
    rangeSelector: {
      allButtonsEnabled: true,
      inputEnabled: false,
      buttons: [ {
        type: 'day',
        count: 1,
        text: '1d',
        events: {
          click: function () {
            historicalClosePrice.value = getPriceDiff(timeTypes.day, 1, quotes.value, props.marketOpenStatus.nextClose);
          }
        }
      }, {
        type: 'week',
        count: 1,
        text: '1w',
        events: {
          click: function () {
            historicalClosePrice.value = getPriceDiff(timeTypes.week, 1, quotes.value, props.marketOpenStatus.nextClose);
          }
        }
      }, {
        type: 'month',
        count: 1,
        text: '1m',
        events: {
          click: function () {
            historicalClosePrice.value = getPriceDiff(timeTypes.month, 1, quotes.value, props.marketOpenStatus.nextClose);
          }
        }
      }, {
        type: 'month',
        count: 3,
        text: '3m',
        events: {
          click: function () {
            historicalClosePrice.value = getPriceDiff(timeTypes.month, 3, quotes.value, props.marketOpenStatus.nextClose);
          }
        }
      }, {
        type: 'month',
        count: 6,
        text: '6m',
        events: {
          click: function () {
            historicalClosePrice.value = getPriceDiff(timeTypes.month, 6, quotes.value, props.marketOpenStatus.nextClose);
          }
        }
      }, {
        type: "year",
        count: 1,
        text: "1y",
        events: {
          click: function () {
            historicalClosePrice.value = getPriceDiff(timeTypes.year, 1, quotes.value, props.marketOpenStatus.nextClose);
          }
        }
      } ],
      selected: selectedHistoricalRangeIndex.value
    }
  });
}

function updateChart () {
  chart.value.rangeSelector.clickButton(selectedHistoricalRangeIndex.value, true);
  chart.value.update({
    series: [ {
      name: `${props.fromCurrency}${props.toCurrency} Price`,
      type: 'candlestick',
      data: graphData.value,
    } ],
  })
}

function removeHistoricalClosePrice () {
  historicalClosePrice.value = {
    diff: null,
    rate: null
  }
}

function chooseInitialHistoricalClose () {
  historicalClosePrice.value = getPriceDiff(timeTypes.month, 1, quotes.value, props.marketOpenStatus.nextClose);
}
</script>

<template>
  <div class="graph">
    <div class="graph-header">
      <SelectedCurrencies
          v-if="props.fromCurrency && props.toCurrency"
          v-bind="props"/>

      <div class="graph-status">
        <LivePrice
            v-if="props.liveCurrencyPairData.bid"
            :price="props.liveCurrencyPairData"
            :unit="props.toCurrency"/>
        <HistoricalClosePrice
            v-if="historicalClosePrice.diff"
            :historicalClosePrice="historicalClosePrice"/>
      </div>

    </div>
    <div class="graph-body">
      <div id="chart"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.graph {
  display: grid;
  align-content: end;
  gap: 15px;
  grid-template-columns: minmax(0, 1fr);


  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &-status {
    display: grid;
    gap: 12px;
  }
}


#chart {
  width: 100%;
  height: 400px;
  margin: 0;
  padding: 0;
}
</style>