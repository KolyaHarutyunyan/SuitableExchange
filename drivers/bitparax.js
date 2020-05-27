const Driver = require('../models/driver');
const request = require('../lib/request');
const Ticker = require('../models/ticker');
const { parseToFloat } = require('../lib/utils.js');

/**
 * @memberof Driver
 * @augments Driver
 */
class Bitparax extends Driver {
  /**
   * @augments Driver.fetchTickers
   * @returns {Promise.Array<Ticker>} Returns a promise of an array with tickers.
   */
  async fetchTickers() {
    const markets = await request('https://bitparax.com/api/v2/markets');
    const tickers = await request('https://bitparax.com/api/v2/tickers');

    return markets.map((market) => {
      const base = market.ask_unit;
      const quote = market.bid_unit;

      if (!tickers[market.id]) return undefined;
      const { ticker } = tickers[market.id];

      return new Ticker({
        base,
        quote,
        baseVolume: parseToFloat(ticker.vol),
        open: parseToFloat(ticker.open),
        high: parseToFloat(ticker.high),
        low: parseToFloat(ticker.low),
        close: parseToFloat(ticker.last),
      });
    });
  }
}

module.exports = Bitparax;
