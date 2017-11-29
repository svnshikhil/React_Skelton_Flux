import React from 'react';
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var MainFrame = require("./components/MainFrame");
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers/';
import { hashHistory, Redirect, IndexRoute } from 'react-router'

let store = createStore(reducer, applyMiddleware(thunk))
ReactDOM.render(
	<Provider store={store}>
		<Router history={hashHistory} >
			<Redirect from="/" to="/mainFrame" />
			<Route path="/mainFrame" component={MainFrame}>
			</Route>
		</Router>
	</Provider>, document.getElementById('renderData')
);