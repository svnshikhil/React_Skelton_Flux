import React from 'react';
import { hashHistory, Link } from 'react-router'
import _ from "lodash"
import 'antd/dist/antd.css';
import { connect } from 'react-redux'
import { getData } from '../../../actions';
import 'public/css/override.css';
// import DashBoard from '../DashBoard';

class MainFrame extends React.Component {
	constructor() {
		super();
		this.state = {
		};
	}
	componentWillMount(){
		this.props.getData();
	}
	render() {
		return (
			<div>
				Hiiiiiiiiii

			</div>
		);
	}
};


const mapDispatchToProps = (dispatch) => {
	return {
		getData: (item) => {
			dispatch(getData(item))
		},
	}
}

const mapStateToProps = (state, ownProps) => {
	console.log('getJsons.resp', state)
	return state
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MainFrame);