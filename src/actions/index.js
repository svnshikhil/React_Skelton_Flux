import axios from 'axios'
import config from './config'
export const getData = (list) => {
    console.log("Param in Action", list)
    var query = {
            "query": {
                "bool": {
                    "must": [
                        {
                            "query_string": {
                                "query": "*",
                                "analyze_wildcard": true
                            }
                        },
                        {
                            "query_string": {
                                "analyze_wildcard": true,
                                "query": "*"
                            }
                        },
                        {
                            "range": {
                                "created_at": {
                                    "gte": 1493501473991,
                                    "lte": 1493506826923,
                                    "format": "epoch_millis"
                                }
                            }
                        }
                    ],
                    "must_not": []
                }
            },
            "size": 0,
            "_source": {
                "excludes": []
            },
            "aggs": {
                "2": {
                    "date_histogram": {
                        "field": "created_at",
                        "interval": "1m",
                        "time_zone": "Asia/Kolkata",
                        "min_doc_count": 1
                    }
                }
            }
        }

    return (dispatch) => {
        dispatch({
            type: "FETCH_DATA",

        })
        axios.post(config.localAPIUrl + '/getData', query)
            .then(function (response) {
                console.log("action response....", response)
                dispatch({
                    type: 'FETCH_DATA_SUCCESS',
                    response
                })
            })
            .catch(function (error) {
                dispatch({
                    type: 'FETCH_DATA_ERROR',
                    error
                })
            });
    };

}
