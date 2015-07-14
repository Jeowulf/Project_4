'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate');

var StockSchema = new Schema({
    symbol: String,
    name: String,
    lastTradeDate: Date,
    lastTradePriceOnly: Number,
    dividendYield: Number,
    peRatio: Number,
    twitterHandle: String
});
StockSchema.plugin(deepPopulate);

module.exports = mongoose.model('Stock', StockSchema);
