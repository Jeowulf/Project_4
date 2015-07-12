'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StockInPortfolioSchema = new Schema({
   item : {
    type : Schema.Types.ObjectId,
    ref: 'Stock'
  },
  qty : Number
});

module.exports = mongoose.model('StockInPortfolio', StockInPortfolioSchema);
