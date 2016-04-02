var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var ws = require('nodejs-websocket');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true
}).listen(8080, 'localhost', function (err, result) {
    if (err) {
        return console.log(err);
    }

    console.log('Listening at http://localhost:8080/');
});

var connections = [];

var server = ws.createServer(function (conn) {
    console.log("New connection");
    connections.push(conn);
    conn.on("text", function (str) {
        console.log("Received "+str);
        connections.forEach((item) => {
            item.sendText(str.toUpperCase()+"!!!" + "Connections:" + connections.length);
        })
    });
    conn.on("close", function (code, reason) {
        console.log("Connection closed")
    })
}).listen(8001);