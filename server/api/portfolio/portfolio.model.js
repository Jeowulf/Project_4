'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var StockInPortfolio = require('./stockInPortfolio.model');

var PortfolioSchema = new Schema({
  stocksValue : Number,
  cash: Number,
  stocksInPortfolio: [{
    type : Schema.Types.ObjectId,
    ref  : 'StockInPortfolio'
  }]
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);
