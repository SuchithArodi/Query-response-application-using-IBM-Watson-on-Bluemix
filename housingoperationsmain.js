// Code Reference : 

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

function docconversion(file_name){	
	// Define a custom configuration for converting the document content to JSON
	var config = {
	  conversion_target: inputConfig.document_conversion.conversion_target.ANSWER_UNITS,
	  word: {
		heading: {
		  fonts: [
			{ level: 1, min_size: 24 },
			{ level: 2, min_size: 16, max_size: 24 }
		  ]
		}
	  }
	};

	// Document Conversion
	var path = inputConfig.files_directory + '/' + file_name + '.docx';
	inputConfig.document_conversion.convert({
	  file: fs.createReadStream(path),
	  conversion_target: inputConfig.document_conversion.conversion_target.ANSWER_UNITS,
	  // Use the custom configuration for converting to answer units
	  config: config
	}, function (err, response) {
	  if (err) {
		console.error(err);
	  } else {
		if (!fs.existsSync(inputConfig.json_directory)){
			fs.mkdirSync(inputConfig.json_directory);
		}
		fs.writeFile(inputConfig.json_directory + '/' + file_name + '.json', JSON.stringify(response), (err) => {
		if (err) {
			console.error(err);
			return;
		};
	});
	console.log('Files have been converted');
	  }
	});
}

function retrieveAndRank(){	
	// // Upload Solr configuration file to the cluster
	// var params = {
		// cluster_id: inputConfig.cluster_id,
		// config_name: inputConfig.config_name,
		// config_zip_path: inputConfig.config_zip_path
	// };

	// inputConfig.retrieve_and_rank.uploadConfig(params,
		// function (err, response) {
			// if (err){
				// console.log('error:', err);
			// }
			// else{
				// console.log(JSON.stringify(response, null, 2));
			// }
		// });
		
	// //Create a collection to start with the indexing of the documents and to keep all the documents and questions and answers
	// var params = {
		// cluster_id: inputConfig.cluster_id,
		// config_name: inputConfig.config_name,
		// collection_name: inputConfig.collection_name,
		// wt: 'json'
	// };

	// inputConfig.retrieve_and_rank.createCollection(params,
		// function (err, response) {
			// if (err){
				// console.log('error:', err);
			// }
			// else{
				// console.log(JSON.stringify(response, null, 2));
			// }
		// });
		
	// // Index the questions and answer units to the collection
	// fs.readdir(inputConfig.json_directory, (err, files) => {
		// files.forEach(file => {
			// file_name = file.substring(0, file.lastIndexOf('.'));
			// indexDocument(file_name);
		// });
	// })
	
	// Create a ranker
	// var params = {
	  // training_data: fs.createReadStream('./trainingFaqs.csv'),
	// };

	// inputConfig.retrieve_and_rank.createRanker(params,
	  // function(err, response) {
		// if (err)
		  // console.log('error: ', err);
		// else
		  // console.log(JSON.stringify(response, null, 2));
	// });
	
	// //LIST RANKERS
	// inputConfig.retrieve_and_rank.listRankers({},
		// function(err, response) {
			// if (err)
			  // console.log('error: ', err);
			// else
			  // console.log(JSON.stringify(response, null, 2));
		// });

	// ASK QUESTIONS
	
	// Search using ranker
	var params = {
		cluster_id: inputConfig.cluster_id,
		collection_name: inputConfig.collection_name,
	};

	solrClient = inputConfig.retrieve_and_rank.createSolrClient(params);
	
	var ranker_id = '81aacex30-rank-2195';
	var question = 'q=what is the termination fee';
	var query = qs.stringify({q: question, ranker_id: ranker_id, fl: 'body'});

	solrClient.get('fcselect', query, function (err, searchResponse) {
		if (err) {
			console.log('Error searching for documents: ' + err);
		}
		else {
			console.log(JSON.stringify(searchResponse.response.docs, null, 2));
		}
	});

}

// Get the filenames of the documents to be converted and invoke document conversion service
// fs.readdir(inputConfig.files_directory, (err, files) => {
  // files.forEach(file => {
	// file_name = file.substring(0, file.lastIndexOf('.'));
    // docconversion(file_name);
  // });
// })

// Invoke Retrieve and Rank service
retrieveAndRank();

