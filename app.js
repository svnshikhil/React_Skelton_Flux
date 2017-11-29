var app = require('express')();
var http = require('http');
var webpackconfig = require('./webpack.config');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var compression = require('compression');
var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var isDeveloping = process.env.NODE_ENV != 'production';
// var config = require('config');
// var host = config.get('es.host');
// var serverPort = config.get('es.serverPort');
var config = require('config');
var host = config.get('es.host');
var serverPort = config.get('es.serverPort');
var getData = require('./server/routes/getData.js');
console.log("IS developing ", isDeveloping);


app.use(compression());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
if (isDeveloping) {
	app.use('/node_modules', express.static('/node_modules'));
	app.use('/config', express.static('/config'));
	app.use(express.static('src/view/index.html'));
	app.use(express.static('src/view/index.html'));
	const compiler = webpack(webpackconfig);
	const middleware = webpackMiddleware(compiler, {
		publicPath: webpackconfig.output.publicPath,
		constentBase: 'dist',
		stats: {
			color: true,
			hash: false,
			timings: true,
			chunks: false,
			chunkModules: false,
			modules: false
		}

	});
	app.use(middleware);
	app.use(webpackHotMiddleware(compiler));
	app.use(express.static(__dirname + "src/view/public"));
	app.get('/', function response(req, res) {
		res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'src/view/index.html')));
		res.end();
	});
}
else {
	app.use('/node_modules', express.static('/node_modules'));
	app.use(express.static('dist/public'));
	app.use(express.static('dist'));
	app.get('/', function response(req, res) {
		res.sendFile('dist/index.html');
	});
}
app.use('/getData', getData);

app.listen(serverPort, function () {
	console.log('Your server is listening * on port %d (http://localhost:%d)', serverPort, serverPort);
});
