// Code References : 
// IBM Watson's documentation : https://www.ibm.com/watson/developercloud/retrieve-and-rank/api/v1/?node
// Creating Natural Language QA system : http://fartashh.github.io/post/qa-system-watson/

var inputConfig = require('./inputconfigurations');
var fs = require('fs');
var jsonfile = require('jsonfile');

// Upload Solr configuration file to the cluster
var params = {
	cluster_id: inputConfig.cluster_id,
	config_name: inputConfig.config_name,
	config_zip_path: inputConfig.config_zip_path
};

inputConfig.retrieve_and_rank.uploadConfig(params,
	function (err, response) {
		if (err){
			console.log('error:', err);
		}
		else{
			console.log(JSON.stringify(response, null, 2));
		}
	});