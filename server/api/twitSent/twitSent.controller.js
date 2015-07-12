'use strict';

var twitterSearch = require('../../logic/twitterSearch');

exports.search = function (req,res) {
  twitterSearch(req.body.query, function (data) {
    // console.log(req.body.query + 'is reqbodyquery');
    // console.log(res.json + 'is res' + data + ' is data');
    return res.json(201, data);
  });
}

function handleError(res, err) {
  return res.send(500, err);
}
