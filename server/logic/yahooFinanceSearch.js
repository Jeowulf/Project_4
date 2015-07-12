'use stict';
var yahooFinance = require('yahoo-finance');

module.exports = function (text, callback) {

yahooFinance.snapshot({
  symbol: text,
  fields: ['s', 'n', 'd1', 'l1', 'y', 'r']
  },
  function (err, snapshot) {
    callback(snapshot);
  });

}
