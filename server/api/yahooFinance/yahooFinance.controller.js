'use strict';

// var twitterSearch = require('../../logic/twitterSearch');

// exports.search = function (req,res) {
//   twitterSearch(req.body.query, function (data) {
//     console.log(req.body.query + 'is reqbodyquery');
//     // console.log(res.json + 'is res' + data + ' is data');
//     return res.json(201, data);
//   });
// }

// function handleError(res, err) {
//   return res.send(500, err);
// }
yahooFinance.snapshot({
  symbols: [SYMBOL1, SYMBOL2],
  fields: FIELDS  // ex: ['s', 'n', 'd1', 'l1', 'y', 'r']
}, function (err, snapshot) {
  /*
  {
    AAPL: {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      lastTradeDate: '11/15/2013',
      lastTradePriceOnly: '524.88',
      dividendYield: '2.23',
      peRatio: '13.29'
    },
    GOOGL: {
      symbol: 'GOOGL',
      name: 'Google Inc.',
      lastTradeDate: '11/15/2013',
      lastTradePriceOnly: '1034.23',
      dividendYield: 'N/A',
      peRatio: '28.17'
    }
  }
  */
});
