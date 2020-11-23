const Driver = require('../models/driver');
const request = require('../lib/request');
const Ticker = require('../models/ticker');
const { parseToFloat } = require('../lib/utils');
/**
 * @memberof Driver
 * @augments Driver
 */
class Folgory extends Driver {
  /**
   * @augments Driver.fetchTickers
   * @returns {Promise.Array<Ticker>} Returns a promise of an array with tickers.
   */
  async fetchTickers() {
    const tickers = await request('https://folgory.com/ticker');

    return tickers.map((ticker) => {
      const [base, quote] = ticker.symbol.split('/');

      return new Ticker({
        base,
        quote,
        high: parseToFloat(ticker.high),
        low: parseToFloat(ticker.low),
        close: parseToFloat(ticker.last),
        bid: parseToFloat(ticker.best_ask),
        ask: parseToFloat(ticker.best_bid), // reversed with ask
        vwap: parseToFloat(ticker.vwap),
        baseVolume: parseToFloat(ticker.volume),
      });
    });
  }
}

module.exports = Folgory;
