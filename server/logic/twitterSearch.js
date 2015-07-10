'use strict';
var util = require('util'),
    Twit = require('twit'),
    sentimentAnalysis = require('./sentimentAnalysis'),
    db = require('diskdb');

// db = db.connect('db', ['sentiments']);
//config

var T = new Twit({
  consumer_key: 'OkQZeC3MZXQ4IR1XA9NS49JdC',
  consumer_secret: 'sLmbhtgYD82etbOykzU8NriHVwSOOgPyL2pUcM5gISWjayAAue',
  access_token: '3053450973-O2qcPMSYvVpVwE1L9B88MnTdmPRJJIa5AqEhB4e',
  access_token_secret: 'r1Am1NrKT8ZWCbLlKkv6B1RXhfkITVI8fknnJsBVlELEq'
});


module.exports = function (text, callback) {
  T.get('search/tweets', {q: '@Madonna', lang: 'en', include_entities: 'false'}, function(err, data) {
    var x = data;
    var array = [];
    for (var i = 0; i < x.statuses.length; i++) {
    array.push(x.statuses[i].text);
    // array.join()
    };
    var r1 = array.join();
    var r2 = sentimentAnalysis(r1);
    var resultScore = r2;
    console.log(resultScore);

  });
  console.log('end');
}
// module.exports = function (text, callback) {
//   var twitterClient = new twitter(config);
//   var response = [], dbData = []; //to store tweets
//   console.log(response + '  response')
//   twitterClient.get(text, function (data) {
//     for (var i = 0; i < data.statuses.length; i++) {
//       var resp = {};
//       resp.tweet = data.statuses[i];
//       console.log('resp.tweet is ' + resp.tweet);
//       resp.sentiment = sentimentAnalysis(data.statuses[i].text);
//       dbData.push({
//         tweet: resp.tweet.text,
//         score: resp.sentiment.score
//       });
//       response.push(resp);
//     };
//     // db.sentiments.save(dbData);
//     callback(response);
//   });
// }

