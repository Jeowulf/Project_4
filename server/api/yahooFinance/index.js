'use strict';

var express = require('express');
var controller = require('./yahooFinance.controller');
// var yahooFinance = require('yahoo-finance');
var router = express.Router();

router.post('/', controller.search);
router.get('/',  controller.index);
router.put('/',  controller.put); //saves histoical data to DB
router.patch('/',  controller.histoicalSearch);
module.exports = router;
