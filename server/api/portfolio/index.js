'use strict';

var express = require('express');
var controller = require('./portfolio.controller');

var router = express.Router();

// router.get('/',                              controller.index); //For main feed of all users portfolios
router.get('/:userid/portfolio/',            controller.get); //Get specific portfolio
router.post('/:userid/portfolio/:stockid',    controller.buyStock); //TODO: create stock ID. add a stock(s) to a users portfolio
router.patch('/:userid/portfolio/:stockid',  controller.sellStock); //edits quantity of a stock in users portfolio
// router.delete('/:userid/portfolio',          controller.destroy); //Destroys/resets users entire portfolio
// router.delete('/:userid/portfolio/:stockid', controller.delete); //Sells/deletes all quantities of particular stock from users portfolio

module.exports = router;
