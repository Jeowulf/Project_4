'use stict';
var yahooFinance = require('yahoo-finance');

module.exports = function (input, callback) {
console.log(input + ' is input');
yahooFinance.historical({ //TODO: move these hardcoded symbols
  symbol: input,
  // fields: ['s', 'n', 'd1', 'l1', 'y', 'r']
  from: '2010-01-01',
  to: '2015-07-01'
  },
  function (err, quotes) {
    callback(quotes);
  });

}
