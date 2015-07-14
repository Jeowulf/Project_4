'use stict';
var yahooFinance = require('yahoo-finance');

module.exports = function (callback) {

yahooFinance.historical({ //TODO: move these hardcoded symbols
  symbols: ['BBY', 'ADDYY', 'TGT', 'DAL', 'NKE', 'MCD', 'AXP', 'KO', 'VZ', 'PEP', 'BBRY', 'SNE', 'LUV', 'ETSY', 'JBLU', 'SSNLF', 'SBUX', 'WFM', 'GOOG', 'MSFT', 'YHOO', 'INTC', 'T'],
  // fields: ['s', 'n', 'd1', 'l1', 'y', 'r']
  from: '2010-01-01',
  to: '2015-07-01',
  },
  function (err, quotes) {
    callback(quotes);
  });

}
