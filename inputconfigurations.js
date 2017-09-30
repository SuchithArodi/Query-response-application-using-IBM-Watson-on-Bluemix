var watson = require('watson-developer-cloud');

var retrieve_and_rank = watson.retrieve_and_rank({
	username: 'e9f543fb-e8c4-44eb-bf7f-2a1ae2a285d6',
	password: 'd7GkJAdBclWv',
	version: 'v1'
});

var document_conversion = watson.document_conversion({
  username: '393e1947-ea3f-4f9f-bbbf-510545e45645',
  password: 'TejuZ1n8cuDw',
  version: 'v1',
  version_date: '2015-12-15'
});

var files_directory = './resources/';
var json_directory = './JSONFiles';
var cluster_id = 'scd2968656_0ff2_4fcd_948a_56c37e87ef1f';
var config_zip_path = './solrconfig.zip';
var config_name = 'HousingSolrConfig';
var collection_name = 'HousingCollection';
var ranker_id = '81aacex30-rank-2195';
var question = 'what is the termination fee';

module.exports.document_conversion = document_conversion;
module.exports.retrieve_and_rank = retrieve_and_rank;
module.exports.files_directory = files_directory;
module.exports.json_directory = json_directory;
module.exports.cluster_id = cluster_id;
module.exports.config_zip_path = config_zip_path;
module.exports.config_name = config_name;
module.exports.collection_name = collection_name;
module.exports.ranker_id = ranker_id;
module.exports.question = question;