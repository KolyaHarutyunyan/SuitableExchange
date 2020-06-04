const Driver = require('../models/driver');
const request = require('../lib/request');
const Ticker = require('../models/ticker');
const { parseToFloat } = require('../lib/utils.js');

/**
 * @memberof Driver
 * @augments Driver
 */
class Vitex extends Driver {
  /**
   * @augments Driver.fetchTickers
   * @returns {Promise.Array<Ticker>} Returns a promise of an array with tickers.
   */
  async fetchTickers() {
    const { data: tickers } = await request('https://vitex.vite.net/api/v1/ticker/24hr');

    return tickers.map((ticker) => {
      const base = ticker.tradeTokenSymbol;
      const quote = ticker.quoteTokenSymbol;

      const baseReference = ticker.tradeToken;
      const quoteReference = ticker.quoteToken;

      return new Ticker({
        base,
        quote,
        baseReference,
        quoteReference,
        quoteVolume: parseToFloat(ticker.amount),
        baseVolume: parseToFloat(ticker.quantity),
        open: parseToFloat(ticker.openPrice),
        high: parseToFloat(ticker.highPrice),
        low: parseToFloat(ticker.lowPrice),
        close: parseToFloat(ticker.closePrice),
      });
    });
  }
}

module.exports = Vitex;
