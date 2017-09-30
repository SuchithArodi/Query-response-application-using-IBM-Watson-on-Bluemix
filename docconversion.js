// Code References : 
// IBM Watson's documentation : https://www.ibm.com/watson/developercloud/retrieve-and-rank/api/v1/?node
// Creating Natural Language QA system : http://fartashh.github.io/post/qa-system-watson/

var inputConfig = require('./inputconfigurations');
var fs = require('fs');
var jsonfile = require('jsonfile');

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

// Get the filenames of the documents to be converted and invoke document conversion service
fs.readdir(inputConfig.files_directory, (err, files) => {
  files.forEach(file => {
	file_name = file.substring(0, file.lastIndexOf('.'));
    docconversion(file_name);
  });
})