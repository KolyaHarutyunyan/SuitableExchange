const Driver = require('../models/driver');
const request = require('../lib/request');
const Ticker = require('../models/ticker');
const { parseToFloat } = require('../lib/utils.js');

/**
 * @memberof Driver
 * @augments Driver
 */
class Bitrue extends Driver {
  /**
   * @augments Driver.fetchTickers
   * @returns {Promise.Array<Ticker>} Returns a promise of an array with tickers.
   */
  async fetchTickers() {
    const response = await request('https://www.bitrue.com/kline-api/public.json?command=returnTicker');
    const tickers = response.data;
    const markets = Object.keys(tickers);

    return markets.map((market) => {
      const [base, quote] = market.split('_');

      const ticker = tickers[market];

      return new Ticker({
        base,
        quote,
        high: parseToFloat(ticker.high24hr),
        low: parseToFloat(ticker.low24hr),
        close: parseToFloat(ticker.last),
        baseVolume: parseToFloat(ticker.baseVolume),
        quoteVolume: parseToFloat(ticker.quoteVolume),
      });
    });
  }
}

module.exports = Bitrue;
