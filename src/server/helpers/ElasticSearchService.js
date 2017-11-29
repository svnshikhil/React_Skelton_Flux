var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
	host: 'http://localhost:9200/'
});
module.exports = {
	searchKeyword: function (keyword, callBack) {
		if(keyword == "" || keyword == null){
			keyword = "*"
		}
		client.search({
			index: "schoolrecords",
			body: {
				"query": {
					"query_string": {
						"query" : keyword
					}
				}
			}
		}, function (error, response) {
			if (error) {
				callBack(error, null);
			} else {
				callBack(null, response);
			}
		});
	}
}
