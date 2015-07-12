'use strict';

var express = require('express');
var controller = require('./yahooFinance.controller');

var router = express.Router();

router.post('/', controller.search);

module.exports = router;
