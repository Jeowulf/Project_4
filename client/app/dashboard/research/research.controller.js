'use strict';

angular.module('proj4App')
  .controller('ResearchCtrl', function (twitSentService, yahooFinanceService) {
    var that = this;

    that.twitSentQuery = function(userInput) {
      console.log(that.userInput + 'is userInput');
      if (that.userInput !== '' || that.userInput !== null) { //Defensive programming - guard against empty answers TODO: research undefined
      twitSentService.search(that.userInput).success(function(json) {
        that.twitAnalysis = json;

        });
      };
    }

    that.yahooSearch = function(stockInput) {
      yahooFinanceService.search(that.stockInput).success(function(json) {
        that.yahooResults = json;
        console.log(JSON.stringify(that.yahooResults));
      })
    }
    //chart stuff
    that.getHistorical = function() {
        yahooFinanceService.historicalSingle(that.historical).success(function(json) {
          that.historicalData = json;
          that.fillChartArray();
          that.createChart();
        });
    }

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
        // that.data[0].mean = (meanTotal / that.historicalData.length) / that.historicalData[0].high;
        // that.data[1].mean = (meanTotal2 / that.historicalData.length) / that.historicalData[0].low;
        // that.data[2].mean = (meanTotal3 / that.historicalData.length) / that.historicalData[0].close;
        // that.data[3].mean = (meanTotal4 / that.historicalData.length) / that.historicalData[0].adjClose;
        for (var i = 0; i < that.historicalData.length; i ++) {
          that.data[0].values.push([i, that.historicalData[i].high]);
          that.data[1].values.push([i, that.historicalData[i].low]);
          that.data[2].values.push([i, that.historicalData[i].close]);
          that.data[3].values.push([i, that.historicalData[i].adjClose]);
          // that.historicalData[i].date
        };
          // console.log(that.data[0].values.length);
          // console.log("finished");
    }

    that.createChart = function () {
      console.log("it begins")
      that.options = {
            chart: {
                type: 'historicalBarChart',
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
