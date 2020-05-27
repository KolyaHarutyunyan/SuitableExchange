const tls = require('tls');
const Driver = require('../models/driver');
const request = require('../lib/request');
const Ticker = require('../models/ticker');
const { parseToFloat } = require('../lib/utils.js');

// Solves HTTPS errors
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
// Solves EPROTO errors in some SSL requests
tls.DEFAULT_ECDH_CURVE = 'auto';

/**
 * @memberof Driver
 * @augments Driver
 */
class Bitonic extends Driver {
  /**
   * @augments Driver.fetchTickers
   * @returns {Promise.Array<Ticker>} Returns a promise of an array with tickers.
   */
  async fetchTickers() {
    const ticker = await request('https://bitonic.nl/api/price');

    const base = 'BTC';
    const quote = 'EUR';

    return [new Ticker({
      base,
      quote,
      baseVolume: parseToFloat(ticker.volume),
      close: parseToFloat(ticker.price),
    })];
  }
}

module.exports = Bitonic;
