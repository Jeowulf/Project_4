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
  T.get('search/tweets', {q: text, lang: 'en', include_entities: 'false'}, function(err, data) {
    // console.log(text + 'is text'); //check that user input is carried over from controller
    var twitterResults = data;
    var tweetArray = [];
    for (var i = 0; i < twitterResults.statuses.length; i++) {
    tweetArray.push(twitterResults.statuses[i].text);
    };
    var tweetString = tweetArray.join();
    var analyzedTweets = sentimentAnalysis(tweetString);
    var resultScore = analyzedTweets; //is this necessary?
    // console.log(resultScore);
    callback(resultScore);
  });
  // console.log('end');
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

