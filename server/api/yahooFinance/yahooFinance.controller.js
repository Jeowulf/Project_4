'use strict';
var yahooFinanceSearch = require('../../logic/yahooFinanceSearch');

exports.search = function  (req, res) {
  yahooFinanceSearch(req.body.symbol, function (data) {
    return res.json(201,data)
  });
}

function handleError(res, err) {
  return res.send(500, err);
}

