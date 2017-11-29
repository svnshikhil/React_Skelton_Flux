var express = require('express');
var _ = require('lodash')
var router = express.Router();
var util = require('util');
var HashMap = require('hashmap');
var map = new HashMap();
var elasticsearch = require('elasticsearch');
var config = require('config');
var host = config.get('es.host');
var index = config.get('es.index');
var HttpStatus = require('http-status-codes');
var client = new elasticsearch.Client({
	host: host
});

router.post("/", function (req, res, next) {
	console.log("in function getData",JSON.stringify(req.body,null,4))
	  client.search({
      index: index,
      body: req.body
    }, function (error, response) {
		if (error) {
			console.log("Error in getData ", error)
			res.status(HttpStatus.INTERNAL_SERVER_ERROR)
			res.send({
				error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
			});
		}
		else {
			res.json(response);
			console.log("successful");
		}
	})
})

module.exports = router;