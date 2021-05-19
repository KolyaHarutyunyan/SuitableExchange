const Driver = require('../models/driver');
const request = require('../lib/request');
const Ticker = require('../models/ticker');
const { parseToFloat } = require('../lib/utils');

/**
 * @memberof Driver
 * @augments Driver
 */
class Idax extends Driver {
  /**
   * @augments Driver.fetchTickers
   * @returns {Promise.Array<Ticker>} Returns a promise of an array with tickers.
   */
  async fetchTickers() {
    const { ticker: tickers } = await request('https://openapi.idax.pro/api/v2/ticker');

    return tickers.map((ticker) => {
      const [base, quote] = ticker.pair.split('_');

      return new Ticker({
        base,
        quote,
        baseVolume: parseToFloat(ticker.vol),
        close: parseToFloat(ticker.last),
        open: parseToFloat(ticker.open),
        high: parseToFloat(ticker.high),
        low: parseToFloat(ticker.low),
      });
    });
  }
}

module.exports = Idax;
