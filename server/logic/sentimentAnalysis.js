'use strict';
var sentiment = require('sentiment');

module.exports = function(text) {
  return sentiment(text);
};
