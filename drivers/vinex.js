const request = require('../lib/request');
const Ticker = require('../models/ticker');
const { parseToFloat } = require('../lib/utils.js');

module.exports = async () => {
  const { data: tickers } = await request('https://api.vinex.network/api/v2/markets');

  return tickers.map((ticker) => {
    const [base, quote] = ticker.symbol.split('_');

    return new Ticker({
      base,
      baseName: ticker.tokenInfo1.name,
      quote,
      quoteName: ticker.tokenInfo2.name,
      high: parseToFloat(ticker.high24h),
      low: parseToFloat(ticker.low24h),
      close: parseToFloat(ticker.lastPrice),
      baseVolume: parseToFloat(ticker.volume24h),

    });
  });
};
