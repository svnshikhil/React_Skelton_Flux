const INITIAL_STATE={data:[],reason:[],channel:[],error:null,loading:false}

export default  (state = INITIAL_STATE, action) => {
  switch (action.type) {
  	case 'FETCH_DATA':
      return {
      	data:[],
      	error:null,
      	loading:true
      };
    case 'FETCH_DATA_SUCCESS':
    console.log("Action In Reducer",action)
      return {
      	data:action.response.data.responses,
        timerange:action.timerange,
      	error:null,
      	loading:false
      };
    case 'FETCH_DATA_ERROR':
      return {
      	data:[],
      	error:action.error,
      	loading:false
      };
    default:
      return state;
  }

}
