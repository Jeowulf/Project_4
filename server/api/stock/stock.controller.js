'use strict';
var Stock = require('./stock.model');

function handleError(res, err) {
  return res.send(500, err);
}
