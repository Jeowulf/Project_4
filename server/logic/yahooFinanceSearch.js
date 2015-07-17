'use stict';
var yahooFinance = require('yahoo-finance');

module.exports = function (text, callback, next) {

yahooFinance.snapshot({
  symbol: text,
  fields: ['s', 'n', 'd1', 'l1', 'y', 'r', 'c1', 'm5', 'c', 'c1', 'm', 'k', 'o', 'v', 'j1', 'e7', 'e9']
  },
  function (err, snapshot) {
    callback(snapshot);
  });

}
