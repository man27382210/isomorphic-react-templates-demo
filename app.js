var http = require('http');

var express = require('express');
var path = require("path");
var app = express();
var Promise = require("bluebird");
var engine = require('express-partial-react-views');
require('node-jsx').install();
require('node-async-require').install({
	preParser: "rt",
	async: false
});

app.set('views', __dirname + '/src');
app.set('view engine', 'html');
app.set('reactComponentFolder', __dirname + '/src/components');

app.engine('html', engine.createEngine({
	useBabel: false
}));

process.env.NODE_ENV = "dev";
// Step 1: Create & configure a webpack compiler
var webpack = require('webpack');
var webpackConfig = require(process.env.WEBPACK_CONFIG ? process.env.WEBPACK_CONFIG : './webpack.config');
var contentBase = process.env.CONTENT_BASE ? process.env.CONTENT_BASE : "src";
var compiler = webpack(webpackConfig);

// Step 2: Attach the dev middleware to the compiler & the server
app.use(require("webpack-dev-middleware")(compiler, {
	stats: {
		colors: true
	},
	publicPath: webpackConfig.output.publicPath
}));

// Step 3: Attach the hot middleware to the compiler & the server
app.use(require("webpack-hot-middleware")(compiler, {
	log: console.log,
	path: '/__webpack_hmr',
	heartbeat: 10 * 1000
}));


// Do anything you like with the rest of your express application.
app.get("/", function(req, res) {
	//res.sendFile(path.join(__dirname, contentBase) + '/index.html');
	engine.providerService(req.app, "index", {
		propsProvider: function() {
			return Promise.resolve({
				name: "Test"
			});
		}
	}).then(function(result) {
		res.render("index", result);
	});

});

if (require.main === module) {
	var server = http.createServer(app);
	server.listen(process.env.PORT || 8080, function() {
		console.log("Listening on %j", server.address());
	});
}