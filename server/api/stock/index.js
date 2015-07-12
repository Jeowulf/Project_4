'use strict';

var express = require('express');
var controller = require('./stock.controller');

var router = express.Router();

// router.get('/',    controller.index); //Gets all the stocks that we have
// router.get('/:id', controller.show); //indivdual show for a particular stock
router.post('/',   controller.create); //creates a stock or stocks
// router.patch('/:id', controller.update); //Updates the stock's price?? TODO: are we using this?
//A stock cannot be deleted by a user

module.exports = router;
