'use strict';

angular.module('proj4App')
  .controller('StockShowCtrl', function ($scope, $stateParams, yahooFinanceService, twitSentService, stockService, portfolioService, toastr, ngDialog) {
    console.log('StockShowCtrl is alive!!' + $stateParams);




  var that = this;
  that.date = new Date();
  var id = $stateParams.stockId;

  that.clickToOpen = function () {
      console.log("ngFunctionate!")
        ngDialog.open({ template: 'templateId' });
    };

  that.checked = false; // This will be binded using the ps-open attribute

  that.toggle = function(){
      that.checked = !that.checked;
      //janky, but attempting to get the current info in the slideout panel
      that.getUserPortfolio();
  }


  stockService.findStockById(id).then(function(json) {
    that.stock = json.data;
  });
//Stock Stuffs
   that.buyStock = function(stock) {
    //Let's get the price of the current order!!!!
    var price = stock.lastTradePriceOnly * stock.qty;
    console.log(that.total + ' is total from buystock' + price + ' is price');
    console.log(that.myPortfolio.cash + "$$$$$");
    //VALIDATION to check that user has enough cash in portfolio(amt is in DB)
    if(price <= that.myPortfolio.cash - 20){
      portfolioService.buyStock(stock).then(function(json) {
        that.myPortfolio = json; //TODO: fix what the server is returning
        that.getUserPortfolio(); //janky workaround!!
        toastr.success(stock.qty + 'share(s) purchased');
      });
    }
    else if (price <= that.myPortfolio.cash) {
      toastr.error("Can't afford commission");
    }
      else {
        toastr.error("You can't afford this");
      };        //end if statemen
  };
  that.sellStock = function(stock) {
    var price = stock.lastTradePriceOnly * stock.qty;
    if (that.myPortfolio.cash < 20) {
      toastr.error("Can't afford commission");
    }
    else {
    console.log(that.myPortfolio.cash + "$$$$$");
    portfolioService.sellStock(stock).then(function(json) {
      console.log('promise here!');
        that.myPortfolio = json; //  TODO: fix this
        console.log(json);
        that.getUserPortfolio(); //janky workaround!!
        toastr.success('You sold ' + stock.qty + ' shares');
    }).catch(function(response) {
      console.log('Error ' + JSON.stringify(response));
      toastr.error("Not enough to sell");
    });
  };
}
  //portfolio
  that.getUserPortfolio = function() {
    portfolioService.getUserPortfolio().success(function(json) {
      that.myPortfolio = json;
      // console.log("portfolio to follow: " + JSON.stringify(that.myPortfolio.stocksInPortfolio[0]));
      //set all the actual stocks(which is an array) in the portfolio equal to varialbe.
      var portfolios = that.myPortfolio.stocksInPortfolio;
      that.total = 0;
      //adds up all stocks
      portfolios.map(function(portfolio) {
        //the gets the price of each stock in the portfolio
        var price = portfolio.stock.lastTradePriceOnly * portfolio.qty;
        // console.log(price + ' is price!');
        that.total += price;
      });
      console.log(that.total + ' is user portfolio total');
    });
  }
  that.getUserPortfolio();

  //Get historical stock data, calls two functions to set up chart
  that.getHistorical = function(input) {
    yahooFinanceService.historicalSingle(input).success(function(json) {
      that.historicalData = json;
      that.fillChartArray();
      console.log(json)
      that.createChart();
      that.twitSentQuery();
      });
    };

       // console.log(that.data[0].values);
       // console.log("-------" + json);
       // console.log("hist Data = " + that.historicalData[0].close);

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
console.log(that.words + ' is word array');
  }


      that.twitSentQuery = function(input) {
      // console.log(that.userInput + 'is userInput');
      if (that.userInput !== '' || that.userInput !== null) { //Defensive programming - guard against empty answers TODO: research undefined
      twitSentService.search(input).success(function(json) {
        // console.log('twitSentQuery from DashboardCtrl');
        // console.log(json);
        that.twitAnalysis = json;
        console.log(that.twitAnalysis.negative.length);
        that.wordArray(that.twitAnalysis.negative);
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

    //calls twitter, grabs score and puts words in an array and assigns a size value based on recurrence of word
    that.twitAnalysisWithReset = [];
    that.twitAnalysis = [];
    that.wordsArray = [];
    that.words = [{word: 'love', size: 1}, {word: 'hate', size: 5}];
    that.twitSentQuery = function(userInput, id, name) {
      that.tab = 0;
      that.twitAnalysisWithReset = [];
      // console.log(that.userInput + 'is userInput');
      if (that.userInput !== '' || that.userInput !== null) { //Defensive programming - guard against empty answers TODO: research undefined
      twitSentService.search(userInput).success(function(json) {
        // console.log('twitSentQuery from DashboardCtrl');
        // console.log(json);
        that.twitAnalysis = json;
        // that.twitAnalysis.push({id: id, name: name, score: json.score, comparative: json.comparative,  tokens: json.tokens, words: json.words});

        console.log(that.twitAnalysis  + '     is that.twitAnalysisScore array');

        // that.twitAnaylsisData = json;
        console.log("dog = " + that.twitAnalysis.words)
        for (var i = 0; i < that.twitAnalysis.words.length; i++) {
          var slot;
          if (that.wordsArray.indexOf(that.twitAnalysis.words[i]) !== -1) {
            for (var j = 0; j < that.words.length; j++) {
             if (that.words[j].word === that.twitAnalysis.words[i] && that.words[j].size < 11) {
              that.words[j].size += 1;
             }
            }
          } else {
          that.words.push({word: that.twitAnalysis.words[i], size: 1});
          console.log(that.words);
          that.wordsArray.push(that.twitAnalysis.words[i]);
          }
        }

        var change = document.getElementById("cloudster");
        //change.appendChild(tangy);
        console.log("that.word = " + that.words)
        change.innerHTML = "<tang-cloud words='ctrl.words'></tang-cloud>";
      });
      }
    }
  //fills the arrays with yahooHistorical data that the chart can interpret
  that.fillChartArray = function() {
    that.data = [{key: "High", values: [], mean: 0}, {key: "Low", values: [], mean: 0}, {key: "close", values: [], mean: 0}, {key: "adjClose", values: [], mean: 0} ];
    var meanTotal = 0;
    var meanTotal2 = 0;
    var meanTotal3 = 0;
    var meanTotal4 = 0;
    for (var i = 0; i < that.historicalData.length; i ++) {
      meanTotal = meanTotal + that.historicalData[i].high;
      meanTotal2 = meanTotal2 + that.historicalData[i].low;
      meanTotal3 = meanTotal3 + that.historicalData[i].close;
      meanTotal4 = meanTotal4 + that.historicalData[i].adjClose;
    };
    that.data[0].mean = meanTotal / that.historicalData.length;
    that.data[1].mean = meanTotal2 / that.historicalData.length;
    that.data[2].mean = meanTotal3 / that.historicalData.length;
    that.data[3].mean = meanTotal4 / that.historicalData.length;
    for (var i = 0; i < that.historicalData.length; i ++) {
      that.data[0].values.push([i, that.historicalData[i].high]);
      that.data[1].values.push([i, that.historicalData[i].low]);
      that.data[2].values.push([i, that.historicalData[i].close]);
      that.data[3].values.push([i, that.historicalData[i].adjClose]);
      // that.historicalData[i].date
    };
      console.log(that.data[0].values.length);
      console.log("finished");
  }
  //creates the chart
    that.createChart = function () {
    console.log("it begins")
     that.options = {
            chart: {
                type: 'cumulativeLineChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 60,
                    left: 65
                },
                x: function(d){
                  //console.log("d = " + d[0]);
                  return d[0]; },

                y: function(d){
                  //console.log("d1 = " + d[1]);
                  return d[1]/100; },
                average: function(d) { return d.mean/100; },

                color: d3.scale.category10().range(),
                transitionDuration: 300,
                useInteractiveGuideline: true,
                clipVoronoi: false,

                xAxis: {
                    axisLabel: 'months',
                    tickFormat: function(d) {
                        return d;
                    },
                    showMaxMin: false,
                    staggerLabels: true
                },

                yAxis: {
                    axisLabel: 'performance over time',
                    tickFormat: function(d){
                        return d3.format(',.1%')(d);
                    },
                    axisLabelDistance: 20
                }
            }
        };
        console.log("step 2");
        console.log('step 3')
      };
});

