'use strict';
var myTimer;
var countdown = 180;
function timer() {
  countdown--;
  console.log('timer is incrementing ' + countdown );
  if(countdown === 0) {
    clearInterval(myTimer);
    console.log('stopping timer clearInterval');
  }
}
function updateStocks() {

}

// myTimer = setInterval(timer, 1000);
