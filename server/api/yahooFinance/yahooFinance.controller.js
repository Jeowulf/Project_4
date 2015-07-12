'use strict';
var yahooFinanceSearch = require('../../logic/yahooFinanceSearch');
var yahooFinanceMultipleSymbolSearch = require('../../logic/yahooFinanceMultipleSymbolSearch');
exports.search = function  (req, res) {
  yahooFinanceSearch(req.body.symbol, function (data) {
    // console.log(data.name + 'is data name');
    return res.json(201,data)
  });
}
exports.index = function (req, res) {
  yahooFinanceMultipleSymbolSearch(function (data) {
    return res.json(201, data);
  })
}
function handleError(res, err) {
  return res.send(500, err);
}

