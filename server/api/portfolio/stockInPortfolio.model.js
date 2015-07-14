'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var Stock = require('../stock/stock.model');
var deepPopulate = require('mongoose-deep-populate');

var StockInPortfolioSchema = new Schema({
    stock : {
      type : Schema.Types.ObjectId,
      ref: 'Stock'
    },
  qty : Number
});

StockInPortfolioSchema.plugin(deepPopulate);
module.exports = mongoose.model('StockInPortfolio', StockInPortfolioSchema);
