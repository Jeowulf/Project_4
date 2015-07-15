'use strict';

var express = require('express');
var controller = require('./stock.controller');

var router = express.Router();
var auth = require('../../auth/auth.service'); //TODO add in auth portion
// auth.isAuthenticated()


// router.get('/:id', controller.show); //indivdual show for a particular stock
// router.post('/',   controller.create); //creates a stock in the DB with data from Yahoo API
router.get('/',    controller.index); //Gets all the stocks that we have saved
router.put('/', auth.hasRole('admin'),    controller.createSet); // Admin only creates set of stocks in DB from Yahoo API data
router.patch('/', auth.hasRole('admin'),  controller.update); //Admin only, Updates the stock's price?? TODO: are we using this?
router.delete('/',  controller.destroy); //Admin only, Delete's all stocks for DEV purposes
//A stock cannot be deleted by a user

module.exports = router;
