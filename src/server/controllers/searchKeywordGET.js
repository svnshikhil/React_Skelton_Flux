var es = require('../helpers/ElasticSearchService');
module.exports = {
        searchKeywordGET: searchKeywordGET
};

function searchKeywordGET(req, res) {
        var keyword = req.swagger.params.keyword.value.value;

        es.searchKeyword(keyword, function (error, response) {
                if (error) {
                        console.log(error);
                } else {
                        console.log('response', response);
                        res.json(response);
                }

        });

}
