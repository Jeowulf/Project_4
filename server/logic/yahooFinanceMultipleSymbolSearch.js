'use stict';
var yahooFinance = require('yahoo-finance');

module.exports = function (callback) {

yahooFinance.snapshot({ //TODO: move these hardcoded symbols
  symbols: ['BBY', 'ADDYY', 'TGT', 'DAL', 'NKE', 'MCD', 'AXP', 'KO', 'VZ', 'PEP', 'BBRY', 'SNE', 'LUV', 'ETSY', 'JBLU', 'SSNLF', 'SBUX', 'WFM', 'GOOG', 'MSFT', 'YHOO', 'INTC', 'T'],
  fields: ['s', 'n', 'd1', 'l1', 'y', 'r']
  },
  function (err, snapshot) {
    callback(snapshot);
  });

}
