// Code References : 
// IBM Watson's documentation : https://www.ibm.com/watson/developercloud/retrieve-and-rank/api/v1/?node
// Creating Natural Language QA system : http://fartashh.github.io/post/qa-system-watson/

var inputConfig = require('./inputconfigurations');
var fs = require('fs');
var jsonfile = require('jsonfile');
var solr = require('solr');
var qs = require('qs');

// ASK QUESTIONS
	
// Search using ranker
var params = {
	cluster_id: inputConfig.cluster_id,
	collection_name: inputConfig.collection_name,
};

solrClient = inputConfig.retrieve_and_rank.createSolrClient(params);

var ranker_id = inputConfig.ranker_id;
var question_string = 'q=' + inputConfig.question;
var query = qs.stringify({q: question_string, ranker_id: ranker_id, fl: 'body'});

solrClient.get('fcselect', query, function (err, searchResponse) {
	if (err) {
		console.log('Error searching for documents: ' + err);
	}
	else {
		console.log(JSON.stringify(searchResponse.response.docs, null, 2));
	}
});