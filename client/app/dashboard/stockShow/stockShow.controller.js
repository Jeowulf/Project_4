'use strict';

angular.module('proj4App')
  .controller('StockShowCtrl', function ($scope, $stateParams, yahooFinanceService, twitSentService, stockService, portfolioService, toastr) {
    console.log('StockShowCtrl is alive!!' + $stateParams);




  var that = this;
  that.date = new Date();
  var id = $stateParams.stockId;

  console.log('StockShowCtrl id is :' + id);

  stockService.findStockById(id).then(function(json) {
    that.stock = json.data;
  });
//Stock Stuffs
   that.buyStock = function(stock) {
    portfolioService.buyStock(stock).then(function(json) {
      // console.log(JSON.stringify(json.data) + 'is returned after buyStock');
       that.myPortfolio = json; //TODO: fix what the server is returning
      // that.getUserPortfolio();
      toastr.success(stock.qty + 'share(s) purchased');
    });
  };
  that.sellStock = function(stock) {
    console.log('sell clicked');
    portfolioService.sellStock(stock).then(function(json) {
      that.myPortfolio = json; //  TODO: fix this

      toastr.warning('You sold ' + stock.qty + ' shares');
    });
  };
  //portfolio
  that.getUserPortfolio = function() {
    portfolioService.getUserPortfolio().success(function(json) {
      that.myPortfolio = json;
      // console.log(JSON.stringify(that.myPortfolio) + "  Is that.myPortfolio");
      console.log("portfolio to follow: " + JSON.stringify(that.myPortfolio.stocksInPortfolio[0]));
      // stockNavService.testies();
      // console.log(that.myPortfolio.stocksInPortfolio[0].stock.symbol);
      // console.log('Price: ', that.myPortfolio.stocksInPortfolio[0].stock.lastTradePriceOnly);
      var portfolios = that.myPortfolio.stocksInPortfolio;
      that.total = 0;
      portfolios.map(function(portfolio) {
        var price = portfolio.stock.lastTradePriceOnly * portfolio.qty;
        that.total += price;
      });
      console.log(that.total + ' is user portfolio total');
    });
  }
  that.getUserPortfolio();

  //Get historical stock data
  that.getHistorical = function(input) {
    yahooFinanceService.historicalSingle(input).success(function(json) {
      that.historicalData = json;
       that.chart();
    });
  }
  //Get current stock data
  that.getCurrent = function(input){
   yahooFinanceService.search(input).success(function(json) {
    that.currentData = json;
   })
  }
//twitter/ wordcloud
  that.words = [];
  that.wordArray = function  (my_array) {

     _(my_array).forEach(function(n) {
        var x = Math.floor(Math.random() * 10) + 1;
        that.words.push({id: x, word: n, size: x});

      });
     console.log(that.words);

  }

   console.log(that.words + ' is word array');
      that.twitSentQuery = function(input) {
      // console.log(that.userInput + 'is userInput');
      if (that.userInput !== '' || that.userInput !== null) { //Defensive programming - guard against empty answers TODO: research undefined
      twitSentService.search(input).success(function(json) {
        // console.log('twitSentQuery from DashboardCtrl');
        // console.log(json);
        that.twitAnalysis = json;
        console.log(that.twitAnalysis.negative.length);
       return that.wordArray(that.twitAnalysis.negative);
        // console.log(that.twitAnalysis.positive  + '     is that.twitAnalysis');
        // that.twitAnaylsisData = json;
        //wordcloud
        // wordCloud(that.twitAnalysis.positive);
      });
      }
    }
    that.open;
    that.close;
    that.low;
    that.volume;
    that.adjClose;
    //chart.js stuff

    function getMaxOfArray(numArray) {
      return Math.max.apply(null, numArray);
    }

    function getMinOfArray(numArray) {
      return Math.min.apply(Math, numArray)
    }

   function getArrayAvg(array) {

    var total = 0;
        for(var i = 0; i < array.length; i++) {
        total += array[i];
    }
    var avg = total / array.length;
    return avg;
   }
    function twoDecimal(my_array){
      _(my_array).forEach(function(n) {

        var x = n.toFixed(2);
        console.log(n);
        return x;
      });
     }
    that.chart = function() {
      that.open = _.pluck(that.historicalData, 'open');
      that.close = _.pluck(that.historicalData, 'close');
      that.low = _.pluck(that.historicalData, 'low');
      that.adjClose = _.pluck(that.historicalData, 'adjClose');
      that.volume = _.pluck(that.historicalData, 'volume');
      // var x = twoDecimal(that.volume);
      // console.log(x);



      // console.log(that.open);
  var labels = [];

  //line graph settings
    that.labels = ["2011", "2012", "2013", "2014"];
    that.series = ["Open", "Close" , "Low", "Adjusted Close"];
    that.data = [
      that.open,
      that.close,
      that.low,
      that.adjClose
  ];
  //custom settings
  //maths:
  //scale steps = 5
  //step width = max - min/5
  //stepstart = 5
  var flatten = _.flatten(that.data);
  var avg = getArrayAvg(flatten);
  var max = getMaxOfArray(flatten);
  var min = getMinOfArray(flatten);

  console.log(that.open.length);
  console.log(max + ' is max');
  console.log(min + ' is min!');
  var steps = 3;
  // var start = 10;
  that.options = {
    scaleOverride: true,
    scaleSteps: steps,
    scaleStepWidth: ((max - min)  / steps),
    scaleStartValue: min,
    scaleIntegersOnly: true,
    scaleLabel: '<%= Number(value).toFixed(2) %>',
    showXLabels: 10
    };

  console.log("is max" + max);
  // console.log(that.close + ' is that.close');
  that.barLabels = ["2011", "2012", "2013", "2014"];
  // console.log(that.volume);
  that.barData = [
    that.volume
  ];
  }
  that.onClick = function (points, evt) {
    console.log(points, evt);
  };

  //wordcloud
  //create  {id: 1, word: "oke", size: 1}, format




});
