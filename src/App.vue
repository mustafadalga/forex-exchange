<script setup>
import { computed, defineAsyncComponent, ref, watch } from "vue";
import Header from "@/components/Header.vue";
import SelectGroup from "@/components/SelectGroup.vue";
import Alert from "@/components/Alert.vue";
import { getPreviousDate, getTodayDate, isWeekend, getFridayDateOfWeekByDate, isAfter } from "@/helpers";
import { fetchLiveCurrencyList, fetchLiveCurrencyPair, fetchTimeSeries, fetchMarketOpenStatus } from "@/composables";
import Socket from "@/classes/Socket";
import { timeTypes } from "@/enums";

const Graph = defineAsyncComponent(() => import("@/components/Graph.vue"));


// Variables
const socket = new Socket();
let selectedFromCurrency = ref({});
let selectedToCurrency = ref({});
const liveCurrencyList = ref([]);
const timeSeriesRawData = ref({});
const initialCurrencyPair = {
  fromCurrency: "EUR",
  toCurrency: "USD"
}
const liveCurrencyPairData = ref({
  pair: null,
  bid: null,
  ask: null,
  mid: null,
  date: null
});
const marketOpenStatus = ref({});


// Computed Variables
const hasCurrencyPair = computed(() => selectedFromCurrency.value.id && selectedToCurrency.value.id ? true : false);
const currencyPair = computed(() => `${selectedFromCurrency.value.id}${selectedToCurrency.value.id}`);
const alerts = ref([]);
const hasAlert = computed(() => alerts.value.length ? true : false);

handleLiveCurrenciesList();
socket.connect();
socket.handleLiveCurrencyPair(currencyPair, liveCurrencyPairData);


// Watch currency pair
watch([ selectedFromCurrency, selectedToCurrency ], () => {
  removeAlerts();
  removeCurrencyPairData();

  if (hasCurrencyPair.value) {
    handleLiveCurrencyPair();
    handleTimeSeries();
  }
});


async function handleLiveCurrenciesList () {
  const response = await fetchLiveCurrencyList();
  if (response.status) {
    liveCurrencyList.value = response.data
    return handleInitialCurrencyPair();
  }

  alerts.value.push({
    type: "danger",
    message: response.errorMessage
  })
}


async function handleLiveCurrencyPair () {
  socket.subscribeCurrencyPair(currencyPair.value);
  const response = await fetchLiveCurrencyPair(currencyPair.value);
  if (response.status) {
    return liveCurrencyPairData.value = response.data;
  }

  alerts.value.push({
    type: "danger",
    message: response.errorMessage
  })
}

async function handleTimeSeries () {
  let startDate;
  let endDate;

  if (!marketOpenStatus.value.nextClose) {
    await handleMarketOpenStatus();
  }

  if (isWeekend()) {
    startDate = getPreviousDate(timeTypes.year, 1);
    endDate = getFridayDateOfWeekByDate();

  } else {

    if (isAfter(marketOpenStatus.value.nextClose)) {
      const yesterday = getPreviousDate(timeTypes.day, 1);
      startDate = getPreviousDate(timeTypes.year, 1, new Date(yesterday));
      endDate = getPreviousDate(timeTypes.day, 1);
    } else {
      startDate = getPreviousDate(timeTypes.year, 1);
      endDate = getTodayDate();
    }
  }

  const response = await fetchTimeSeries({
    currency: currencyPair.value,
    start_date: startDate,
    end_date: endDate
  });


  if (response.status) {
    return (timeSeriesRawData.value = response.data);
  }

  removeTimeSeriesRawData();
  alerts.value.push({
    type: "danger",
    message: response.errorMessage
  })
}

async function handleMarketOpenStatus () {
  const response = await fetchMarketOpenStatus();

  if (response.status) {
    (marketOpenStatus.value = {
      nextClose: response.data.next_close,
      status: Boolean(response.data.status)
    })

    return;
  }

  alerts.value.push({
    type: "danger",
    message: response.errorMessage
  })
}

function handleInitialCurrencyPair () {
  const pairCurrenciesIDs = [ initialCurrencyPair.fromCurrency, initialCurrencyPair.toCurrency ];
  const hasInitialCurrencyPair = pairCurrenciesIDs.every(currencyID => liveCurrencyList.value.some(liveCurrency => liveCurrency.id == currencyID));

  if (hasInitialCurrencyPair) {
    const fromCurrency = liveCurrencyList.value.find(liveCurrency => liveCurrency.id == initialCurrencyPair.fromCurrency)
    const toCurrency = liveCurrencyList.value.find(liveCurrency => liveCurrency.id == initialCurrencyPair.toCurrency)
    selectedFromCurrency.value = fromCurrency;
    selectedToCurrency.value = toCurrency;
  }
}

function removeAlerts () {
  alerts.value = [];
}

function removeCurrencyPairData () {
  liveCurrencyPairData.value = {
    pair: null,
    bid: null,
    ask: null,
    mid: null,
    date: null
  }
  removeTimeSeriesRawData();
}

function removeTimeSeriesRawData () {
  timeSeriesRawData.value = {};
}
</script>

<template>
  <main class="main">
    <Header/>

    <section class="section">
      <SelectGroup :liveCurrencyList="liveCurrencyList"
                   :fromCurrency="selectedFromCurrency"
                   :toCurrency="selectedToCurrency"
                   @inputFromCurrency="selectedFromCurrency=$event"
                   @inputToCurrency="selectedToCurrency=$event"/>
      <Graph
          v-if="hasCurrencyPair"
          :liveCurrencyPairData="liveCurrencyPairData"
          :timeSeriesRawData="timeSeriesRawData"
          :marketOpenStatus="marketOpenStatus"
          :fromCurrency="selectedFromCurrency.id"
          :toCurrency="selectedToCurrency.id"/>
    </section>


  </main>
  <div class="alerts" v-if="hasAlert">
    <Alert v-for="alert in alerts"
           :alert="alert"
           :key="alert.message"/>
  </div>
</template>

<style lang="scss">
@import "@/scss/_main.scss";
</style>
<style lang="scss" scoped>
@import "@/scss/local/_mixins.scss";

.section {
  margin-top: 50px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 50px;
  @include breakpoint("md") {
    min-height: 500px;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }
}

.alerts {
  width: 100%;
  position: fixed;
  bottom: 0;
  display: grid;
  gap: 15px;
  padding: 20px;
  z-index: 99999;
  @include breakpoint("md") {
    max-width: 500px;
  }
  @include breakpoint("2xl") {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
