'use strict';

var express = require('express');
var controller = require('./yahooFinance.controller');
var yahooFinance = require('yahoo-finance');
var router = express.Router();

router.post('/', controller.search);
router.get('/',  controller.index);

module.exports = router;
