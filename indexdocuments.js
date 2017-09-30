// Code References : 
// IBM Watson's documentation : https://www.ibm.com/watson/developercloud/retrieve-and-rank/api/v1/?node
// Creating Natural Language QA system : http://fartashh.github.io/post/qa-system-watson/

var inputConfig = require('./inputconfigurations');
var fs = require('fs');
var jsonfile = require('jsonfile');
var solr = require('solr');
var qs = require('qs');

function indexDocument(file_name){
	jsonfile.readFile(inputConfig.json_directory + '/' + file_name + '.json', function (err, obj) {
		obj = obj.answer_units
		var params = {
		  cluster_id: inputConfig.cluster_id,
		  collection_name: inputConfig.collection_name,
		};
		solrClient = inputConfig.retrieve_and_rank.createSolrClient(params);
		for (i in obj) {

			var doc =
			{
				"id": obj[i].id,
				"body": obj[i].content[0].text,
				"title": obj[i].title
			}

			solrClient.add(doc, function (err, response) {
				if (err) {
					console.log('Error indexing document: ', err);
				}
				else {
					console.log('Indexed a document.');
					solrClient.commit(function (err) {
						if (err) {
							console.log('Error committing change: ' + err);
						}
						else {
							console.log('Successfully committed changes.');
						}
					});
				}
			});
		}
	})
}

//Create a collection to start with the indexing of the documents and to keep all the documents and questions and answers
var params = {
	cluster_id: inputConfig.cluster_id,
	config_name: inputConfig.config_name,
	collection_name: inputConfig.collection_name,
	wt: 'json'
};

inputConfig.retrieve_and_rank.createCollection(params,
	function (err, response) {
		if (err){
			console.log('error:', err);
		}
		else{
			console.log(JSON.stringify(response, null, 2));
		}
	});
	
// Index the questions and answer units to the collection
fs.readdir(inputConfig.json_directory, (err, files) => {
	files.forEach(file => {
		file_name = file.substring(0, file.lastIndexOf('.'));
		indexDocument(file_name);
	});
})