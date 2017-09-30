// Code References : 
// IBM Watson's documentation : https://www.ibm.com/watson/developercloud/retrieve-and-rank/api/v1/?node
// Creating Natural Language QA system : http://fartashh.github.io/post/qa-system-watson/

var inputConfig = require('./inputconfigurations');
var fs = require('fs');
var jsonfile = require('jsonfile');
var solr = require('solr');
var qs = require('qs');


//LIST RANKERS
inputConfig.retrieve_and_rank.listRankers({},
	function(err, response) {
		if (err)
		  console.log('error: ', err);
		else
		  console.log(JSON.stringify(response, null, 2));
	});